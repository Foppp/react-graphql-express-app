const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    displayName: String!
  }

  type Artist {
    _id: ID!,
    name: String!
    age: Int!
    role: String!
    status: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input ArtistInput {
    name: String!
    age: Int!
    role: String!
    status: String!
  }

  type AuthUser {
    userId: ID!
    token: String!
  }

  type ArtistDeleteResponse {
    success: Boolean!
  }

  type ArtistCreateResponse {
    success: Boolean!
  }

  type Mutation {
    login(username: String!, password: String!): AuthUser!
    createArtist(artist: ArtistInput): ArtistCreateResponse!
    removeArtist(userId: ID!): ArtistDeleteResponse!
  }

  type Query {
    getUsers: [User!]!
    getArtists: [Artist!]!
  }
`;


module.exports = typeDefs