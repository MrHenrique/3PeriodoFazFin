import React, { useState } from "react";
import {verticalScale,scale} from "react-native-size-matters";
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
import { useNavigation } from "@react-navigation/native";
function CadastroFaz() {
  const [nomefaz, setNomefaz] = useState("");
  const [proprietario, setProprietario] = useState("");
  const [tipoprod, setTipoprod] = useState("");
  function cadFaz() {
    const data = {
      nomefaz,
      proprietario,
      tipoprod,
    };
    console.log(data);
  }
  const CadSucess = () => {
    Alert.alert("Cadastro com sucesso!");
  };
  const navigation = useNavigation();
  const imgbg1 = "../../../assets/backgroundCad.jpg";
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
          <Text style={styles.texto}>Nome da fazenda</Text>
          <TextInput
            style={styles.campoTexto}
            onChangeText={setNomefaz}
            value={nomefaz}
            placeholder="Qual o nome da sua Fazenda?"
          ></TextInput>
          <Text style={styles.texto}>Proprietário</Text>
          <TextInput
            style={styles.campoTexto}
            onChangeText={setProprietario}
            value={proprietario}
            placeholder="Qual o nome do proprietário?"
          ></TextInput>
          <Text style={styles.texto}>Tipo de produção</Text>
          <TextInput
            style={styles.campoTexto}
            onChangeText={setTipoprod}
            value={tipoprod}
            placeholder="Ex: Pecuaria Leiteira"
          ></TextInput>
        </View>
        <TouchableOpacity style={styles.botaopress} onPress={CadSucess}>
          <Text style={styles.tituloBotao}>{"Cadastrar"}</Text>
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
    objectFit: "cover",
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
    top: verticalScale(225),
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

export default CadastroFaz;
