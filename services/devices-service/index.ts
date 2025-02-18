import { ApolloServer } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import gql from "graphql-tag";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { devices } from './mockData'

dotenv.config();

// Define the GraphQL schema
const typeDefs = gql`

  type Device {
    id: ID!
    name: String!
    device: String!
  }

    input DeviceInput {
  name: String!
  device: String!
}


  extend type Query {
    devices: [Device]
  }




  type Mutation {
  createNewDevice(input: DeviceInput!): Device
} 



`;

const resolvers = {
  Query: {
    devices: () => devices
  },

    Mutation: {
      createNewDevice: (parent: any, { input }: { input: {  name: string, device:string } }) => {
        const newDevice = {
          id: uuidv4(), // Create a unique ID
          name: input.name,
          device: input.device,
        };
  
        devices.push(newDevice); // Add new account to mock data
        return newDevice; // Return the new account
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
