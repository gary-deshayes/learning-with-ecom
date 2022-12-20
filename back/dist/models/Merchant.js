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
exports.Merchant = exports.MerchantSchema = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 8;
exports.MerchantSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: false },
    password: { type: String, required: true },
    ownerFirstName: { type: String, required: false },
    ownerLastName: { type: String, required: false },
    description: { type: String, required: false },
    address: { type: String, required: false },
});
//Before saving, hash the password
exports.MerchantSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified('password')) {
            user.password = yield bcrypt_1.default.hash(user.password, saltRounds);
        }
        next();
    });
});
exports.Merchant = (0, mongoose_1.model)('Merchant', exports.MerchantSchema);
