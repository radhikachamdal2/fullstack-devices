import gql from "graphql-tag";

export const typeDefs = gql`
  type Device @key(fields: "id") {
    id: ID!
    name: String
    device: String!
    accountId: ID!
  }

  input DeviceInput {
    name: String!
    device: String!
    accountId: ID  # Account ID linking this device to an account
  }

  extend type Query {
    devices: [Device]
  }

  type Mutation {
    createDevice(input: DeviceInput!): Device
  }
`;