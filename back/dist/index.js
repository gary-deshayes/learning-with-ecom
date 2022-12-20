"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = require("body-parser");
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const fs = require('fs');
//Graphql serveur
//Routes
const merchantRoutes_1 = require("./routes/merchantRoutes");
const userRoutes_1 = require("./routes/userRoutes");
//Logging route
var morgan = require('morgan');
const cors = require("cors");
dotenv_1.default.config();
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use(cors());
console.log(path_1.default.join(__dirname, 'uploads/profile_pics'));
app.use(path_1.default.join(__dirname, 'uploads/profile_pics'), express_1.default.static('profile_pics'));
app.use((0, body_parser_1.json)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(morgan('dev'));
mongoose_1.default.connect('mongodb://localhost:27017/learning-with-ecom', {}, () => {
    console.log("Mongoose connected !");
});
app.use('/api/merchants', merchantRoutes_1.merchantRoutes);
app.use('/api/users', userRoutes_1.userRoutes);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
