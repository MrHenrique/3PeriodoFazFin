import * as React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import styles, { estilo } from "../styles";
import Vacas from "./Vacas";
import FinanceiroVaca from "./FinanceiroVaca";
import Reproducao from "../../Reproducao";
const Tab = createMaterialTopTabNavigator();

export default function PageAnimais() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { ...estilo.tabarlabel },
          tabBarIndicatorStyle: { ...estilo.tabBarIndicator },
          tabBarStyle: styles.tab,
        }}
      >
        <Tab.Screen name="Vacas" component={Vacas} />
        <Tab.Screen name="Financeiro" component={FinanceiroVaca} />
        <Tab.Screen name="Reprodução" component={Reproducao} />
      </Tab.Navigator>
    </>
  );
}
