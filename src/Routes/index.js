import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
  Fontisto,
  AntDesign,
} from "@expo/vector-icons";
import CadastroFaz from "../pages/CadastroFaz";
import StackRoutes from "../Routes/stackRoutes";
import PageListavacas from "../pages/PageListavacas";
import PagelancaContas from "../pages/PagelancaContas";
import GeralFaz from "../pages/GeralFaz";
import CadastroReb from "../pages/CadastroReb";
import Manejo from "../pages/Manejo";
import Leite from "../pages/Leite";
import GeralReb from "../pages/GeralReb";
import FinanceiroFaz from "../pages/FinanceiroFaz";
import FinanceiroReb from "../pages/FinanceiroReb";
import Estoque from "../pages/Estoque";
import SelectFazPage from "../pages/SelectFazPage";
import Despesas from "../pages/Despesas";
const Drawer = createDrawerNavigator();
function Routes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,

        drawerStyle: {
          backgroundColor: "#004513",
          paddingTop: 20,
        },
        drawerPosition: "right",
        drawerActiveBackgroundColor: "#0F6D00",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#FFF",
      }}
    >
      <Drawer.Screen
        name="HomeDrawer"
        component={StackRoutes}
        options={{
          title: "Login",
          drawerIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="SelectFazPage"
        component={SelectFazPage}
        options={{
          title: "Selecionar Fazenda",
          drawerIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Despesas"
        component={Despesas}
        options={{
          title: "Despesas",
          drawerIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="CadastroFaz"
        component={CadastroFaz}
        options={{
          title: "Cadastro de fazendas",
          drawerIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? "ios-trail-sign" : "ios-trail-sign-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Visão geral de Fazenda"
        component={GeralFaz}
        options={{
          title: "Visão geral de Fazenda",
          drawerIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name={focused ? "finance" : "finance"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Cadastro Rebanho"
        component={CadastroReb}
        options={{
          title: "Cadastro Rebanho",
          drawerIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name={focused ? "cow-off" : "cow"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="FinanceiroFaz"
        component={FinanceiroFaz}
        options={{
          title: "Financeiro fazenda",
          drawerIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name={
                focused ? "calculator-variant-outline" : "calculator-variant"
              }
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Visão geral de rebanho"
        component={GeralReb}
        options={{
          title: "Visão geral de rebanho",
          drawerIcon: ({ focused, size, color }) => (
            <Entypo
              name={focused ? "line-graph" : "line-graph"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="FinanceiroReb"
        component={FinanceiroReb}
        options={{
          title: "Financeiro Rebanho",
          drawerIcon: ({ focused, size, color }) => (
            <AntDesign
              name={focused ? "linechart" : "linechart"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Vacas"
        component={PageListavacas}
        options={{
          title: "Lista de Vacas",
          drawerIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? "list-circle" : "list-circle-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Contas"
        component={PagelancaContas}
        options={{
          title: "Produção e despesas",
          drawerIcon: ({ focused, size, color }) => (
            <MaterialIcons
              name={focused ? "attach-money" : "attach-money"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Leite"
        component={Leite}
        options={{
          title: "Leite",
          drawerIcon: ({ focused, size, color }) => (
            <Entypo
              name={focused ? "bucket" : "bucket"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Manejo"
        component={Manejo}
        options={{
          title: "Manejo",
          drawerIcon: ({ focused, size, color }) => (
            <Fontisto
              name={focused ? "injection-syringe" : "injection-syringe"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Estoque"
        component={Estoque}
        options={{
          title: "Estoque",
          drawerIcon: ({ focused, size, color }) => (
            <Fontisto
              name={focused ? "shopping-store" : "shopping-store"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default Routes;
