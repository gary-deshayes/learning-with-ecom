import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import mongoose from 'mongoose';
//Routes
import {merchantRoutes} from './routes/merchantRoutes';

dotenv.config();

const app: Express = express();
app.use(json())

mongoose.connect('mongodb://localhost:27017/learning-with-ecom', {}, () => {
  console.log("Mongoose connected !")
})
const port = process.env.PORT;

app.use('/merchants', merchantRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});