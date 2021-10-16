const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type User {
    id: ID
    username: String
    age: Int
  }
  
  type Query {
    getUsers: [User]
  }

`);

module.exports = schema;