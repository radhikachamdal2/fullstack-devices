import { gql } from '@apollo/client';

export const GET_ACCOUNTS_QUERY = gql`
  query accounts {
    accounts {
      id
      name
      email
    }
  }
`;

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount($name: String!, $email: String!) {
    createAccount(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;


