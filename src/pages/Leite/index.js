import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Header from "../../components/Header";
import AdicionarLeite from "./AdicionarLeite";
import RegistrosLeite from "./RegistrosLeite";

const Tab = createMaterialTopTabNavigator();

function Leite() {
  return (
    <>
      <Header />
      <Tab.Navigator
         screenOptions={{
          tabBarLabelStyle: { color: "#fff" },
          tabBarIndicatorStyle: { backgroundColor: "#fff" },
          tabBarStyle: styles.tab,
        }}
      >
        <Tab.Screen name="Cadastrar Leite" component={AdicionarLeite} />
        <Tab.Screen name="Dados Leite" component={RegistrosLeite} />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
  },
});

export default Leite;
