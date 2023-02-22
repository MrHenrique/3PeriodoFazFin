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
  const imgbg1 = "../../../assets/bg4.jpg";
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgbg}
        source={require(imgbg1)}
        imageStyle={{ opacity: 0.6 }}
      >
        <TouchableOpacity
          style={styles.bannerButton}
          onPress={() => navigation.navigate("FinanceiroFaz")}
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
            <Text style={styles.textoBanner}>{"Resultado: "}</Text>
            <Text style={Color(total)}>R${total.toFixed(2)}</Text>
          </Text>
          <Text style={styles.bannerText}>
            {"Clique aqui para mais detalhes"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoPress3}
          onPress={() => navigation.navigate("CadastroReb")}
        >
          <Text style={styles.tituloBotao2}>{"Cadastrar rebanhos"}</Text>
        </TouchableOpacity>
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
        <TouchableOpacity
          disabled={CanContinue(rebID)}
          style={DisabledStyle(rebID)}
          onPress={() => navigation.navigate("GeralReb")}
        >
          <Text style={styles.tituloBotao}>{"Continuar"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaopress2}
          onPress={() => navigation.navigate("Home")}
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
    height: verticalScale(75),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(250),
    position: "absolute",
  },
  tituloBotao2: {
    fontSize: scale(16),
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
    top: verticalScale(575),
    position: "absolute",
  },
  botaopress4: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.4)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(575),
    position: "absolute",
  },
  botaopress2: {
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
    top: verticalScale(350),
  },
  texto: {
    fontSize: verticalScale(20),
    color: "#ffffff",
    alignSelf: "center",
  },
});
export default GeralFaz;
