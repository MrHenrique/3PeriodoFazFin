import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import Routes from "./src/Routes";
import AuthProvider from "./src/contexts/auth";
function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
      <StatusBar hidden={true} />
      <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

registerRootComponent(App);
