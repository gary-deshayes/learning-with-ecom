const userSchema = `
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
  }
`;

export default userSchema;