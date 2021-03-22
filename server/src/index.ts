import 'reflect-metadata';
import { config } from 'dotenv';
config({ path: './config.env' });

import express from 'express';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import HelloResolver from './api/hello.resolver';

const Main = async () => {
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
    }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(process.env.PORT, () =>
    console.log(`Server starting at port: ${process.env.PORT}`)
  );
};

Main();
