import * as React from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Header from "../../components/Header";
import Outros from "./Outros";
import SaidaEstoque from "./SaidaEstoque";
import styles, { estilo } from "./styles";

const Tab = createMaterialTopTabNavigator();

export default function Despesas() {
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
        <Tab.Screen name="Saída de estoque" component={SaidaEstoque} />
        <Tab.Screen name="Outras Despesas" component={Outros} />
      </Tab.Navigator>
    </>
  );
}
