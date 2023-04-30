import * as React from "react";
import { useEffect, useState, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Relatorio from "./Relatorio";
import Header from "../../../components/Header";
import Despesas from "./Despesas";
import Faturamento from "./Faturamento";
import { AuthContext } from "../../../contexts/auth";
import { DespesasTotais } from "../../../components/Calculos DB/DespesasTotais";
import { ReceitasTotais } from "../../../components/Calculos DB/ReceitasTotais";
import getAllGastos from "../../../Realm/getAllGastos";
import getAllLeite from "../../../Realm/getAllLeite";
const FirstRoute = () => <Relatorio />;

const SecondRoute = () => <Despesas />;

const ThirdRoute = () => <Faturamento />;
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

export default function FinanceiroFaz({ navigation }) {
  const { PrecoCF, ListaAli, fazID, PrecoLeite, ListaLeite } =
    useContext(AuthContext);
  const [dataGasto, setDataGastos] = useState([]);
  const [dataReceitas, setDataReceitas] = useState([]);
  async function fetchDataDes(fazID) {
    const dataGas = await getAllGastos(fazID);
    setDataGastos(dataGas);
    ListaAli(dataGas);
    const precoCF = DespesasTotais(dataGas);
    PrecoCF(precoCF);
  }
  async function fetchDataRec(fazID) {
    const dataRec = await getAllLeite(fazID);
    setDataReceitas(dataRec);
    ListaLeite(dataRec);
    const precoLeite = ReceitasTotais(dataRec);
    PrecoLeite(precoLeite);
  }
  useFocusEffect(
    useCallback(() => {
      fetchDataRec(fazID);
      fetchDataDes(fazID);
    }, [])
  );

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "first",
      title: "Relatórios",
    },
    {
      key: "second",
      title: "Despesas",
    },
    {
      key: "third",
      title: "Faturamento",
    },
  ]);
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: "#fff",
      }}
      style={styles.tab}
      labelStyle={{
        color: "#fff",
      }}
    />
  );
  return (
    <>
      <TabView
        navigationState={{
          index,
          routes,
        }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{
          width: layout.width,
        }}
        renderTabBar={renderTabBar}
      />
    </>
  );
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
  },
});
