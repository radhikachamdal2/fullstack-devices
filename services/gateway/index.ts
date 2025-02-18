import { ApolloServer } from "apollo-server";
import { ApolloGateway } from "@apollo/gateway";

const gateway = new ApolloGateway({
  serviceList: [
    { name: "accounts", url: "http://localhost:4001" },
    { name: "devices", url: "http://localhost:4002" }
  ],
});

const server = new ApolloServer({ gateway,   cors: {
  origin: "*",
  credentials: true,
},
 } )

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Apollo Gateway running at ${url}`);
});