import React, { useState, useEffect, useCallback, useContext } from "react";
import { StyleSheet, useWindowDimensions, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import FinanceiroReb from "./FinanceiroReb";
import FinanceiroFaz from "./FinanceiroFaz";
import Carregando from "../../components/Carregando";
const FirstRoute = () => <FinanceiroFaz />;
const SecondRoute = () => <FinanceiroReb />;
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const LazyPlaceholder = ({ route }) => <Carregando title={route.title} />;

function PageFinanceiro() {
  const { idPageFinanceiro, IdPageFinanceiro } = useContext(AuthContext);
  const pageindex = idPageFinanceiro;
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(pageindex);

  const [routes] = React.useState([
    {
      key: "first",
      title: "Fazenda",
    },
    {
      key: "second",
      title: "Rebanho",
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
  _handleIndexChange = (index) => this.setState({ index });

  _renderLazyPlaceholder = ({ route }) => <LazyPlaceholder route={route} />;

  return (
    <>
      <Header />
      <TabView
        lazy
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
        renderLazyPlaceholder={_renderLazyPlaceholder}
      />
    </>
  );
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
  },
});

export default PageFinanceiro;
