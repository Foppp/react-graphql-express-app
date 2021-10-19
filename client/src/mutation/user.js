import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation createUser($input: UserInput) {
    createUser(input: $input) {
      id, username, userlastname, age
    }
  }
`;