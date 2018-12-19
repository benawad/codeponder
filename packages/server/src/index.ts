import "reflect-metadata";
require("dotenv-safe").config();
import { ApolloServer } from "apollo-server-express";
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import * as express from "express";
import { buildSchema } from "type-graphql";
import * as passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";
import * as cors from "cors";

import { redis } from "./redis";

import { createTypeormConn } from "./createTypeormConn";
import { createUser } from "./utils/createUser";
import { User } from "./entity/User";
import { userLoader } from "./loaders/userLoader";
import { questionReplyLoader } from "./loaders/questionReplyLoader";

const SESSION_SECRET = "ajslkjalksjdfkl";
const RedisStore = connectRedis(session as any);

const startServer = async () => {
  await createTypeormConn();

  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + "/modules/**/resolver.*"],
      authChecker: ({ context }) => {
        return context.req.session && context.req.session.userId; // or false if access denied
      },
    }),
    context: ({ req }: any) => ({
      req,
      userLoader: userLoader(),
      questionReplyLoader: questionReplyLoader(),
    }),
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
      } catch (_) {}
    }

    return next();
  });

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: "qid",
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    } as any)
  );

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: "http://localhost:4000/oauth/github",
      },
      async (accessToken, refreshToken, profile: any, cb) => {
        let user = await User.findOne({ where: { githubId: profile.id } });
        if (!user) {
          user = await createUser({
            username: profile.username,
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
    (req: any, res) => {
      if (req.user.user.id) {
        req.session.userId = req.user.user.id;
        req.session.accessToken = req.user.accessToken;
        req.session.refreshToken = req.user.refreshToken;
      }
      res.redirect("http://localhost:3000/pick-repo");
    }
  );

  server.applyMiddleware({ app, cors: false }); // app is from an existing express app

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
