import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { Context } from 'apollo-server-core';
import { genSchema } from './utils/genSchema';
import createTypeormConn from './utils/createTypeormConn';
import { Request } from 'express';
import { Connection } from 'typeorm';
import { CORS_ORIGIN } from './config';
import { jwtMiddleware, JTWPayload } from './utils/getUserId';
import MySQLAPI from './datasources/mysql';

export interface ApolloContext extends Context, JTWPayload {
  req: Request;
};

let db: Connection;
let server: ApolloServer;


export function shutdown() {
  if (db) { db.close(); }
  if (server) { server.stop(); }
}

export default async function startServer() {
  // Connect to DB
  try {
    db = await createTypeormConn();
  } catch (err) {
    console.error('Could not create TypORM connection', err);
  }
  const dataSources = () => ({
    mysqlAPI: new MySQLAPI({ db }),
  });

  server = new ApolloServer({
    dataSources,
    schema: genSchema(),
    cors: {
      origin: CORS_ORIGIN,
    },
    context: ({ req }: ApolloContext) => {
      return {
        req,
        ...jwtMiddleware(req),
      };
    },
  });
  return server;
};
