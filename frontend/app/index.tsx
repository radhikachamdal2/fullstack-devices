import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Stack, Link } from "expo-router";
import { createStackNavigator } from "@react-navigation/stack";
import { ApolloProvider } from "@apollo/client";
import client from "./src/apollo/apolloClient";
import HomeScreen from "./home";

// const Stack = createStackNavigator();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <HomeScreen />

      {/* <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer> */}
    </ApolloProvider>
  );
};

export default App;
