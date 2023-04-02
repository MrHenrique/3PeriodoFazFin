import * as React from "react";
import { useState, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";
import EstoqueGeral from "./EstoqueGeral";
import EntradaEstoque from "./EntradaEstoque";
const FirstRoute = () => <EntradaEstoque />;

const SecondRoute = () => <EstoqueGeral />;

const ThirdRoute = () => <EstoqueGeral />;
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

export default function Estoque({ navigation }) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "first",
      title: "Produtos utilizados",
    },
    {
      key: "second",
      title: "Compra de produtos",
    },
    {
      key: "third",
      title: "Estoque de produtos",
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
