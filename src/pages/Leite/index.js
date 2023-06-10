import React from "react";
import { useContext, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AdicionarLeite from "./AdicionarLeite";
import RegistrosLeite from "./RegistrosLeite";
import styles, { estilo } from "./styles";
import { AuthContext } from "../../contexts/auth";
import { useMainContext } from "../../contexts/RealmContext";

const Tab = createMaterialTopTabNavigator();

function Leite() {
  const realm = useMainContext();
  const { ListaLeiteReb, rebID } = useContext(AuthContext);
  useEffect(() => {
    if (realm) {
      let dataReceitasreb = realm.objectForPrimaryKey("RebanhoSchema", rebID);
      ListaLeiteReb(dataReceitasreb.receitas);

      dataReceitasreb.receitas.addListener((values) => {
        const sortedValues = [...values].sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });

        ListaLeiteReb(sortedValues);
      });
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
        <Tab.Screen name="Cadastrar Leite" component={AdicionarLeite} />
        <Tab.Screen name="Dados Leite" component={RegistrosLeite} />
      </Tab.Navigator>
    </>
  );
}

export default Leite;
