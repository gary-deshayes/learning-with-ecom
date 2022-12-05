import { gql } from "apollo-server-express"; //will create a schema
const Schema = gql`
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
export default Schema; 
//export this Schema so we can use it in our project