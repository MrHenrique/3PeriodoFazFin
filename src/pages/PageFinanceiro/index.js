import React, { useState, useEffect, useCallback, useContext } from "react";
import { StyleSheet, useWindowDimensions, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Buttons, Colors, Fonts } from "../../styles";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import FinanceiroReb from "./FinanceiroReb";
import FinanceiroFaz from "./FinanceiroFaz";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

function PageFinanceiro() {
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
        <Tab.Screen name="Fazenda" component={FinanceiroFaz} />
        <Tab.Screen name="Rebanho" component={FinanceiroReb} />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: Colors.green, 
  },
});

export default PageFinanceiro;
