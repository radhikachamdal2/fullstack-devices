import { ApolloServer } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import gql from "graphql-tag";
import dotenv from "dotenv";
import { accounts } from "./mockData";
import { v4 as uuidv4 } from "uuid";

// Define the GraphQL schema
const typeDefs = gql`
  type Account {
    id: ID!
    name: String!
    email: String!
  }

 input AccountInput {
  name: String!
  email: String!
}

type Mutation {
  createAccount(input: AccountInput!): Account
}

  type Query {
    accounts: [Account]
  }
`;

// Resolver logic
const resolvers = {
  Query: {
    accounts: () => accounts, // Returns all accounts
  },
  Mutation: {
    createAccount: (parent: any, { input }: { input: { name: string; email: string } }) => {
      const newAccount = {
        id: uuidv4(), // Create a unique ID
        name: input.name,
        email: input.email,
      };

      accounts.push(newAccount); // Add new account to mock data
      return newAccount; // Return the new account
    },
  },
};


const server = new ApolloServer({ schema: buildSubgraphSchema({ typeDefs, resolvers }),   cors: {
  origin: "*",
  credentials: true,
},

}); 
server.listen({ port: 4001}).then(({ url }) => {
  console.log(`🚀 Account Service ready at ${url}`);
});
