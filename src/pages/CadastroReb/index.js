import React, { useState, useContext } from "react";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";
import {
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import uuid from "react-native-uuid";
import writeReb from "../../Realm/writeReb";
import { scale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

function CadastroReb({}) {
  const [nomeReb, setNomeReb] = useState("");
  const [QtdAni, setQtdAni] = useState(0);
  const { fazID } = useContext(AuthContext);

  //Escrever no Banco

  function genVacas() {
    const proximasvacas = [];
    for (let i = 0; i <= QtdAni; i++) {
      if (QtdAni == i) {
      } else {
        proximasvacas.push({
          _id: uuid.v4(),
          nomeVaca: "vaca" + i,
          nascimentoVaca: "2022",
          brincoVaca: " 00 " + i,
          genero: 1,
          receitas: [],
          descVaca: "Descricao vazia",
          createdAt: new Date(),
        });
      }
    }
    return proximasvacas;
  }

  async function handleAddReb() {
    await writeReb(
      {
        _id: uuid.v4(),
        nomeReb,
        createdAt: new Date(),
        vacas: genVacas(QtdAni),
      },
      fazID
    );
    navigation.navigate("GeralFaz");
  }

  const navigation = useNavigation();
  const imgbg1 = "../../../assets/bg6.jpg";
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgbg}
        source={require(imgbg1)}
        imageStyle={{ opacity: 0.6 }}
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/FazFin.png")}
        />
        <View style={styles.viewtext}>
          <Text style={styles.texto}>Nome do rebanho:asdsad</Text>
          <TextInput
            style={styles.campoTexto}
            onChangeText={setNomeReb}
            value={nomeReb}
            placeholder="Ex: Vacas solteiras"
          ></TextInput>
          <Text style={styles.texto}>Quantidade de animais:</Text>
          <TextInput
            style={styles.campoTexto}
            onChangeText={setQtdAni}
            value={QtdAni}
            keyboardType="number-pad"
            placeholder="Quantos animais no rebanho?"
          ></TextInput>
        </View>
        <TouchableOpacity
          style={styles.botaopress}
          onPress={() => {
            handleAddReb();
          }}
        >
          <Text style={styles.tituloBotao}>{"Cadastrar"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaopress2}
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
  logo: {
    resizeMode: "contain",
    height: verticalScale(90),
    width: verticalScale(90),
    position: "absolute",
    top: verticalScale(75),
    alignSelf: "center",
  },
  texto: {
    fontSize: verticalScale(18),
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  viewtext: {
    alignSelf: "center",
    position: "absolute",
    top: verticalScale(250),
  },
  campoTexto: {
    backgroundColor: "#ffffff",
    color: "#000000",
    textAlign: "center",
    borderRadius: 20,
    width: scale(300),
    height: verticalScale(40),
    marginVertical: verticalScale(10),
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
});
export default CadastroReb;
