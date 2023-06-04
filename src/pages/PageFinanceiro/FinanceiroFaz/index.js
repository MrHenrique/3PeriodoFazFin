import * as React from "react";
import { useEffect, useContext } from "react";
import { StyleSheet } from "react-native";
import Relatorio from "./Relatorio";
import Despesas from "./Despesas";
import Faturamento from "./Faturamento";
import { AuthContext } from "../../../contexts/auth";
import { DespesasTotais } from "../../../components/Calculos DB/DespesasTotais";
import { ReceitasTotais } from "../../../components/Calculos DB/ReceitasTotais";
import { useMainContext } from "../../../contexts/RealmContext";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import styles, { estilo } from "../styles";
export default function FinanceiroFaz() {
  const realm = useMainContext();
  const Tab = createMaterialTopTabNavigator();
  const { PrecoCF, ListaAli, fazID, PrecoLeite, ListaLeite } =
    useContext(AuthContext);

  //Buscar no banco Despesas faz
  useEffect(() => {
    if (realm) {
      let dataDespesas = realm.objectForPrimaryKey("Farm", fazID);
      let despesas = [];
      dataDespesas.rebanhos.forEach((rebanho) => {
        despesas.push(...rebanho.despesas);
      });
      if (despesas.length > 0) {
        despesas = despesas.sort((a, b) => a.createdAt - b.createdAt);
      }
      PrecoCF(DespesasTotais(despesas));
      ListaAli(despesas);
      //Buscar no banco receita faz
      let dataReceitas = realm.objectForPrimaryKey("Farm", fazID);
      let receitas = [];
      dataReceitas.rebanhos.forEach((rebanho) => {
        receitas.push(...rebanho.receitas);
      });
      if (receitas.length > 0) {
        receitas = receitas.sort((a, b) => a.createdAt - b.createdAt);
      }
      PrecoLeite(ReceitasTotais(receitas));
      ListaLeite(receitas);
    }
  }, [realm]);
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { ...estilo.tabarlabel },
          tabBarIndicatorStyle: { ...estilo.tabBarIndicator },
          tabBarStyle: styles.tab,
        }}
      >
        <Tab.Screen name="Relatórios" component={Relatorio} />
        <Tab.Screen name="Despesas" component={Despesas} />
        <Tab.Screen name="Faturamento" component={Faturamento} />
      </Tab.Navigator>
    </>
  );
}
