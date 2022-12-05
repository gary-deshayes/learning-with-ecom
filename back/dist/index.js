"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = require("body-parser");
const mongoose_1 = __importDefault(require("mongoose"));
//Graphql serveur
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs_1 = __importDefault(require("./graphql/typeDefs"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
//Routes
const merchantRoutes_1 = require("./routes/merchantRoutes");
const userRoutes_1 = require("./routes/userRoutes");
//Logging route
var morgan = require('morgan');
//Function to launch Apollo server and Rest routes
function startApolloServer(schema, resolvers) {
    return __awaiter(this, void 0, void 0, function* () {
        const cors = require("cors");
        dotenv_1.default.config();
        const port = process.env.PORT;
        const app = (0, express_1.default)();
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: typeDefs_1.default,
            resolvers: resolvers_1.default
        });
        var corsOptions = {
            origin: "http://localhost:3000"
        };
        app.use(cors(corsOptions));
        app.use((0, body_parser_1.json)());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use(morgan('dev'));
        mongoose_1.default.connect('mongodb://localhost:27017/learning-with-ecom', {}, () => {
            console.log("Mongoose connected !");
        });
        app.use('/api/merchants', merchantRoutes_1.merchantRoutes);
        app.use('/api/users', userRoutes_1.userRoutes);
        yield server.start();
        server.applyMiddleware({ app });
        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
        });
    });
}
startApolloServer(typeDefs_1.default, resolvers_1.default);
