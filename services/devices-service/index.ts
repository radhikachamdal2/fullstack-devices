import { ApolloServer } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import gql from "graphql-tag";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

// Mock data for devices
export const devices = [
  { id: "1", name: "Test iPhone", device: "iPhone", accountId: "1" },
  { id: "2", name: "Test iPad", device: "iPad", accountId: "1" },
  { id: "3", name: "Radhika's iPhone", device: "iPhone", accountId: "2" },
  { id: "4", name: "Radhika's iPad", device: "iPad", accountId: "2" },
  { id: "5", name: "Test4's Android", device: "Android", accountId: "3" },
];

const typeDefs = gql`
  type Device @key(fields: "id") {
    id: ID!
    name: String!
    device: String!
    accountId: ID!  # Link to the account it belongs to
  }

  input DeviceInput {
    name: String!
    device: String!
    accountId: ID!  # Account ID linking this device to an account
  }

  extend type Query {
    devices: [Device]
  }

  type Mutation {
    createDevice(input: DeviceInput!): Device
  }
`;

const resolvers = {
  Query: {
    devices: () => devices,  // Returns all devices
  },

  Mutation: {
    createDevice: (parent: any, { input }: { input: { name: string; device: string, accountId: string } }) => {
      const newDevice = {
        id: uuidv4(), // Create a unique ID
        name: input.name,
        device: input.device,
        accountId: input.accountId,  // Link device to an account
      };

      devices.push(newDevice);  // Add new device to mock data
      return newDevice;  // Return the new device
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  cors: {
    origin: "*",
    credentials: true,
  },
});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`Devices Service running at ${url}`);
});
