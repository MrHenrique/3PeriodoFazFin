import * as React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Relatorio from "./Relatorio";
import Header from "../../components/Header";
import Despesas from "./Despesas";
import Faturamento from "./Faturamento";
const FirstRoute = () => <Relatorio />;

const SecondRoute = () => <Despesas />;

const ThirdRoute = () => <Faturamento />;
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

export default function FinanceiroFaz({ navigation }) {
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
      <Header title={"Olá, Carlos"} />
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
