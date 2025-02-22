import gql from "graphql-tag";

export const typeDefs = gql`

  type Account @key(fields: "id") {
    id: ID!
    name: String!
    email: String!
    devices: [Device]  
  }

  type Device @key(fields: "id") {
    id: ID!
    name: String
    device: String!
    accountId: ID
  }

  input DeviceInput {
    name: String  
    device: String!
      accountId: ID
  }

  input AccountInput {
    name: String!
    email: String!
    devices: [DeviceInput] 
  }

  extend type Query {
    accounts: [Account]
  }

  type Mutation {
    createAccount(input: AccountInput!): Account
  }
`;