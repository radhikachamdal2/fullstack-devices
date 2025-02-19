import { ApolloServer } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import gql from "graphql-tag";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { devices } from "./mockData";

dotenv.config();


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
    devices: () => devices, 
  },

  Mutation: {
    createDevice: (parent: any, { input }: { input: { name: string; device: string, accountId: string } }) => {
      const newDevice = {
        id: uuidv4(), 
        name: input.name,
        device: input.device,
        accountId: input.accountId,  // Link device to an account
      };

      devices.push(newDevice); 
      return newDevice;  
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
