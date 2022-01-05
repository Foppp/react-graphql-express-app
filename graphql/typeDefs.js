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
    firstName: String!
    lastName: String!
    country: String!
    role: String!
    birthDate: String!
    startDate: String!
    finishDate: String!
    email: String!
    phoneNumber: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input ArtistInput {
    firstName: String!
    lastName: String!
    country: String!
    role: String!
    birthDate: String!
    startDate: String!
    finishDate: String!
    email: String!
    phoneNumber: String!
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

  type ArtistEditResponse {
    success: Boolean!
  }

  type Mutation {
    login(username: String!, password: String!): AuthUser!
    createArtist(artist: ArtistInput): ArtistCreateResponse!
    removeArtist(userId: ID!): ArtistDeleteResponse!
    editArtist(userId: ID!, artist: ArtistInput): ArtistEditResponse!
  }

  type Query {
    getUsers: [User!]!
    getArtists: [Artist!]!
    getArtist(userId: ID!): Artist!
  }
`;


module.exports = typeDefs