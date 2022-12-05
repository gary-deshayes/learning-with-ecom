import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import mongoose from 'mongoose';
//Graphql serveur
import { ApolloServer, gql } from 'apollo-server-express'
import Schema from "./graphql/typeDefs";
import Resolvers from "./graphql/resolvers";

//Routes
import { merchantRoutes } from './routes/merchantRoutes';
import { userRoutes } from './routes/userRoutes';
//Logging route
var morgan = require('morgan')
//Function to launch Apollo server and Rest routes
async function startApolloServer(schema: any, resolvers: any) {
  const cors = require("cors");
  dotenv.config();
  const port = process.env.PORT;
  const app: Express = express();

  const server = new ApolloServer({
    typeDefs: Schema,
    resolvers: Resolvers
  })
  
  

  var corsOptions = {
    origin: "http://localhost:3000"
  };

  app.use(cors(corsOptions));



  app.use(json())
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'))

  mongoose.connect('mongodb://localhost:27017/learning-with-ecom', {}, () => {
    console.log("Mongoose connected !")
  })

  app.use('/api/merchants', merchantRoutes);
  app.use('/api/users', userRoutes);
  await server.start()
  server.applyMiddleware({ app })
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}
startApolloServer(Schema, Resolvers);