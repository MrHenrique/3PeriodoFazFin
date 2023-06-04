import React, { useState, useContext, useEffect } from "react";
import {
  Dimensions,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
} from "react-native";
import { AuthContext } from "../../../../contexts/auth";
import { useMainContext } from "../../../../contexts/RealmContext";
import Graficodetalhesvacas from "../../../../components/Graficos/Graficodetalhesvacas";
import styles from "./styles";

function FinanceiroVaca({ route, navigation }) {
  const { idVaca } = useContext(AuthContext);
  const realm = useMainContext();
  const [lista, setLista] = useState({});
  //buscar banco
  useEffect(() => {
    if (realm) {
      let dataVaca = realm.objectForPrimaryKey("VacasSchema", idVaca);
      setLista(dataVaca);
    }
  }, [realm]);
  function verificagenero() {
    if (Details.genero === 1) {
      setgenero(1);
      setmacho("check-square");
      setfemea("square");
    } else {
      () => setgenero(0);
      setmacho("square");
      setfemea("check-square");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containergeral}>
        <View style={styles.contentContainer}>
          <View style={styles.containerCard}>
            <View style={styles.ContainerInfoCard}>
              <Text style={styles.fontTitulo}>Nome da Vaca:</Text>
              <Text style={styles.font}>{lista.nomeVaca}</Text>
            </View>
            <View style={styles.ContainerInfoCard}>
              <Text style={styles.fontTitulo}>Total:</Text>
              <Text style={styles.font}>{"100milhoes de cruzeiros"}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.ContainerInfoCard}>
                <Text style={styles.fontTitulo}>Receita:</Text>
                <Text style={styles.font}>{"imensuravel"}</Text>
              </View>
              <View style={styles.ContainerInfoCard}>
                <Text style={styles.fontTitulo}>Despesas:</Text>
                <Text style={styles.font}>{"alguns tustoes"}</Text>
              </View>
            </View>
          </View>
          <View style={styles.ContainerInfoCardOBS}>
            <Graficodetalhesvacas />
          </View>
        </View>
        <View style={styles.containervoltar}>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate("PageAnimais")}
          >
            <Text style={styles.voltarfont}>{"Voltar"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default FinanceiroVaca;
