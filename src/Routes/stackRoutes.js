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
import PageListavacas from "../pages/PageListavacas";
import Estoque from "../pages/Estoque";
import SelectFazPage from "../pages/SelectFazPage";
import Despesas from "../pages/Despesas";
const Stack = createNativeStackNavigator();
function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login "
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SelectFazPage"
        component={SelectFazPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Despesas"
        component={Despesas}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Estoque"
        component={Estoque}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CadastroFaz"
        component={CadastroFaz}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SelectRebPage"
        component={SelectRebPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CadastroReb"
        component={CadastroReb}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Leite"
        component={Leite}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PageFinanceiro"
        component={PageFinanceiro}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PageListavacas"
        component={PageListavacas}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CadastroVaca"
        component={CadastroVaca}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default StackRoutes;
