import { ApolloServer } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import dotenv from "dotenv";
import { typeDefs } from './schema'
import { resolvers } from './resolvers'


dotenv.config();

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
