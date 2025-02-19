import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "/graphql",
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});

export default client;
