import { gql } from '@apollo/client';

export const GET_ALL_ARTISTS = gql`
  query {
    getArtists {
      _id, name, age, role, status,
    }
  }
`;

export const GET_ARTIST = gql`
  query getArtist($userId: ID!) {
    getArtist(userId: $userId) {
      _id, name, age, role, status,
    }
  }
`;