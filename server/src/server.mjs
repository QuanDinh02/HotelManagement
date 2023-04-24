import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import * as dotenv from 'dotenv';
dotenv.config();

import { typeDefs } from './schema/type-def.js';
import { resolvers } from './schema/resolvers.js';

const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 4000;

// Set up Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
    cors(),
    bodyParser.json(),
    cookieParser(),
    expressMiddleware(server),
);

await new Promise((resolve) => httpServer.listen({ port: port }, resolve));
console.log(`Server ready at http://localhost:4000`);