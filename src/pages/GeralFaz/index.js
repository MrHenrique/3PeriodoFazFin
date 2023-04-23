import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import getAllReb from "../../Realm/getAllReb";
import { scale, verticalScale } from "react-native-size-matters";
import Select from "../../components/Select";
import { AuthContext } from "../../contexts/auth";
import { DespesasTotais } from "../../components/Calculos DB/DespesasTotais";
import getAllGastos from "../../Realm/getAllGastos";
import getAllLeite from "../../Realm/getAllLeite";
import { ReceitasTotais } from "../../components/Calculos DB/ReceitasTotais";
import { Color } from "./styles";
import styles from "./styles";
import { JumpingTransition } from "react-native-reanimated";
function GeralFaz({ navigation }) {
  const [listaReb, setListaReb] = useState([]);
  const [dataGasto, setDataGastos] = useState([]);
  const [dataReceitas, setDataReceitas] = useState([]);

  async function fetchDataReb(fazID) {
    const data = await getAllReb(fazID);
    setListaReb(data);
    data.addListener((values) => {
      setListaReb([...values]);
    });
  }
  async function fetchDataRec(fazID) {
    const dataRec = await getAllLeite(fazID);
    setDataReceitas(dataRec);
    ListaLeite(dataRec);
    const precoLeite = ReceitasTotais(dataRec);
    PrecoLeite(precoLeite);
  }
  async function fetchDataDes(rebID, fazID) {
    const dataGas = await getAllGastos(fazID);
    setDataGastos(dataGas);
    ListaAli(dataGas);
    const precoCF = DespesasTotais(dataGas);
    PrecoCF(precoCF);
  }
  useFocusEffect(
    useCallback(() => {
      fetchDataDes(rebID, fazID);
      fetchDataReb(fazID);
      fetchDataRec(fazID);
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
  } = useContext(AuthContext);

  function getDespesas() {
    if (typeof precoCF !== "undefined") {
      return Number(precoCF);
    } else {
      return 0;
    }
  }
  function getReceitas() {
    if (typeof precoLeite !== "undefined") {
      return Number(precoLeite);
    } else {
      return 0;
    }
  }
  function getTotal(despesas, receitas) {
    if (despesas !== "0" || receitas !== "0") {
      return Number(receitas - despesas);
    } else {
      return 0;
    }
  }
  const total = getTotal(getDespesas(), getReceitas());
  const despesas = getDespesas();
  const receitas = getReceitas();
  function CanContinue(rebID) {
    if (typeof rebID == "undefined" || rebID == "") {
      const CanContinue = true;
      return CanContinue;
    } else {
      const CanContinue = false;
      return CanContinue;
    }
  }
  function DisabledStyle(rebID) {
    if (typeof rebID == "undefined" || rebID == "") {
      const Style = styles.botaopress4;
      return Style;
    } else {
      const Style = styles.botaopress;
      return Style;
    }
  }
  function setSize(text, width) {
    var fontSize = width / text.toString().length;
    var maxSize = width / 10;
    fontSize = Math.min(fontSize, maxSize);
    return fontSize;
  }
  const imgbg1 = "../../../assets/bg4.jpg";
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgbg}
        source={require(imgbg1)}
        imageStyle={{ opacity: 0.6 }}
      >
        <View style={styles.containergeral}>
          <View style={styles.geralfaz}>
            <TouchableOpacity
              style={styles.bannerButton}
              onPress={() => navigation.navigate("FinanceiroFaz")}
            >
              <Text style={styles.textoBannerTitulo}>
                Visão Geral da Fazenda
              </Text>
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
          <View style={styles.containercadastrarreb}>
            <TouchableOpacity
              style={styles.botaoPress3}
              onPress={() => navigation.navigate("CadastroReb")}
            >
              <Text style={styles.tituloBotao2}>{"Cadastrar rebanhos"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.viewtext}>
            <Text style={styles.texto}>Selecionar rebanho</Text>
            <Select
              touchableText="Selecione seu rebanho"
              title="Rebanhos"
              objKey="_id"
              objValue="nomeReb"
              data={listaReb}
            />
          </View>
          <View style={styles.containerbotoes}>
            <TouchableOpacity
              style={styles.botaopress2}
              onPress={() => navigation.navigate("SelectFazPage")}
            >
              <Text style={styles.tituloBotao}>{"Voltar"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={CanContinue(rebID)}
              style={DisabledStyle(rebID)}
              onPress={() => navigation.navigate("GeralReb")}
            >
              <Text style={styles.tituloBotao}>{"Continuar"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
export default GeralFaz;
