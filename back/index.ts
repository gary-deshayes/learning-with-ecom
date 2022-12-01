import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import mongoose from 'mongoose';
const cors = require("cors");
dotenv.config();
const port = process.env.PORT;
const app: Express = express();
//Routes
import {merchantRoutes} from './routes/merchantRoutes';
import {userRoutes} from './routes/userRoutes';

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));



app.use(json())
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/learning-with-ecom', {}, () => {
  console.log("Mongoose connected !")
})

app.use('/api/merchants', merchantRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});