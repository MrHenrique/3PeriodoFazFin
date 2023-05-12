import * as React from "react";
import { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FiltrosData from "../../../components/Filtros/FiltrosData";
import { scale, verticalScale } from "react-native-size-matters";
import { AuthContext } from "../../../contexts/auth";
import { useMainContext } from "../../../contexts/RealmContext";
function RegistrosLeite() {
  const realm = useMainContext();
  const navigation = useNavigation();
  const { rebID, ListaLeiteReb,listaFiltrada } = useContext(AuthContext);
  const [lista, setLista] = useState([]);
  const [shouldShow, setShouldShow] = useState(false);
  useEffect(() => {
    if (realm) {
      let dataReceitas = realm.objectForPrimaryKey("RebanhoSchema", rebID);
      let receitas = [];
      dataReceitas.vacas.forEach((vaca) => {
        receitas.push(...vaca.receitas);
      });
      setLista(receitas);
      ListaLeiteReb(receitas);
    }
  }, [realm]);
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.listaDet}>
        <Text style={styles.tituloBotao}>
          {item.createdAt.getDate().toString().padStart(2, 0)}/
          {(item.createdAt.getMonth() + 1).toString().padStart(2, 0)}/
          {item.createdAt.getFullYear().toString()} - {item.description} - R${" "}
          {(item.prodL * item.precoL).toFixed(2)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setShouldShow(!shouldShow)}
        style={styles.filtrosBotao}
      >
        <Text style={styles.tituloBotao}>Filtros</Text>
      </TouchableOpacity>
      {shouldShow && (
        <View style={styles.filtros}>
          {/*filtros*/}
          <FiltrosData />
        </View>
      )}
      <FlatList
        style={[
          styles.lista,
          { marginTop: shouldShow ? verticalScale(180) : 0 },
        ]}
        data={listaFiltrada}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
      <TouchableOpacity
        style={styles.botaopress}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.tituloBotao}>{"Voltar"}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#004513",
    padding: 20,
  },
  filtros: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    position: "absolute",
    top: verticalScale(65),
    left: 0,
    right: 0,
  },
  filtrosBotao: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  lista: {
    flex: 1,
    marginTop: 10,
    marginBottom: 40,
  },
  botaopress: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(530),
    position: "absolute",
  },
  tituloBotao: {
    fontSize: verticalScale(14),
    fontWeight: "bold",
    color: "#fff",
  },
  listaDet: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.95)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: verticalScale(5),
  },
  scroll: {
    height: verticalScale(300),
  },
});
export default RegistrosLeite;
