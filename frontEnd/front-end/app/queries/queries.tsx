import { gql } from "@apollo/client";

export const GET_ACCOUNTS = gql`
  query GetAccounts {
    accounts {
      id
      name
      email
    }
  }
`;

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount($input: AccountInput!) {
    createAccount(input: $input) {
      id
      name
      email
    }
  }
`;
