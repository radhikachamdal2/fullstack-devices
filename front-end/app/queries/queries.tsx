import { gql } from "@apollo/client";

export const GET_ACCOUNTS = gql`
  query GetAccounts {
    accounts {
      id
      name
      email
      devices {
        id
        name
        device
      }
    }
  }
`;

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount($input: AccountInput!) {
    createAccount(input: $input) {
      id
      name
      email
      devices {
        device
      }
    }
  }
`;

export const GET_DEVICES = gql`
  query GetDevices {
    devices {
      id
      name
      device
    }
  }
`;

export const CREATE_NEW_DEVICE = gql`
  mutation CreateDevice($input: DeviceInput!) {
    createNewDevice(input: $input) {
      id
      name
      device
    }
  }
`;
