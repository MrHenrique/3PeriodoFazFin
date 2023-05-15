import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/auth";
import {
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
  ImageBackground,
  TextInput,
} from "react-native";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import { useMainContext } from "../../../contexts/RealmContext";
import { Alert } from "react-native";
import styles from "./styles";
function CadastroReb() {
  const realm = useMainContext();
  const [nomeReb, setNomeReb] = useState("");
  const [QtdAni, setQtdAni] = useState(0);
  const [listaReb, setListaReb] = useState([]);
  const { fazID, RebanhoID } = useContext(AuthContext);

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
  useEffect(() => {
    if (realm) {
      let data = realm.objectForPrimaryKey("Farm", fazID);
      setListaReb(
        data.rebanhos.filter((rebanho) => rebanho.nomeReb === nomeReb)
      );
    }
  }, [realm, nomeReb]);
  //Escrever no Banco
  async function handleAddReb() {
    if (realm && listaReb.length === 0) {
      try {
        realm.write(() => {
          let newRebId = uuid.v4();
          let farm = realm.objectForPrimaryKey("Farm", fazID);
          let createdReb = realm.create("RebanhoSchema", {
            _id: newRebId,
            nomeReb,
            createdAt: new Date(),
            vacas: genVacas(QtdAni),
          });
          farm.rebanhos.push(createdReb);
          Alert.alert("Dados cadastrados com sucesso!");
          RebanhoID(newRebId);
          navigation.navigate("Home");
        });
      } catch (e) {
        Alert.alert("Não foi possível cadastrar!", e.message);
      } finally {
        setNomeReb("");
        setQtdAni(0);
      }
    } else {
      Alert.alert("Esse rebanho já existe, troque o nome e tente novamente.");
    }
  }
  const navigation = useNavigation();
  const imgbg1 = "../../../../assets/bg6.jpg";
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
            source={require("../../../../assets/FazFin.png")}
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
              onPress={() => navigation.navigate("SelectRebPage")}
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
