import "react-native-gesture-handler";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import Routes from "./src/Routes";
import AuthProvider from "./src/contexts/auth";
import RealmContextProvider from "./src/contexts/RealmContext";
import { PaperProvider } from "react-native-paper";
function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <RealmContextProvider>
        <AuthProvider>
          <PaperProvider>
            <StatusBar hidden={true} />
            <Routes />
          </PaperProvider>
        </AuthProvider>
      </RealmContextProvider>
    </NavigationContainer>
  );
}

registerRootComponent(App);
