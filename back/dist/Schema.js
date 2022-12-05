"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express"); //will create a schema
const Schema = (0, apollo_server_express_1.gql) `
  type Merchant {
    id: ID!
    email: String
  name: String
  ownerFirstName: String
  ownerLastName: String
  }
  #handle user commands
  type Query {
    getAllMerchant: [Merchant]
    getMerchant(id: String): Merchant 
  }
`;
exports.default = Schema;
//export this Schema so we can use it in our project
