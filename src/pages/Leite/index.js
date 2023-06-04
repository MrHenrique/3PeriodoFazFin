import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Header from "../../components/Header";
import AdicionarLeite from "./AdicionarLeite";
import RegistrosLeite from "./RegistrosLeite";
import styles, { estilo } from "./styles";

const Tab = createMaterialTopTabNavigator();

function Leite() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { ...estilo.tabarlabel },
          tabBarIndicatorStyle: { ...estilo.tabBarIndicator },
          tabBarStyle: styles.tab,
        }}
      >
        <Tab.Screen name="Cadastrar Leite" component={AdicionarLeite} />
        <Tab.Screen name="Dados Leite" component={RegistrosLeite} />
      </Tab.Navigator>
    </>
  );
}

export default Leite;
