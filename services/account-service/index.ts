import { ApolloServer } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import gql from "graphql-tag";
import dotenv from "dotenv";

dotenv.config();

const typeDefs = gql`
  extend type Query {
    accounts: [Account]
  }

  type Account @key(fields: "id") {
    id: ID!
    name: String!
    email: String!

  }
`;

const accounts = [
  { id: "1", name: "Test", email: "test@example.com" },
  { id: "2", name: "Radhika", email: "radhika@example.com" },
  { id: "2", name: "Radhika", email: "radhika@example.com" }, 
  { id: "3", name: "Test4", email: "radhika@example.com" },
  { id: "4", name: "Ben", email: "radhika@example.com" },
  { id: "1", name: "Manny", email: "radhika@example.com" },
  { id: "2", name: "Gloria", email: "radhika@example.com"   }
];

const resolvers = {
  Query: {
    accounts: () => accounts,
  }
};

const server = new ApolloServer({ schema: buildSubgraphSchema({ typeDefs, resolvers }),   cors: {
  origin: "http://localhost:8081",
  credentials: true,
},

}); 
server.listen({ port: 4001}).then(({ url }) => {
  console.log(`🚀 Account Service ready at ${url}`);
});
