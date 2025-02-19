import { ApolloServer } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import gql from "graphql-tag";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { accounts } from './mockData';
import { devices } from '../devices-service/mockData'; 


dotenv.config();


const typeDefs = gql`
  type Account @key(fields: "id") {
    id: ID!
    name: String!
    email: String!
    devices: [Device]  # Link to the devices related to the account
  }

  type Device @key(fields: "id") {
    id: ID!
    name: String!
    device: String!
    accountId: ID!  # Account to which the device is linked
  }

  input AccountInput {
    name: String!
    email: String!
  }

  extend type Query {
    accounts: [Account]
  }

  type Mutation {
    createAccount(input: AccountInput!): Account
  }
`;

const resolvers = {
  Query: {
    accounts: () => accounts,  // Returns all accounts
  },

  Account: {
    devices: (parent: any) => {
      // Return devices linked to the account by accountId
      return devices.filter(device => device.accountId === parent.id);
    },
  },

  Mutation: {
    createAccount: (parent: any, { input }: { input: { name: string; email: string } }) => {
      const newAccount = {
        id: uuidv4(), 
        name: input.name,
        email: input.email,
      };

      accounts.push(newAccount); 
      return newAccount;  
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

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`Account Service ready at ${url}`);
});
