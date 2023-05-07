import React, { useState, useEffect, useCallback, useContext } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Header from "../../components/Header";
import { scale, verticalScale } from "react-native-size-matters";
import AdicionarLeite from "./AdicionarLeite";
import RegistrosLeite from "./RegistrosLeite";
const FirstRoute = () => <AdicionarLeite />;
const SecondRoute = () => <RegistrosLeite />;
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

function Leite() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "first",
      title: "Cadastrar Leite",
    },
    {
      key: "second",
      title: "Dados Leite",
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

export default Leite;
