"use client"; // Ensure this runs only on the client side

import { ApolloProvider as Provider } from "@apollo/client";
import client from "./apolloClient";

export default function ApolloProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider client={client}>{children}</Provider>;
}
