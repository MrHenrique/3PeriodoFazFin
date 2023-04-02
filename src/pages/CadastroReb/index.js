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
import styles from "./styles";

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
        <View style={styles.mainContainer}>
          <Image
            style={styles.logo}
            source={require("../../../assets/FazFin.png")}
          />
          <View style={styles.viewtext}>
            <Text style={styles.texto}>Nome do rebanho:</Text>
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
          <View style={styles.containerbotoes}>
            <TouchableOpacity
              style={styles.botaopress2}
              onPress={() => navigation.navigate("GeralFaz")}
            >
              <Text style={styles.tituloBotao}>{"Voltar"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaopress}
              onPress={() => {
                handleAddReb();
              }}
            >
              <Text style={styles.tituloBotao}>{"Cadastrar"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
export default CadastroReb;
