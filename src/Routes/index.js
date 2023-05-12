import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import Home from "../pages/Home";
import StackRoutes from "../Routes/stackRoutes";
import SelectRebPage from "../pages/SelectRebPage";
import Leite from "../pages/Leite";
import SelectFazPage from "../pages/SelectFazPage";
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
        name="Login"
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
        name="Selecionar Fazenda"
        component={SelectFazPage}
        options={{
          title: "Selecionar Fazenda",
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
        name="Selecionar Rebanho"
        component={SelectRebPage}
        options={{
          title: "Selecionar Rebanho",
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
        name="Página Principal"
        component={Home}
        options={{
          title: "Gerenciar Fazenda",
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
    </Drawer.Navigator>
  );
}

export default Routes;
