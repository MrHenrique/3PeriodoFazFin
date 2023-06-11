import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Venda from "./PageVenda";
import RegistrosVendas from "./PageRegistrosVenda";
import styles, { estilo } from "./styles";

const Tab = createMaterialTopTabNavigator();

function PageGerenciar() {
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
        <Tab.Screen name="Registros de Vendas" component={RegistrosVendas} />
        <Tab.Screen name="Gerar Venda " component={Venda} />
      </Tab.Navigator>
    </>
  );
}

export default PageGerenciar;
