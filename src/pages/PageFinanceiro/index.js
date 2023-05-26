import React, { useContext } from "react";
import { StyleSheet, } from "react-native";
import { Colors} from "../../styles";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import FinanceiroReb from "./FinanceiroReb";
import FinanceiroFaz from "./FinanceiroFaz";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

function PageFinanceiro() {
  const { shouldGoPageFinanceiro } = useContext(AuthContext);
  function setInicialTab() {
    if (shouldGoPageFinanceiro === 0) {
      return "Fazenda";
    } else {
      return "Rebanho";
    }
  }

  return (
    <>
      <Header />
      <Tab.Navigator
        initialRouteName={setInicialTab()}
        screenOptions={{
          tabBarLabelStyle: { color: Colors.white },
          tabBarIndicatorStyle: { backgroundColor:Colors.white },
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
