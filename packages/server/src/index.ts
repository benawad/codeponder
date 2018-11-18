import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import * as cors from "cors";

import { createTypeormConn } from "./createTypeormConn";
import { createSchema } from "./createSchema";
import { redis } from "./redis";

// @todo move to .env
const SESSION_SECRET = "ajslkjalksjdfkl";
const RedisStore = connectRedis(session);

const corsOptions = {
  credentials: true,
  origin:
    process.env.NODE_ENV === "production"
      ? "https://www.codeponder.com"
      : "http://localhost:3000"
};

const startServer = async () => {
  await createTypeormConn();

  const app = express();

  app.set("trust proxy", 1);

  app.use(cors(corsOptions));

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 365 * 7 // 7 days
      }
    })
  );

  const server = new ApolloServer({
    schema: createSchema(),
    context: ({ req, res }: any) => ({
      req,
      res
    })
  });

  server.applyMiddleware({
    app,
    cors: false
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
