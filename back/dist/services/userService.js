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
exports.loginGraph = exports.login = exports.registerGraphQL = exports.register = exports.me = exports.saveMe = exports.profil = exports.profilPics = void 0;
/**
 * Service who contains all fonction for creating and manage merchant
 */
const Merchant_1 = require("../models/Merchant");
// import { CustomRequest } from '../middleware/auth';
const errors_util_1 = require("../utils/errors.util");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function profilPics(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let pathImg = path_1.default.join(__dirname, '../uploads/profile_pics/' + req.params.id + '.jpg');
        if (fs_1.default.existsSync(pathImg)) {
            res.sendFile(pathImg);
        }
        else {
            res.sendFile(path_1.default.join(__dirname, '../assets/market.png'));
        }
    });
}
exports.profilPics = profilPics;
function profil(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        res.send('photo upload??e');
    });
}
exports.profil = profil;
function saveMe(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.body.password.password != req.body.password.passwordConfirm) {
            res.status(500).send('Password not equal to confirm password');
        }
        req.user.password = req.body.password.password;
        req.user.email = req.body.user.email;
        req.user.description = req.body.user.description;
        req.user.address = req.body.user.address;
        req.user.save().then((savedUser) => {
            return res.send(savedUser);
        });
    });
}
exports.saveMe = saveMe;
function me(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.send(req.user);
    });
}
exports.me = me;
/**
 * Function who allow to add merchant
 * @param req
 * @param res
 */
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //Check if passwords are equal
        if (req.body.password != req.body.passwordConfirm) {
            res.status(500).send('Password not equal to confirm password');
        }
        else {
            //Check unique email and create
            yield Merchant_1.Merchant.init();
            yield Merchant_1.Merchant.create({
                email: req.body.email,
                password: req.body.password
            }).then((data) => {
                var _a;
                console.log(data);
                const token = jsonwebtoken_1.default.sign({ _id: (_a = data._id) === null || _a === void 0 ? void 0 : _a.toString(), name: data.name }, process.env.jwt_secret, {
                    expiresIn: '2 days'
                });
                res.status(201).send({ user: { _id: data._id, email: data.email }, token: token });
            })
                .catch(error => {
                let msg = "Error";
                if (error.code == 11000) {
                    msg = "Account already exist in database with this email";
                }
                // Will error, but will *not* be a mongoose validation error, it will be
                // a duplicate key error.
                // See: https://masteringjs.io/tutorials/mongoose/e11000-duplicate-key
                res.send({
                    error: (0, errors_util_1.getErrorMessage)(error),
                    error_message: msg
                });
            });
        }
    });
}
exports.register = register;
function registerGraphQL(parent, args, { req: Request, res: Response }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('test');
        //Check if passwords are equal
        if (args.input.password != args.input.passwordConfirm) {
            console.log(args);
            return 'Password not equal to confirm password';
        }
        else {
            //Check unique email and create
            yield Merchant_1.Merchant.init();
            yield Merchant_1.Merchant.create({
                email: args.input.email,
                password: args.input.password
            }).then((data) => {
                console.log({
                    status: 'success',
                    user: {
                        id: data._id.toString(),
                        email: data.email
                    }
                });
                return {
                    status: 'success',
                    user: {
                        id: data._id.toString(),
                        email: data.email
                    }
                };
            })
                .catch(error => {
                let msg = "Error";
                if (error.code == 11000) {
                    msg = "Account already exist in database with this email";
                }
                // Will error, but will *not* be a mongoose validation error, it will be
                // a duplicate key error.
                // See: https://masteringjs.io/tutorials/mongoose/e11000-duplicate-key
                return {
                    message: (0, errors_util_1.getErrorMessage)(error)
                };
            });
            console.log("pase ici ?");
        }
    });
}
exports.registerGraphQL = registerGraphQL;
function login(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        console.log('test');
        try {
            const foundUser = yield Merchant_1.Merchant.findOne({ email: req.body.email });
            if (!foundUser) {
                throw new Error('Name of user is not correct');
            }
            const isMatch = bcrypt_1.default.compareSync(req.body.password, foundUser.password);
            if (isMatch) {
                const token = jsonwebtoken_1.default.sign({ _id: (_a = foundUser._id) === null || _a === void 0 ? void 0 : _a.toString(), name: foundUser.name }, process.env.jwt_secret, {
                    expiresIn: '2 days',
                });
                res.send({ user: { _id: foundUser._id, email: foundUser.email }, token: token });
            }
            else {
                throw new Error('Password is not correct');
            }
        }
        catch (error) {
            res.send((0, errors_util_1.getErrorMessage)(error));
        }
    });
}
exports.login = login;
function loginGraph(parent, args, { req: Request, res: Response }) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const foundUser = yield Merchant_1.Merchant.findOne({ email: args.input.email });
            if (!foundUser) {
                throw new Error('Name of user is not correct');
            }
            const isMatch = bcrypt_1.default.compareSync(args.input.password, foundUser.password);
            if (isMatch) {
                const token = jsonwebtoken_1.default.sign({ _id: (_a = foundUser._id) === null || _a === void 0 ? void 0 : _a.toString(), name: foundUser.name }, process.env.jwt_secret, {
                    expiresIn: '2 days',
                });
                return {
                    status: "success",
                    access_token: token
                };
            }
            else {
                throw new Error('Password is not correct');
            }
        }
        catch (error) {
            return {
                status: error,
                access_token: ""
            };
        }
    });
}
exports.loginGraph = loginGraph;
