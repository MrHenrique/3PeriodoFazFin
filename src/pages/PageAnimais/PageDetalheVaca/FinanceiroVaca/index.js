import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../../../../contexts/auth";
import { useMainContext } from "../../../../contexts/RealmContext";
import Graficodetalhesvacas from "../../../../components/Graficos/Graficodetalhesvacas";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { scale } from "react-native-size-matters";

function FinanceiroVaca({ route, navigation }) {
  const { idVaca } = useContext(AuthContext);
  const realm = useMainContext();
  const [lista, setLista] = useState([]);
  //buscar banco
  useEffect(() => {
    if (realm) {
      let dataVaca = realm.objectForPrimaryKey("VacasSchema", idVaca);
      setLista(dataVaca);
    }
  }, [realm]);
  function getResultL() {
    var resultLeite = 0;
    if (typeof lista.receitas != "undefined" && lista.receitas.length > 0) {
      lista.receitas.forEach((receitas) => {
        resultLeite += receitas.prodL * receitas.precoL;
      });
    }
    return resultLeite;
  }
  function getResultD() {
    var resultDespesas = 0;
    if (typeof lista.despesas != "undefined" && lista.despesas.length > 0) {
      lista.despesas.forEach((receitas) => {
        resultDespesas += receitas.qtdProd * receitas.valorProd;
      });
    }
    return resultDespesas;
  }
  function getResultDespesasFormated() {
    const result = getResultD().toFixed(2);
    const formattedResult = `R$ ${result.replace(".", ",")}`;
    return formattedResult;
  }
  function getResultReceitasFormated() {
    const result = getResultL().toFixed(2);
    const formattedResult = `R$ ${result.replace(".", ",")}`;
    return formattedResult;
  }
  function getResultNumber() {
    const result = (getResultL() - getResultD()).toFixed(2);
    const formattedResult = `R$ ${result.replace(".", ",")}`;
    return formattedResult;
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
              <Text style={styles.font}>{getResultNumber()}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.ContainerInfoCard}>
                <Text style={styles.fontTitulo}>Receita:</Text>
                <Text style={styles.font}>{getResultReceitasFormated()}</Text>
              </View>
              <View style={styles.ContainerInfoCard}>
                <Text style={styles.fontTitulo}>Despesas:</Text>
                <Text style={styles.font}>{getResultDespesasFormated()}</Text>
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
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={styles.voltarfont}>{"Voltar"}</Text>
            </View>
            <MaterialIcons name="arrow-back" size={scale(24)} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default FinanceiroVaca;
