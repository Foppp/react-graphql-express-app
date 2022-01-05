import { gql } from '@apollo/client';

export const GET_ALL_ARTISTS = gql`
  query {
    getArtists {
      _id
      firstName
      lastName
      gender
      country
      role
      birthDate
      startDate
      finishDate
      email
      phoneNumber
    }
  }
`;

export const GET_ARTIST = gql`
  query getArtist($userId: ID!) {
    getArtist(userId: $userId) {
      _id
      firstName
      lastName
      gender
      country
      role
      birthDate
      startDate
      finishDate
      email
      phoneNumber
    }
  }
`;
