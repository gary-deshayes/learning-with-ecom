"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const userSchema = (0, apollo_server_express_1.gql) `
  scalar DateTime
  type Query {
    # Auth
    refreshAccessToken: TokenResponse!
    logoutUser: Boolean!

    # User
    getMe: UserResponse!
  }

  type Mutation {
    # Auth
    loginUser(input: LoginInput!): TokenResponse!
    signupUser(input: SignUpInput!): UserResponse!
  }

  input SignUpInput {
    email: String!
    password: String!
    passwordConfirm: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type TokenResponse {
    status: String!
    access_token: String!
  }

  type UserResponse {
    status: String!
    user: UserData!
  }

  type UserData {
    id: ID!
    email: String!
    createdAt: DateTime
    updatedAt: DateTime
  }
`;
exports.default = userSchema;
