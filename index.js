import 'expo-dev-client';

import { registerRootComponent } from 'expo';
import Routes from './src/Routes';
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native"; 
import { StatusBar } from "react-native";

function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <Routes />
    </NavigationContainer>
  );
}

registerRootComponent(App);

