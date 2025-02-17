import { ApolloServer } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import gql from "graphql-tag";
import dotenv from "dotenv";

dotenv.config();

const typeDefs = gql`
  extend type Query {
    devices: [Device]
  }

  type Device @key(fields: "id") {
    id: ID!
    name: String!
    device: String!
  }
`;

const devices = [
  { id: "1", name: "Test", device: "iphone" },
  { id: "2", name: "Radhika", device: "watch"}, 
  { id: "3", name: "Test4", device: "iphone4" },
  { id: "4", name: "Ben", device: "apple-watch"},
  { id: "1", name: "Manny", device: "fitbit" },
  { id: "2", name: "Gloria", device: "tabler"  }
];

const resolvers = {
  Query: {
    devices: () => devices,
  }
};

const server = new ApolloServer({ schema: buildSubgraphSchema({ typeDefs, resolvers }),   cors: {
  origin: "*",
  credentials: true,
},
});

server.listen({ port: 4002}).then(({ url }) => {
  console.log(`Devices Service running at ${url}`);
});
