import React, { useState } from "react";
import { verticalScale, scale } from "react-native-size-matters";
import {
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
  ImageBackground,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import uuid from "react-native-uuid";
import writeFarm from "../../Realm/writeFarm";
import styles from "./styles";
function CadastroFaz() {
  const [nomefaz, setNomefaz] = useState("");
  const [proprietario, setProprietario] = useState("");
  const [tipoprod, setTipoprod] = useState("");
  //Escrever no Banco
  async function handleAddFarm() {
    await writeFarm({
      _id: uuid.v4(),
      nomefaz,
      proprietario,
      tipoprod,
      createdAt: new Date(),
    });
    navigation.navigate("Home")
  }
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
            placeholder="Ex: Pecuária Leiteira"
          ></TextInput>
        </View>
        <TouchableOpacity style={styles.botaopress} onPress={handleAddFarm}>
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


export default CadastroFaz;
