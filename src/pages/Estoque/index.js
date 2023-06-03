import * as React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import Header from "../../components/Header";
import EstoqueGeral from "./EstoqueGeral";
import EntradaEstoque from "./EntradaEstoque";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import styles, { estilo } from "./styles";

const Tab = createMaterialTopTabNavigator();

export default function Estoque() {
  return (
    <>
      <Header />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { ...estilo.tabarlabel },
          tabBarIndicatorStyle: { ...estilo.tabBarIndicator },
          tabBarStyle: styles.tab,
        }}
      >
        <Tab.Screen name="Compras" component={EntradaEstoque} />
        <Tab.Screen name="Estoque Geral" component={EstoqueGeral} />
      </Tab.Navigator>
    </>
  );
}
