// const { gql } = require('apollo-server');

// const typeDefs = gql`
//   type User {
//     id: ID!
//     username: String!
//     email: String!
//     displayName: String!
//   }

//   # input RegisterInput {
//   #   username: String!
//   #   password: String!
//   #   confirmPassword: String!
//   #   email: String!
//   # }

//   input LoginInput {
//     username: String!
//     password: String!
//   }

//   # type AuthUser {
//   #   user: User!
//   #   token: String!
//   # }

//   type Mutation {
//     # register(registerInput: RegisterInput!): User!
//     login(input: LoginInput!): User!
//   }

//   type Query {
//     getUsers: [User!]!
//     getUser(id: ID): User
//   }

// `;

// module.exports = typeDefs