import * as React from "react";
import { useState, useContext, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import FiltrosData from "../../../components/Filtros/FiltrosData";
import { scale, verticalScale } from "react-native-size-matters";
import { AuthContext } from "../../../contexts/auth";
import getAllLeiteReb from "../../../Realm/getAllLeiteReb";
function RegistrosLeite() {
  const navigation = useNavigation();
  const [listaLeite, setListaLeite] = useState([]);
  const { rebID } = useContext(AuthContext);
  const { listaFiltrada, ListaFiltrada } = useContext(AuthContext);
  const [shouldShow, setShouldShow] = useState(false);

  //Busca as produçoes de leite no banco de dados.
  async function fetchDataLeite(rebID) {
    const dataLeite = await getAllLeiteReb(rebID);
    setListaLeite(dataLeite);
    ListaFiltrada(dataLeite); //usado para passar a lista buscada para a ListaFiltrada para mostrar a lista toda de inicio.
  }
  // Quando a pagina está em foco roda a função de buscar os dados no BD.
  useFocusEffect(
    useCallback(() => {
      fetchDataLeite(rebID);
    }, [])
  );

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
      <View style={[styles.filtros, { display: shouldShow ? "flex" : "none" }]}>
        {/*filtros*/}
        <FiltrosData listaRecebida={listaLeite} />
      </View>
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
});
export default RegistrosLeite;
