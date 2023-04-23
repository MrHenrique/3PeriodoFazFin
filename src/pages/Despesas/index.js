import * as React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Header from "../../components/Header";
import Outros from "./Outros";
const FirstRoute = () => <Outros/> ;

const SecondRoute = () =><Outros/>;
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function Despesas() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "first",
      title: "Saída de estoque",
    },
    {
      key: "second",
      title: "Outras Despesas",
    },
  ]);
  const handleTabChange = (newIndex) => {
    setIndex(newIndex === index ? newIndex + 1 : newIndex);
  };
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
        onIndexChange={handleTabChange}
        initialLayout={{
          width: layout.width,
        }}
        renderTabBar={renderTabBar}
        key={index}
        lazy={false}
      />
    </>
  );
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
  },
});
