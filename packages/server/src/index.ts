import { ApolloError, ApolloServer } from "apollo-server-express";
import * as connectRedis from "connect-redis";
import * as cors from "cors";
import * as express from "express";
import * as session from "express-session";
import { GraphQLError } from "graphql";
import * as passport from "passport";
import { Profile, Strategy as GitHubStrategy } from "passport-github";
import { RedisClient } from "redis";
import "reflect-metadata";
import { buildSchema, useContainer } from "type-graphql";
import { Container } from "typedi";
import * as typeorm from "typeorm";
import { getConnection } from "typeorm";
import { v4 } from "uuid";
import { createTypeormConn } from "./createTypeormConn";
import { User } from "./entity/User";
import { DisplayError } from "./errors/DisplayError";
import { commentLoader } from "./loaders/commentLoader";
import { userLoader } from "./loaders/userLoader";
import { redis } from "./redis";
import { createUser } from "./utils/createUser";
import { logManager } from "./utils/logManager";
import { setupErrorHandling } from "./utils/shutdown";
require("dotenv-safe").config();

const logger = logManager();
logger.info("Loading environment...");

const SESSION_SECRET = process.env.SESSION_SECRET;
const RedisStore = connectRedis(session); // connect node.req.session to redis backing store

useContainer(Container);
typeorm.useContainer(Container);

const startServer = async (): Promise<void> => {
  logger.info("Connecting database...");
  const conn = await createTypeormConn();
  if (conn) {
    logger.info("database connected ");
    await conn.runMigrations();
  }
  logger.info("Creating express server...");
  const app = express();

  logger.info("Creating GQL server...");
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + "/modules/**/resolver.*"],
    }),
    context: ({ req }: { req: Request }) => ({
      req,
      userLoader: userLoader(),
      commentLoader: commentLoader(),
    }),
    formatError: (error: GraphQLError) => {
      if (
        error.originalError instanceof ApolloError ||
        error.originalError instanceof DisplayError
      ) {
        return error;
      }

      const errId = v4();
      console.log("errId: ", errId);
      console.log(error);

      return new GraphQLError(`Internal Error: ${errId}`);
    },
  });

  app.set("trust proxy", 1);

  app.use(
    cors({
      credentials: true,
      origin:
        process.env.NODE_ENV === "production"
          ? "https://www.codeponder.com"
          : "http://localhost:3000",
    })
  );

  app.use((req, _, next) => {
    const authorization = req.headers.authorization;

    if (authorization) {
      try {
        const qid = authorization.split(" ")[1];
        req.headers.cookie = `qid=${qid}`;
      } catch {}
    }

    return next();
  });

  const sessionOption: session.SessionOptions = {
    store: new RedisStore({
      client: (redis as unknown) as RedisClient,
    }),
    name: "qid",
    secret: SESSION_SECRET || "",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
    },
  };

  app.use(session(sessionOption));

  interface UserProfile extends Profile {
    _json: {
      [key: string]: string;
    };
  }

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID || "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        callbackURL: "http://localhost:4000/oauth/github",
      },
      async (accessToken, refreshToken, userProfile, cb) => {
        const profile = (userProfile as unknown) as UserProfile;
        let user = await typeorm
          .getRepository(User)
          .findOne({ where: { githubId: profile.id } });
        if (!user) {
          user = await createUser({
            username: profile.username || "",
            githubId: profile.id,
            pictureUrl: profile._json.avatar_url,
            bio: profile._json.bio,
            name: profile._json.name,
          });
        }

        cb(null, {
          user,
          accessToken,
          refreshToken,
        });
      }
    )
  );

  app.use(passport.initialize());

  app.get("/auth/github", passport.authenticate("github", { session: false }));

  app.get(
    "/oauth/github",
    passport.authenticate("github", { session: false }),
    (req, res) => {
      if (req.user.user.id && req.session) {
        req.session.userId = req.user.user.id;
        req.session.accessToken = req.user.accessToken;
        req.session.refreshToken = req.user.refreshToken;
      }
      res.redirect("http://localhost:3000/");
    }
  );

  server.applyMiddleware({ app, cors: false }); // app is from an existing express app

  const nodeServer = app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );

  setupErrorHandling({
    db: getConnection(),
    redisClient: redis,
    logger: logger,
    nodeServer: nodeServer,
  });
};

startServer();
