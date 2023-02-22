import React, { useState, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import Header from "../../components/Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import getAllLeiteReb from "../../Realm/getAllLeiteReb";
import getAllGastosReb from "../../Realm/getAllGastosReb";
import { ReceitasTotais } from "../../components/Calculos DB/ReceitasTotais";
import { DespesasTotais } from "../../components/Calculos DB/DespesasTotais";
import { AuthContext } from "../../contexts/auth";
function GeralReb({ navigation }) {
  const [dataGasto, setDataGastos] = useState([]);
  const [dataReceitas, setDataReceitas] = useState([]);

  async function fetchDataRec(rebID) {
    const dataRec = await getAllLeiteReb(rebID);
    setDataReceitas(dataRec);
    ListaLeiteReb(dataRec);
    const precoLeiteReb = ReceitasTotais(dataRec);
    PrecoLeiteReb(precoLeiteReb);
  }
  async function fetchDataDes(rebID) {
    const dataGas = await getAllGastosReb(rebID);
    setDataGastos(dataGas);
    ListaAliReb(dataGas);
    const precoCFReb = DespesasTotais(dataGas);
    PrecoCFReb(precoCFReb);
  }
  useFocusEffect(
    useCallback(() => {
      fetchDataDes(rebID);
      fetchDataRec(rebID);
    }, [])
  );
  const {
    precoCFReb,
    PrecoCFReb,
    rebID,
    ListaLeiteReb,
    precoLeiteReb,
    PrecoLeiteReb,
    ListaAliReb,
  } = useContext(AuthContext);

  function getDespesas() {
    if (typeof precoCFReb !== "undefined") {
      return Number(precoCFReb);
    } else {
      return 0;
    }
  }
  function getReceitas() {
    if (typeof precoLeiteReb !== "undefined") {
      return Number(precoLeiteReb);
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

  function Color(total) {
    let color;
    if (total > 0) {
      color = styles.textoBannerRec;
      return color;
    } else {
      color = styles.textoBannerDes;
      return color;
    }
  }
  const imgbg1 = "../../../assets/bg3.jpg";
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgbg}
        source={require(imgbg1)}
        imageStyle={{ opacity: 0.6 }}
      >
        <Header />
        <TouchableOpacity
          style={styles.bannerButton}
          onPress={() => navigation.navigate("FinanceiroReb")}
        >
          <Text style={styles.textoBannerT}>
            <Text style={styles.textoBanner}>{"Receitas: "}</Text>
            <Text style={styles.textoBannerRec}>R${receitas.toFixed(2)}</Text>
          </Text>
          <Text style={styles.textoBannerT}>
            <Text style={styles.textoBanner}>{"Despesas: "}</Text>
            <Text style={styles.textoBannerDes}>R${despesas.toFixed(2)}</Text>
          </Text>
          <Text style={styles.textoBannerT}>
            <Text style={styles.textoBanner}>
              {"Resultado: "}
            </Text>
            <Text style={Color(total)}>R${total.toFixed(2)}</Text>
          </Text>
          <Text style={styles.bannerText}>
            {"Clique aqui para mais detalhes"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoPress3}
          onPress={() => navigation.navigate("PageListavacas")}
        >
          <Text style={styles.tituloBotao2}>
            <MaterialCommunityIcons
              name={"cow"}
              size={scale(30)}
              color={"white"}
            />
            {"Animais"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoPress4}
          onPress={() => navigation.navigate("PagelancaContas")}
        >
          <Text style={styles.tituloBotao2}>
            <MaterialCommunityIcons
              name={"calculator-variant"}
              size={scale(30)}
              color={"white"}
            />
            {"Despesas"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaopress}
          onPress={() => navigation.navigate("GeralFaz")}
        >
          <Text style={styles.tituloBotao}>{"Voltar"}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#006773",
  },
  imgbg: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
  },
  bannerButton: {
    borderRadius: 30,
    height: verticalScale(150),
    width: scale(300),
    alignSelf: "center",
    backgroundColor: "rgba(15,109,0,0.9)",
    justifyContent: "center",
    position: "absolute",
    top: verticalScale(75),
  },
  bannerText: {
    color: "#fff",
    fontSize: scale(12  ),
    margin: verticalScale(5),
    alignSelf: "center",
  },
  textoBannerT: {
    textAlign: 'center',
    fontSize: scale(15),
  },
  textoBanner: {
    color: "#fff",
    fontSize: scale(17),
  },
  textoBannerRec: {
    color: "#0FFF50",
    fontSize: scale(17),
  },
  textoBannerDes: {
    color: "#FF3131",
    fontSize: scale(17),
  },
  botaoPress3: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(150),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(250),
    position: "absolute",
  },
  botaoPress4: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(150),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(425),
    position: "absolute",
  },
  tituloBotao2: {
    fontSize: scale(30),
    fontWeight: "bold",
    color: "#fff",
  },
  botaopress: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(625),
    position: "absolute",
  },
  tituloBotao: {
    fontSize: verticalScale(14),
    fontWeight: "bold",
    color: "#fff",
  },
  viewtext: {
    alignSelf: "center",
    position: "absolute",
    top: verticalScale(400),
  },
  texto: {
    fontSize: verticalScale(20),
    color: "#ffffff",
    alignSelf: "center",
  },
});
export default GeralReb;
