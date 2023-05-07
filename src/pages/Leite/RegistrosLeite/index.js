import * as React from "react";
import { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FiltrosData from "../../../components/Filtros/FiltrosData";
import { scale, verticalScale } from "react-native-size-matters";
import { AuthContext } from "../../../contexts/auth";
function RegistrosLeite() {
  const navigation = useNavigation();
  const { listaLeiteReb, precoLeiteReb } = useContext(AuthContext);
  const { listaFiltrada } = useContext(AuthContext);

  console.log(listaFiltrada);
  
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
      <View style={styles.filtros}>
        {/*filtros*/}
        <FiltrosData/>
      </View>
      <View style={styles.lista}>
        <FlatList
          style={styles.scroll}
          data={listaFiltrada}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </View>
      <TouchableOpacity
        style={styles.botaopress}
        onPress={() => navigation.navigate("GeralReb")}
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
    position: "absolute",
    alignSelf: "center",
    margin: 10,
  },
  lista: {
    marginTop: 10,
    top: verticalScale(150),
  },
  modalContainer: {
    backgroundColor: "rgba(234,242,215,1)",
    position: "absolute",
    top: verticalScale(30),
    alignSelf: "center",
    width: scale(330),
    borderRadius: 20,
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
