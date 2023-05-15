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
import { Colors } from "../../../styles/";
export default function FinanceiroReb() {
  const Tab = createMaterialTopTabNavigator();
  const realm = useMainContext();
  const { PrecoCFReb, ListaAliReb, rebID, PrecoLeiteReb, ListaLeiteReb } =
    useContext(AuthContext);
  //Buscar no banco Gastos Reb
  useEffect(() => {
    if (realm) {
      let dataGastos = realm.objectForPrimaryKey("RebanhoSchema", rebID);
      let sortedGastos = [];
      sortedGastos = dataGastos.despesas;
      if (sortedGastos > 0) {
        sortedGastos = dataGastos.despesas.sort(
          (a, b) => a.createdAt - b.createdAt
        );
      }
      PrecoCFReb(DespesasTotais(sortedGastos));
      ListaAliReb(sortedGastos);
      //Buscar no banco Receitas Reb
      let dataReceitas = realm.objectForPrimaryKey("RebanhoSchema", rebID);
      let receitas = [];
      dataReceitas.vacas.forEach((vaca) => {
        receitas.push(...vaca.receitas);
      });
      if (receitas.length > 0) {
        receitas = receitas.sort((a, b) => a.createdAt - b.createdAt);
      }
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
    backgroundColor: Colors.btndarkgreen,
  },
});
