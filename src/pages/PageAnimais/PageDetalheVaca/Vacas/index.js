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

function Vacas({ route, navigation }) {
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
  function setCor(genero) {
    if (genero === 1) {
      return [
        styles.ContainerInfoCard,
        { elevation: 10, shadowColor: "#e500fa" },
      ];
    } else
      return [
        styles.ContainerInfoCard,
        { elevation: 10, shadowColor: "#0f53ff" },
      ];
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
              <Text style={styles.fontTitulo}>Identificação da vaca:</Text>
              <Text style={styles.font}>{lista.brincoVaca}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.ContainerInfoCard}>
                <Text style={styles.fontTitulo}>Nascimento:</Text>
                <Text style={styles.font}>{lista.nascimentoVaca}</Text>
              </View>
              <View style={setCor(lista.genero)}>
                <Text style={styles.fontTitulo}>Gênero:</Text>
                <Text style={styles.font}>
                  {lista.genero === 1 ? "Fêmea" : "Macho"}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.ContainerInfoCardOBS}>
            <Text style={styles.fontTitulo}>Observações:</Text>
            <Text style={styles.font}>{lista.descVaca}</Text>
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

export default Vacas;
