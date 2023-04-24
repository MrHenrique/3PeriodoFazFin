import { View, TouchableOpacity, Text, Alert } from "react-native";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { Color } from "./styles";
//DB
import getAllGastos from "../../Realm/getAllGastos";
import getAllGastosReb from "../../Realm/getAllGastosReb";
import getAllLeite from "../../Realm/getAllLeite";
import getAllLeiteReb from "../../Realm/getAllLeiteReb";
import { ReceitasTotais } from "../../components/Calculos DB/ReceitasTotais";
import { DespesasTotais } from "../../components/Calculos DB/DespesasTotais";
//--
import { AuthContext } from "../../contexts/auth";

function PreviewFinanceiro({ Titulo, Id }) {
  const navigation = useNavigation();
  const [dataGasto, setDataGastos] = useState([]);
  const [dataReceitas, setDataReceitas] = useState([]);
  async function fetchDataReceitas(fazID) {
    // console.log(Id);
    var dataRec;
    switch (Id) {
      case 1:
        dataRec = await getAllLeite(fazID);
        setDataReceitas(dataRec);
        ListaLeite(dataRec);
        const precoLeite = ReceitasTotais(dataRec);
        PrecoLeite(precoLeite);
        break;
      case 2:
        dataRec = await getAllLeiteReb(rebID);
        setDataReceitas(dataRec);
        ListaLeiteReb(dataRec);
        const precoLeiteReb = ReceitasTotais(dataRec);
        PrecoLeiteReb(precoLeiteReb);
        break;
      default:
        Alert.alert("erro na busca de dados, consultar desenvolvedor");
        break;
    }
  }
  async function fetchDataDespesas(fazID) {
    var dataGas;
    switch (Id) {
      case 1:
        // console.log("fazenda");
        dataGas = await getAllGastos(fazID);
        setDataGastos(dataGas);
        ListaAli(dataGas);
        const precoCF = DespesasTotais(dataGas);
        PrecoCF(precoCF);
        break;
      case 2:
        // console.log("rebanho");
        dataGas = await getAllGastosReb(rebID);
        setDataGastos(dataGas);
        ListaAliReb(dataGas);
        const precoCFReb = DespesasTotais(dataGas);
        PrecoCFReb(precoCFReb);
        break;
      default:
        Alert.alert("erro na busca de dados, consultar desenvolvedor");
        break;
    }
  }
  //atualizar dados
  useFocusEffect(
    useCallback(() => {
      fetchDataReceitas(fazID);
      fetchDataDespesas(fazID);
    }, [])
  );

  const {
    precoCF,
    PrecoCF,
    ListaAli,
    fazID,
    rebID,
    ListaLeite,
    precoLeite,
    PrecoLeite,
    ListaAliReb,
    PrecoCFReb,
    precoCFReb,
    ListaLeiteReb,
    PrecoLeiteReb,
    precoLeiteReb,
  } = useContext(AuthContext);

  //Funcoes para validar e renderizar
  function getDespesas() {
    switch (Id) {
      case 1:
        if (typeof precoCF !== "undefined") {
          return Number(precoCF);
        } else {
          return 0;
        }
        break;
      case 2:
        if (typeof precoCFReb !== "undefined") {
          // console.log(precoCFReb);
          return Number(precoCFReb);
        } else {
          return 0;
        }
        break;
    }
  }
  function getReceitas() {
    switch (Id) {
      case 1:
        if (typeof precoLeite !== "undefined") {
          return Number(precoLeite);
        } else {
          return 0;
        }
        break;
      case 2:
        if (typeof precoLeiteReb !== "undefined") {
          return Number(precoLeiteReb);
        } else {
          return 0;
        }
        break;
    }
  }
  function getTotal(despesas, receitas) {
    if (despesas !== "0" || receitas !== "0") {
      return Number(receitas - despesas);
    } else {
      return 0;
    }
  }
  // variaveis para rendering
  const total = getTotal(getDespesas(), getReceitas());
  const despesas = getDespesas();
  const receitas = getReceitas();
  function setSize(text, width) {
    var fontSize = width / text.toString().length;
    var maxSize = width / 10;
    fontSize = Math.min(fontSize, maxSize);
    return fontSize;
  }
  return (
    <View style={styles.geralfaz}>
      <TouchableOpacity
        style={styles.bannerButton}
        onPress={() => {
          switch (Id) {
            case 1:
              navigation.navigate("FinanceiroFaz");
              break;
            case 2:
              navigation.navigate("FinanceiroReb");
              break;
          }
        }}
      >
        <Text style={styles.textoBannerTitulo}>{Titulo}</Text>
        <View style={styles.containerGeralFinan}>
          <Text style={styles.textoBannerRes}>{"Saldo Total: "}</Text>

          <View
            style={[
              styles.containerSaldoTotal,
              { borderBottomColor: Color(total) },
            ]}
          >
            <Text style={styles.textoRS}>R$ </Text>
            <Text
              style={[
                styles.textResultsPrice,
                { fontSize: setSize(total.toFixed(2), 250) },
              ]}
            >
              {total.toFixed(2)}
            </Text>
          </View>
          <View style={styles.textoBannerCat}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.bolareceita}></View>
              <Text style={styles.textoBanner}>{"Receitas"}</Text>
            </View>
            <Text
              style={[
                styles.textoBannerRec,
                { fontSize: setSize(receitas.toFixed(2), 200) },
              ]}
            >
              {receitas.toFixed(2)}
            </Text>
          </View>
          <View style={styles.textoBannerCat}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.boladespesa}></View>
              <Text style={styles.textoBanner}>{"Despesas "}</Text>
            </View>
            <Text
              style={[
                styles.textoBannerDes,
                { fontSize: setSize(despesas.toFixed(2), 200) },
              ]}
            >
              {despesas.toFixed(2)}
            </Text>
          </View>
          <Text style={styles.bannerText}>
            {"Clique aqui para mais detalhes"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default PreviewFinanceiro;
