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
exports.register = void 0;
/**
 * Service who contains all fonction for creating and manage merchant
 */
const Merchant_1 = require("../models/Merchant");
// import { CustomRequest } from '../middleware/auth';
const errors_util_1 = require("../utils/errors.util");
/**
 * Function who allow to add merchant
 * @param req
 * @param res
 */
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //Check if passwords are equal
        if (req.body.password != req.body.confirmpassword) {
            res.status(500).send('Password not equal to confirm password');
        }
        else {
            //Check unique email and create
            yield Merchant_1.Merchant.init();
            yield Merchant_1.Merchant.create({
                email: req.body.email,
                password: req.body.password
            }).then(() => {
                res.status(201).send("Registered");
            })
                .catch(error => {
                let msg = "Error";
                if (error.code == 11000) {
                    msg = "Account already exist in database with this email";
                }
                // Will error, but will *not* be a mongoose validation error, it will be
                // a duplicate key error.
                // See: https://masteringjs.io/tutorials/mongoose/e11000-duplicate-key
                res.send((0, errors_util_1.getErrorMessage)(error));
            });
        }
    });
}
exports.register = register;
