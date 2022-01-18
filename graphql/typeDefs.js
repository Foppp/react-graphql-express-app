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

  type Artist {
    _id: ID!
    firstName: String!
    lastName: String!
    gender: String!
    country: String!
    showIds: [ID!]!
    role: String!
    birthDate: String!
    startDate: String!
    finishDate: String!
    email: String!
    phoneNumber: String!
  }

  input ArtistInput {
    firstName: String!
    lastName: String!
    gender: String!
    country: String!
    showIds: [ID!]!
    role: String!
    birthDate: String!
    startDate: String!
    finishDate: String!
    email: String!
    phoneNumber: String!
  }

  type Show {
    _id: ID!
    name: String!
    artistIds: [ID!]!
    startDate: String!
    finishDate: String!
    description: String!
  }

  input ShowInput {
    name: String!
    artistIds: [ID!]!
    startDate: String!
    finishDate: String!
    description: String!
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

  type ShowCreateResponse {
    success: Boolean!
  }

  type ShowEditResponse {
    success: Boolean!
  }

  type ShowRemoveResponse {
    success: Boolean!
  }

  type Mutation {
    login(username: String!, password: String!): AuthUser!
    createArtist(artist: ArtistInput!): ArtistCreateResponse!
    removeArtist(userId: ID!): ArtistDeleteResponse!
    editArtist(userId: ID!, artist: ArtistInput!): ArtistEditResponse!
    createShow(show: ShowInput!): ShowCreateResponse!
    editShow(showId: ID!, show: ShowInput!): ShowEditResponse!
    removeShow(showId: ID!): ShowRemoveResponse!
  }

  type Query {
    getUsers: [User!]!
    getUser(userId: ID!): User!
    getArtists: [Artist!]!
    getArtist(userId: ID!): Artist!
    getShows: [Show!]!
    getShow(showId: ID!): Show!
  }
`;


module.exports = typeDefs