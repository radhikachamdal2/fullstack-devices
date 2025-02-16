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
  { id: "2", name: "Radhika", email: "radhika@example.com" }
];

const resolvers = {
  Query: {
    accounts: () => accounts,
  }
};

const server = new ApolloServer({ schema: buildSubgraphSchema({ typeDefs, resolvers }) });

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`Account Service running at ${url}`);
});
