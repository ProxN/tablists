import 'reflect-metadata';
import { config } from 'dotenv';
config({ path: './config.env' });

import express from 'express';
import { buildSchema } from 'type-graphql';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import authChecker from './utils/authChecker';
import { resolvers } from './api';
import DBconn from './conn';

const Main = async () => {
  await DBconn();
  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis('127.0.0.1:6379');

  app.set('trust proxy', 1);
  app.use(cookieParser());

  app.use(
    session({
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      name: 'sid',
      secret: process.env.SESSION_SECRET || 'secret',
      saveUninitialized: false,
      resave: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers,
      validate: false,
      authChecker,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(process.env.PORT, () =>
    console.log(`Server starting at port: ${process.env.PORT}`)
  );
};

Main();
