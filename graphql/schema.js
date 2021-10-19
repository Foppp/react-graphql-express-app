const { buildSchema } = require('graphql');

const schema = buildSchema(`

  type User {
    id: ID
    username: String
    userlastname: String
    age: Int
  }

  input UserInput {
    id: ID
    username: String!
    userlastname: String!
    age: Int!
  }

  type Query {
    getUsers: [User]
    getUser(id: ID): User
  }

  type Mutation {
    createUser(input: UserInput): User
  }

`);

module.exports = schema;