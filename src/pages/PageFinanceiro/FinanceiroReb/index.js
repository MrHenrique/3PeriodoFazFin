import * as React from "react";
import { useEffect, useContext } from "react";
import { StyleSheet } from "react-native";
import RelatorioReb from "./RelatorioReb";
import DespesasReb from "./DespesasReb";
import FaturamentoReb from "./FaturamentoReb";
import { AuthContext } from "../../../contexts/auth";
import { DespesasTotais } from "../../../components/Calculos DB/DespesasTotais";
import { ReceitasTotais } from "../../../components/Calculos DB/ReceitasTotais";
import { useMainContext } from "../../../contexts/RealmContext";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
export default function FinanceiroReb() {
  const Tab = createMaterialTopTabNavigator();
  const realm = useMainContext();
  const { PrecoCFReb, ListaAliReb, rebID, PrecoLeiteReb, ListaLeiteReb } =
    useContext(AuthContext);
  //Buscar no banco Gastos Reb
  useEffect(() => {
    if (realm) {
      let dataGastos = realm.objectForPrimaryKey("RebanhoSchema", rebID);
      PrecoCFReb(DespesasTotais(dataGastos.despesas));
      ListaAliReb(dataGastos.despesas);
    }
  }, [realm]);
  //Buscar no banco Receitas Reb
  useEffect(() => {
    if (realm) {
      let dataReceitas = realm.objectForPrimaryKey("RebanhoSchema", rebID);
      let receitas = [];
      dataReceitas.vacas.forEach((vaca) => {
        receitas.push(...vaca.receitas);
      });
      PrecoLeiteReb(ReceitasTotais(receitas));
      ListaLeiteReb(receitas);
    }
  }, [realm]);
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { color: "#fff" },
          tabBarIndicatorStyle: { backgroundColor: "#fff" },
          tabBarStyle: styles.tab,
        }}
      >
        <Tab.Screen name="Relatórios" component={RelatorioReb} />
        <Tab.Screen name="Despesas" component={DespesasReb} />
        <Tab.Screen name="Faturamento" component={FaturamentoReb} />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
  },
});
