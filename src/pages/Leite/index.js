import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
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
        <Tab.Screen name="Dados Leite" component={RegistrosLeite} />
        <Tab.Screen name="Cadastrar Leite" component={AdicionarLeite} />
      </Tab.Navigator>
    </>
  );
}

export default Leite;
