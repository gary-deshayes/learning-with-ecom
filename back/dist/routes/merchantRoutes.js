"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merchantRoutes = void 0;
const express_1 = require("express");
exports.merchantRoutes = (0, express_1.Router)();
exports.merchantRoutes.get('/', (req, res) => {
    res.send("return all mercants");
});
