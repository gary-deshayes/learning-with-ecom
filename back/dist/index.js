"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = require("body-parser");
const mongoose_1 = __importDefault(require("mongoose"));
//Routes
const merchantRoutes_1 = require("./routes/merchantRoutes");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
mongoose_1.default.connect('mongodb://localhost:27017/learning-with-ecom', {}, () => {
    console.log("Mongoose connected !");
});
const port = process.env.PORT;
app.use('/merchants', merchantRoutes_1.merchantRoutes);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
