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
  mutation createArtist($artist: ArtistInput!) {
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

export const EDIT_ARTIST = gql`
  mutation editArtist($userId: ID!, $artist: ArtistInput!) {
    editArtist(userId: $userId, artist: $artist) {
      success
    }
  }
`;

export const CREATE_SHOW = gql`
  mutation createShow($show: ShowInput!) {
    createShow(show: $show) {
      success
    }
  }
`;

export const REMOVE_SHOW = gql`
  mutation removeShow($showId: ID!) {
    removeShow(showId: $showId) {
      success
    }
  }
`;

export const EDIT_SHOW = gql`
  mutation editShow($showId: ID!, $show: ShowInput!) {
    editShow(showId: $showId, show: $show) {
      success
    }
  }
`;

export const CREATE_CUSTOMER = gql`
  mutation createCustomer($customer: CustomerInput!) {
    createCustomer(customer: $customer) {
      success
    }
  }
`;

export const REMOVE_CUSTOMER = gql`
  mutation removeCustomer($customerId: ID!) {
    removeCustomer(customerId: $customerId) {
      success
    }
  }
`;

export const EDIT_CUSTOMER = gql`
  mutation editCustomer($customerId: ID!, $customer: CustomerInput!) {
    editCustomer(customerId: $customerId, customer: $customer) {
      success
    }
  }
`;