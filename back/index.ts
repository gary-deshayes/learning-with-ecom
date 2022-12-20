import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
const fs = require('fs')
//Graphql serveur

//Routes
import { merchantRoutes } from './routes/merchantRoutes';
import { userRoutes } from './routes/userRoutes';
//Logging route
var morgan = require('morgan')

const cors = require("cors");
dotenv.config();
const port = process.env.PORT;
const app: Express = express();

app.use(cors());
console.log(path.join(__dirname,'uploads/profile_pics'));

app.use(path.join(__dirname,'uploads/profile_pics'), express.static('profile_pics'));


app.use(json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))

mongoose.connect('mongodb://localhost:27017/learning-with-ecom', {}, () => {
  console.log("Mongoose connected !")
})

app.use('/api/merchants', merchantRoutes);
app.use('/api/users', userRoutes);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});