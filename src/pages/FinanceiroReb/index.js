import * as React from "react";
import { useEffect, useState, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import RelatorioReb from "./RelatorioReb";
import Header from "../../components/Header";
import DespesasReb from "./DespesasReb";
import FaturamentoReb from "./FaturamentoReb";
import { AuthContext } from "../../contexts/auth";
import { DespesasTotais } from "../../components/Calculos DB/DespesasTotais";
import { ReceitasTotais } from "../../components/Calculos DB/ReceitasTotais";
import getAllGastosReb from "../../Realm/getAllGastosReb";
import getAllLeiteReb from "../../Realm/getAllLeiteReb";
const FirstRoute = () => <RelatorioReb />;

const SecondRoute = () => <DespesasReb />;

const ThirdRoute = () => <FaturamentoReb />;
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

export default function FinanceiroReb({ navigation }) {
  const { PrecoCFReb, ListaAliReb, fazID, rebID, PrecoLeiteReb, ListaLeiteReb } =
    useContext(AuthContext);
  const [dataGasto, setDataGastos] = useState([]);
  const [dataReceitas, setDataReceitas] = useState([]);
  async function fetchDataDes(rebID) {
    const dataGas = await getAllGastosReb(rebID);
    setDataGastos(dataGas);
    ListaAliReb(dataGas);
    const precoCF = DespesasTotais(dataGas);
    PrecoCFReb(precoCF);
  }
  async function fetchDataRec(rebID) {
    const dataRec = await getAllLeiteReb(rebID);
    setDataReceitas(dataRec);
    ListaLeiteReb(dataRec);
    const precoLeite = ReceitasTotais(dataRec);
    PrecoLeiteReb(precoLeite);
  }
  useFocusEffect(
    useCallback(() => {
      fetchDataRec(rebID);
      fetchDataDes(rebID);
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
      <Header />
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
