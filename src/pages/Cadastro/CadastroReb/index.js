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
  const [qtdAni, setQtdAni] = useState("");
  const [listaReb, setListaReb] = useState([]);
  const { fazID, RebanhoID } = useContext(AuthContext);
  const [isNomeRebValid, setIsNomeRebValid] = useState(true);
  const [rebExist, setRebExist] = useState(false);
  const [isQtdAniValid, setIsQtdAniValid] = useState(true);

  //Escrever no Banco

  function genVacas() {
    const proximasvacas = [];
    for (let i = 0; i <= qtdAni; i++) {
      if (qtdAni == i) {
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
    if (realm) {
      try {
        realm.write(() => {
          let newRebId = uuid.v4();
          let farm = realm.objectForPrimaryKey("Farm", fazID);
          let createdReb = realm.create("RebanhoSchema", {
            _id: newRebId,
            nomeReb,
            createdAt: new Date(),
            vacas: genVacas(qtdAni),
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
    }
  }
  useEffect(() => {
    const exists = listaReb.length > 0;
    setRebExist(exists);
  }, [listaReb.length]);

  function handleNomeRebChange(text) {
    const isValid = text.trim().length > 0;
    setIsNomeRebValid(isValid);
    setNomeReb(text);
  }
  function handleQtdAniChange(text) {
    const parsedValue = parseInt(text, 10);

    const isValid =
      text.trim().length > 0 &&
      Number.isInteger(parsedValue) &&
      parsedValue >= 0 &&
      parsedValue.toString() === text.trim();
    console.log(isValid);

    setIsQtdAniValid(isValid);
    setQtdAni(text);
  }
  function validCheck() {
    if (nomeReb.length === 0 || listaReb.length !== 0 || qtdAni.length === 0) {
      if (nomeReb.length === 0) {
        setIsNomeRebValid(false);
      }
      if (listaReb.length !== 0) {
        setRebExist(true);
      }

      if (qtdAni.length === 0) {
        setIsQtdAniValid(false);
      }
    } else if (isNomeRebValid && isQtdAniValid && !rebExist) {
      handleAddReb();
    } else if (!isNomeRebValid || !isQtdAniValid || rebExist) {
      Alert.alert("Preencha todos os campos e tente novamente.");
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
              style={
                !isNomeRebValid ? styles.campoTextoErro : styles.campoTexto
              }
              onChangeText={handleNomeRebChange}
              value={nomeReb}
              placeholder="Ex: Vacas solteiras"
            ></TextInput>
            {!isNomeRebValid && (
              <Text style={styles.error}>Digite o nome do rebanho!</Text>
            )}
            {rebExist && (
              <Text style={styles.error}>
                Um rebanho com esse nome já existe!
              </Text>
            )}
            <Text style={styles.texto}>Quantidade de animais:</Text>
            <TextInput
              style={!isQtdAniValid ? styles.campoTextoErro : styles.campoTexto}
              onChangeText={handleQtdAniChange}
              value={qtdAni}
              keyboardType="number-pad"
              placeholder="Quantos animais no rebanho?"
            ></TextInput>
            {!isQtdAniValid && (
              <Text style={styles.error}>
                Valor digitado inválido, tente novamente.
              </Text>
            )}
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
                validCheck();
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
