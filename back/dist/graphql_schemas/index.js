"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { mergeTypeDefs } = require('@graphql-tools/merge');
const MerchantSchema_1 = __importDefault(require("./MerchantSchema"));
const UserSchema_1 = __importDefault(require("./UserSchema"));
exports.default = mergeTypeDefs([MerchantSchema_1.default, UserSchema_1.default]);
