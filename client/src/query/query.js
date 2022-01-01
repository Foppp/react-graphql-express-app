import { gql } from '@apollo/client';

export const GET_ALL_ARTISTS = gql`
  query {
    getArtists {
      _id, name, age, role, status,
    }
  }
`;