"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const QueryUser_resolver_1 = __importDefault(require("./QueryUser.resolver"));
const QueryMechant_resolver_1 = __importDefault(require("./QueryMechant.resolver"));
const MutationUser_resolver_1 = __importDefault(require("./MutationUser.resolver"));
const { mergeTypeDefs } = require('@graphql-tools/merge');
const types = [QueryUser_resolver_1.default, QueryMechant_resolver_1.default, MutationUser_resolver_1.default];
exports.default = mergeTypeDefs(types);
