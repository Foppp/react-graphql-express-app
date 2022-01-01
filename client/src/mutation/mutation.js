import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      userId
      token
    }
  }
`;

export const CREATE_ARTIST = gql`
  mutation createArtist($artist: ArtistInput) {
    createArtist(artist: $artist) {
      success
    }
  }
`;

export const REMOVE_ARTIST = gql`
  mutation removeArtist($userId: ID!) {
    removeArtist(userId: $userId) {
      success
    }
  }
`;
