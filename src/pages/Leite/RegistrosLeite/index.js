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
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import FiltrosData from "../../../components/Filtros/FiltrosData";
import { scale, verticalScale } from "react-native-size-matters";
import { AuthContext } from "../../../contexts/auth";
import { useMainContext } from "../../../contexts/RealmContext";
function RegistrosLeite() {
  const realm = useMainContext();
  const navigation = useNavigation();
  const { rebID, ListaFiltrada, listaFiltrada } = useContext(AuthContext);
  const [listaLeite, setListaLeite] = useState([]);
  const [shouldShow, setShouldShow] = useState(false);
  useEffect(() => {
    if (realm) {
      let dataReceitas = realm.objectForPrimaryKey("RebanhoSchema", rebID);

      dataReceitas.vacas.addListener((object) => {
        let NewReceitas = [];
        object.forEach((vaca) => {
          NewReceitas.push(...vaca.receitas);
        });
        if (NewReceitas.length > 0) {
          NewReceitas = NewReceitas.sort((a, b) => a.createdAt - b.createdAt);
        }
        setListaLeite(NewReceitas);
        ListaFiltrada(NewReceitas);
      });

      let receitas = [];
      dataReceitas.vacas.forEach((vaca) => {
        receitas.push(...vaca.receitas);
      });
      if (receitas.length > 0) {
        receitas = receitas.sort((a, b) => a.createdAt - b.createdAt);
      }
      setListaLeite(receitas);
      ListaFiltrada(receitas);
    }
  }, [realm]);

  const handleEditPress = () => {
    console.log("Editar pressionado");
  };

  const handleDeletePress = () => {
    console.log("Excluir pressionado");
  };

  const renderItem = ({ item }) => {
    
    const result = item.prodL.toFixed(2);
    const formattedResult = `${result.replace(".", ",")}L`;
    return (
      <TouchableOpacity style={styles.listaDet}>
        <View style={styles.itemContainer}>
          <View style={[styles.indicador, { backgroundColor: "yellow" }]} />
          <Text style={styles.itemText}>
            {item.createdAt.getDate().toString().padStart(2, 0)}/
            {(item.createdAt.getMonth() + 1).toString().padStart(2, 0)}/
            {item.createdAt.getFullYear().toString()} - {formattedResult}
          </Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
            <AntDesign name="edit" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeletePress}
          >
            <AntDesign name="delete" size={24} color="black" />
          </TouchableOpacity>
        </View>
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
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  editButton: {
    //padding: 10,
    //backgroundColor: "red",
  },
  deleteButton: {
    //padding: 10,
    //backgroundColor: "blue",
  },
  itemText: {
    //backgroundColor: "gray",
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    fontSize: verticalScale(14),
    fontWeight: "bold",
    color: "#fff",
  },
  indicador: {
    padding: 8,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    width: 10,
    height: 40,
  },
});
export default RegistrosLeite;
