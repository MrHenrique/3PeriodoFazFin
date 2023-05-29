import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/auth";
import {
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import uuid from "react-native-uuid";
import { TextInput, HelperText, MD3Colors } from "react-native-paper";
import { Colors } from "../../../styles";
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
  const [keyboardStatus, setkeyboardStatus] = useState(false);

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
  // LISTENER DO TECLADO(ATIVADO OU NAO)
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setkeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setkeyboardStatus(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  // RETORNA O ESTILO PARA O BOTAO, decidindo qual estilo, dependendo se o teclado esta ativo ou nao
  function StyleFuncKeyboard() {
    if (keyboardStatus) {
      return styles.containerButaoKeyboardOn;
    } else {
      return styles.containerbotoes;
    }
  }
  //estilo ScrollView
  function StyleScrollViewContainer() {
    if (keyboardStatus) {
      return [{ paddingBottom: 15 }];
    } else {
      return [{ flex: 1 }];
    }
  }
  return (
    <KeyboardAvoidingView behavior="undefined" style={styles.containerkeyboard}>
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <ScrollView
            contentContainerStyle={StyleScrollViewContainer()}
            style={{ flex: 1 }}
          >
            <Image
              style={keyboardStatus ? { display: "none" } : styles.logo}
              source={require("../../../../assets/FazFin.png")}
            />
            <View style={styles.viewtext}>
              <TextInput
                mode="flat"
                label="Nome do rebanho"
                style={styles.campoTexto}
                placeholderTextColor={Colors.grey}
                textColor={Colors.black}
                activeUnderlineColor={Colors.green}
                underlineColor={Colors.blue}
                underlineStyle={{ paddingBottom: 3 }}
                onChangeText={handleNomeRebChange}
                value={nomeReb}
                placeholder="Ex: Vacas solteiras"
                error={!isNomeRebValid || rebExist}
              />
              <HelperText
                type="error"
                style={{
                  color: MD3Colors.error60,
                  fontSize: 14,
                  lineHeight: 15,
                }}
                visible={!isNomeRebValid || rebExist}
                padding="20"
              >
                {!isNomeRebValid
                  ? "Erro: Nome da fazenda inválido!!"
                  : "Erro: Nome da fazenda duplicado!!"}
              </HelperText>
              <TextInput
                label="Quantidade Animais"
                style={styles.campoTexto}
                placeholderTextColor={Colors.grey}
                textColor={Colors.black}
                activeUnderlineColor={Colors.green}
                underlineColor={Colors.blue}
                underlineStyle={{ paddingBottom: 3 }}
                onChangeText={handleQtdAniChange}
                value={qtdAni}
                keyboardType="number-pad"
                placeholder="Quantos animais no rebanho?"
                error={!isQtdAniValid}
              />
              <HelperText
                type="error"
                style={{
                  color: MD3Colors.error60,
                  fontSize: 14,
                  lineHeight: 15,
                }}
                visible={!isQtdAniValid}
                padding="20"
              >
                Erro: Quantidade de animais inválido!!
              </HelperText>
            </View>
          </ScrollView>
          <View style={StyleFuncKeyboard()}>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => navigation.navigate("SelectRebPage")}
            >
              <Text style={styles.tituloBotao}>{"Voltar"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => {
                validCheck();
              }}
            >
              <Text style={styles.tituloBotao}>{"Cadastrar"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
export default CadastroReb;
