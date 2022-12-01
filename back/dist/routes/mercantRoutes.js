"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mercantRoutes = void 0;
const express_1 = require("express");
exports.mercantRoutes = (0, express_1.Router)();
exports.mercantRoutes.get('/', (req, res) => {
    res.send("return all mercants");
});
