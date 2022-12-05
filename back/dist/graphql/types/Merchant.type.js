"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MerchantSchema = `
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
exports.default = MerchantSchema;
//export this Schema so we can use it in our project
