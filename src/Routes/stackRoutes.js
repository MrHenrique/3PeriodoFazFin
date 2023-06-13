import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CadastroFaz from "../pages/Cadastro/CadastroFaz";
import CadastroReb from "../pages/Cadastro/CadastroReb";
import CadastroVaca from "../pages/Cadastro/CadastroVaca";
import Login from "../pages/Login";
import SelectRebPage from "../pages/SelectRebPage";
import Leite from "../pages/Leite";
import PageFinanceiro from "../pages/PageFinanceiro";
import Home from "../pages/Home";
import PageAnimais from "../pages/PageAnimais";
import Estoque from "../pages/Estoque";
import SelectFazPage from "../pages/SelectFazPage";
import Despesas from "../pages/Despesas";
import SignUp from "../pages/SignUp";
import PageDetalheVaca from "../pages/PageAnimais/PageDetalheVaca";
import Reproducao from "../pages/Reproducao";
const Stack = createNativeStackNavigator();
function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginPage"
        component={Login}
        options={{
          headerShown: false,
          orientation: "portrait",
        }}
      />
      <Stack.Screen
        name="SelectFazPage"
        component={SelectFazPage}
        options={{
          headerShown: false,
          orientation: "portrait",
        }}
      />
      <Stack.Screen
        name="Despesas"
        component={Despesas}
        options={{
          headerShown: false,
          orientation: "portrait",
        }}
      />
      <Stack.Screen
        name="Estoque"
        component={Estoque}
        options={{
          headerShown: false,
          orientation: "portrait",
        }}
      />
      <Stack.Screen
        name="CadastroFaz"
        component={CadastroFaz}
        options={{
          headerShown: false,
          orientation: "portrait",
        }}
      />
      <Stack.Screen
        name="SelectRebPage"
        component={SelectRebPage}
        options={{
          headerShown: false,
          orientation: "portrait",
        }}
      />
      <Stack.Screen
        name="CadastroReb"
        component={CadastroReb}
        options={{
          headerShown: false,
          orientation: "portrait",
        }}
      />
      <Stack.Screen
        name="Leite"
        component={Leite}
        options={{
          headerShown: false,
          orientation: "portrait",
        }}
      />
      <Stack.Screen
        name="PageFinanceiro"
        component={PageFinanceiro}
        options={{
          headerShown: false,
          orientation: "portrait",
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          orientation: "portrait",
        }}
      />
      <Stack.Screen
        name="PageAnimais"
        component={PageAnimais}
        options={{
          headerShown: false,
          orientation: "portrait",
        }}
      />
      <Stack.Screen
        name="CadastroVaca"
        component={CadastroVaca}
        options={{
          headerShown: false,
          orientation: "portrait",
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
          orientation: "portrait",
        }}
      />
      <Stack.Screen
        name="PageDetalheVaca"
        component={PageDetalheVaca}
        options={{
          headerShown: false,
          orientation: "portrait",
        }}
      />
      <Stack.Screen
        name="Reproducao"
        component={Reproducao}
        options={{
          headerShown: false,
          orientation: "portrait",
        }}
      />
    </Stack.Navigator>
  );
}

export default StackRoutes;
