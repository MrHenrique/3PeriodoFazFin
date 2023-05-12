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
      PrecoCF(DespesasTotais(despesas));
      ListaAli(despesas);
    }
  }, [realm]);
  //Buscar no banco receita faz
  useEffect(() => {
    if (realm) {
      let dataReceitas = realm.objectForPrimaryKey("Farm", fazID);
      let receitas = [];
      dataReceitas.rebanhos.forEach((rebanho) => {
        rebanho.vacas.forEach((vaca) => {
          receitas.push(...vaca.receitas);
        });
      });
      PrecoLeite(ReceitasTotais(receitas));
      ListaLeite(receitas);
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
        <Tab.Screen name="Relatórios" component={Relatorio} />
        <Tab.Screen name="Despesas" component={Despesas} />
        <Tab.Screen name="Faturamento" component={Faturamento} />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: Colors.btndarkgreen,
  },
});
