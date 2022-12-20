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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMerchant = void 0;
/**
 * Service who contains all fonction for creating and manage merchant
 */
const Merchant_1 = require("../models/Merchant");
// import { CustomRequest } from '../middleware/auth';
const errors_util_1 = require("../utils/errors.util");
function getAllMerchant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('test');
            const merchants = yield Merchant_1.Merchant.find({}, {}, { skip: 0, limit: 8 });
            return res.send(merchants);
        }
        catch (error) {
            res.send((0, errors_util_1.getErrorMessage)(error));
        }
    });
}
exports.getAllMerchant = getAllMerchant;
