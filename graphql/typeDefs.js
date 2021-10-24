const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    displayName: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type AuthUser {
    userId: ID!
    token: String!
  }

  type Mutation {
    login(username: String!, password: String!): AuthUser!
  }

  type Query {
    getUsers: [User!]!
  }
`;


module.exports = typeDefs