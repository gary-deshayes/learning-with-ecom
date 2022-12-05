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
const Merchant_1 = require("./models/Merchant");
const Resolvers = {
    Query: {
        getAllMerchant: () => __awaiter(void 0, void 0, void 0, function* () {
            let merchants = yield Merchant_1.Merchant.find();
            return merchants;
        }),
        //if the user runs the getPerson command:
        getMerchant: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(args);
            let merchant = yield Merchant_1.Merchant.findById(args.id);
            //get the object that contains the specified ID.
            return merchant;
        }),
    },
};
exports.default = Resolvers;
