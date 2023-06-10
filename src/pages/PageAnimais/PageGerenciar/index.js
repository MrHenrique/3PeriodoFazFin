import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Venda from "./PageVenda";
import RegistrosVendas from "./PageRegistrosVenda";
import CadastroVaca from "../../Cadastro/CadastroVaca";
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
        }}
      >
        <Tab.Screen name="Gerar Venda " component={Venda} />
        <Tab.Screen name="Registros de Vendas" component={RegistrosVendas} />
        <Tab.Screen name="Cadastrar" component={CadastroVaca} />
      </Tab.Navigator>
    </>
  );
}

export default PageGerenciar;