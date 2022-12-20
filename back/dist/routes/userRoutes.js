"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
exports.userRoutes = (0, express_1.Router)();
const authJwt_1 = require("../middleware/authJwt");
const userService = __importStar(require("../services/userService"));
const multerProfilPics_1 = require("../utils/multerProfilPics");
exports.userRoutes.post('/login', userService.login);
/**
 * Route for creationg merchant
 */
exports.userRoutes.post('/register', userService.register);
exports.userRoutes.get('/me', authJwt_1.auth, userService.me);
exports.userRoutes.post('/me', authJwt_1.auth, userService.saveMe);
exports.userRoutes.get('/photo/:id', userService.profilPics);
exports.userRoutes.post('/photo', authJwt_1.auth, multerProfilPics_1.uploadProfilPics.single('avatar'), userService.profil);
