import { gql } from '@apollo/client';

export const GET_USER = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      _id
      username
      email
      displayName
    }
  }
`;

export const GET_ALL_ARTISTS = gql`
  query {
    getArtists {
      _id
      firstName
      lastName
      gender
      showIds
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
      showIds
      role
      birthDate
      startDate
      finishDate
      email
      phoneNumber
    }
  }
`;

export const GET_ALL_SHOWS = gql`
  query {
    getShows {
      _id
      name
      artistIds
      startDate
      finishDate
      description
    }
  }
`;

export const GET_SHOW = gql`
  query getShow($showId: ID!) {
    getShow(showId: $showId) {
      _id
      name
      artistIds
      startDate
      finishDate
      description
    }
  }
`;

export const GET_ALL_CUSTOMERS = gql`
  query {
    getCustomers {
      _id
      name
      country
      city
      email
      phoneNumber
    }
  }
`;

export const GET_CUSTOMER = gql`
  query getCustomer($customerId: ID!) {
    getCustomer(customerId: $customerId) {
      _id
      name
      country
      city
      email
      phoneNumber
    }
  }
`;