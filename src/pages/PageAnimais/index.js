import * as React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import PageListaVacas from "./PageListavacas";
import Leite from "../Leite";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function PageAnimais() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { color: "#fff" },
          tabBarIndicatorStyle: { backgroundColor: "#fff" },
          tabBarStyle: styles.tab,
        }}
      >
        <Tab.Screen name="Lista Vacas" component={PageListaVacas} />
        <Tab.Screen name="Leite" component={Leite} />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
  },
});
