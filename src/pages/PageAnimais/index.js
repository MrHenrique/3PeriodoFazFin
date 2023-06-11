import * as React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import PageListaVacas from "./PageListavacas";
import Leite from "../Leite";
import PageGerenciar from "./PageGerenciar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import styles, { estilo } from "./styles";
const Tab = createMaterialTopTabNavigator();

export default function PageAnimais() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { ...estilo.tabarlabel },
          tabBarIndicatorStyle: { ...estilo.tabBarIndicator },
          tabBarStyle: styles.tab,
          lazy: true,
        }}
      >
        <Tab.Screen name="Lista Vacas" component={PageListaVacas} />
        <Tab.Screen name="Leite" component={Leite} />
        <Tab.Screen name="Vendas" component={PageGerenciar} />
      </Tab.Navigator>
    </>
  );
}
