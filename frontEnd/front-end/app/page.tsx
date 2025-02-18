"use client";

import ApolloProvider from "./apollo/apolloProvider";
import AccountDashboard from "./components/accountDashboard";
import Header from "./components/header";

export default function Home() {
  return (
    <ApolloProvider>
      <Header navigationHeader="Account Details" />
      <AccountDashboard />
    </ApolloProvider>
  );
}
