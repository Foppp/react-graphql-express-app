import { gql } from '@apollo/client';

export const GET_ALL_ARTISTS = gql`
  query {
    getArtists {
      _id
      name
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
      name
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
