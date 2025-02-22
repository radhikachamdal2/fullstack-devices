import { ApolloServer } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import dotenv from "dotenv";

dotenv.config();

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
