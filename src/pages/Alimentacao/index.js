import React, { useState, useContext, useCallback } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import Header from "../../components/Header";
import { scale, verticalScale } from "react-native-size-matters";
import uuid from "react-native-uuid";
import { useFocusEffect } from "@react-navigation/native";
import writeGastos from "../../Realm/writeGastos";
import { AuthContext } from "../../contexts/auth";
import getAllVacas from "../../Realm/getAllVacas";
import getAllGastosReb from "../../Realm/getAllGastosReb";
import writeGastoVaca from "../../Realm/writeGastoVaca";
function Alimentacao({ navigation }) {
  const [tipoAlim, setTipoAlim] = useState("");
  const [qtdAliS, setQtdAliS] = useState("");
  const [valorAliS, setValorAliS] = useState("");
  const [consumoAliS, setConsumoAliS] = useState("");
  const [dataV, setDataV] = useState([]);
  const { rebID } = useContext(AuthContext);
  const totalVaca = (
    (Number(valorAliS) / Number(qtdAliS)) *
    Number(consumoAliS)
  ).toFixed(2);
  async function fetchVacas(totalVaca) {
    const dataVacas = await getAllVacas(rebID);
    let gastos = [];
    const gastosVaca = Number(totalVaca / dataVacas.length);
    for (var i in dataVacas) {
      gastos.push(dataVacas[i].gastosV);
    }
    const gastos2 = gastos.map((gastos) => gastos + gastosVaca);
    await writeGastoVaca(rebID, gastos2);
  }
  async function handleAddGastos() {
    const qtdAli = Number(qtdAliS);
    const valorAli = Number(valorAliS);
    const consumoAli = Number(consumoAliS);
    await writeGastos(
      {
        _id: uuid.v4(),
        createdAt: new Date(),
        tipoAlim,
        qtdAli,
        valorAli,
        consumoAli,
      },
      rebID
    );
    navigation.navigate("Contas");
    setTipoAlim("");
    setQtdAliS("");
    setValorAliS("");
    setConsumoAliS("");
  }
  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.containerinfos}>
        <Text style={styles.tituloBotao3}>Qual o trato?</Text>
        <TextInput
          style={styles.input}
          placeholder="Exemplo: Silagem de milho 22/11"
          onChangeText={setTipoAlim}
          value={tipoAlim}
        ></TextInput>
      </View>
      <View style={styles.containerinfos}>
        <Text style={styles.tituloBotao3}>{"Quantidade consumida(KG)?"}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setConsumoAliS}
          value={consumoAliS}
          placeholder="Exemplo: 0.5"
        ></TextInput>
      </View>
      <View style={styles.containerinfos}>
        <Text style={styles.tituloBotao3}>{"Qual o peso da saca(KG)?"}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setQtdAliS}
          value={qtdAliS}
          placeholder="Exemplo: 50"
        ></TextInput>
      </View>
      <View style={styles.containerinfos}>
        <Text style={styles.tituloBotao3}>{"Valor por saca(R$)?"}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setValorAliS}
          value={valorAliS}
          placeholder="Exemplo: 120"
        ></TextInput>
      </View>

      <TouchableOpacity style={styles.botaopress6} onPress={handleAddGastos}>
        <Text style={styles.tituloBotao}>{"Cadastrar"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.botaopress}
        onPress={() => navigation.navigate("PagelancaContas")}
      >
        <Text style={styles.tituloBotao}>{"Voltar"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    color: "black",
    width: scale(250),
    height: verticalScale(30),
    alignSelf: "center",
    borderRadius: verticalScale(5),
    textAlign: "center",
    marginBottom: verticalScale(3),
    fontSize: scale(20),
  },
  container: {
    flex: 1,
    backgroundColor: "#004513",
    paddingBottom: verticalScale(50),
  },
  imgbg: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
  },
  botaoPress2: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(100),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  botaoPress3: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(100),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(200),
    position: "absolute",
  },
  botaoPress4: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(100),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(330),
    position: "absolute",
  },
  botaoPress5: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(100),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(460),
    position: "absolute",
  },
  tituloBotao2: {
    fontSize: scale(25),
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
    marginBottom: verticalScale(30),
  },

  botaopress6: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    marginBottom: scale(10),
    marginVertical: verticalScale(10),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  tituloBotao: {
    fontSize: verticalScale(14),
    fontWeight: "bold",
    color: "#fff",
  },
  tituloBotao3: {
    color: "white",
    fontSize: verticalScale(20),
    marginBottom: verticalScale(10),
    textAlign: "center",
    fontWeight: "bold",
  },
  containerinfos: {
    marginVertical: verticalScale(10),
    padding: verticalScale(25),
    width: scale(320),
    backgroundColor: "rgba(15, 109, 0, 0.7)",
    borderRadius: 15,
    alignSelf: "center",
  },
});
export default Alimentacao;
