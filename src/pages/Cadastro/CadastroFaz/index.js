import React, { useState, useContext, useEffect } from "react";
import { verticalScale } from "react-native-size-matters";
import {
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, HelperText, MD3Colors } from "react-native-paper";
import { Colors } from "../../../styles";
import uuid from "react-native-uuid";
import styles from "./styles";
import { AuthContext } from "../../../contexts/auth";
import { useMainContext } from "../../../contexts/RealmContext";
import { Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { scale } from "react-native-size-matters";

function CadastroFaz({ navigation }) {
  const realm = useMainContext();
  const { FazendaID, FazendaProp, RebanhoID } = useContext(AuthContext);
  const [nomefaz, setNomefaz] = useState("");
  const [proprietario, setProprietario] = useState("");
  const [tipoprod, setTipoprod] = useState("");
  const [listaFaz, setListaFaz] = useState([]);
  const [isNomefazValid, setIsNomefazValid] = useState(true);
  const [nomeExist, setNomeExist] = useState(false);
  const [isProprValid, setIsProprValid] = useState(true);
  const [isTipoValid, setIsTipoValid] = useState(true);
  const [keyboardStatus, setkeyboardStatus] = useState(false);
  useEffect(() => {
    if (realm) {
      let data = realm.objects("Farm").sorted("nomefaz");
      setListaFaz(data.filter((fazenda) => fazenda.nomefaz === nomefaz));
    }
  }, [realm, nomefaz]);
  //Escrever no Banco
  async function handleAddFarm() {
    if (realm) {
      try {
        realm.write(() => {
          let NewFazID = uuid.v4();
          realm.create("Farm", {
            _id: NewFazID,
            nomefaz,
            proprietario,
            tipoprod,
            createdAt: new Date(),
          });
          Alert.alert("Dados cadastrados com sucesso!");
          FazendaID(NewFazID);
          navigation.navigate("SelectRebPage");
          RebanhoID("");
          FazendaProp(proprietario);
        });
      } catch (e) {
        Alert.alert("Não foi possível cadastrar!", e.message);
      } finally {
        setNomefaz("");
        setProprietario("");
        setTipoprod("");
      }
    }
  }
  useEffect(() => {
    const exists = listaFaz.length > 0;
    setNomeExist(exists);
  }, [listaFaz.length]);

  function handleNomefazChange(text) {
    const isValid = text.trim().length > 0;
    setIsNomefazValid(isValid);
    setNomefaz(text);
  }
  function handleProprChange(text) {
    const isValid = text.trim().length > 0;
    setIsProprValid(isValid);
    setProprietario(text);
  }
  function handleTipoChange(text) {
    const isValid = text.trim().length > 0;
    setIsTipoValid(isValid);
    setTipoprod(text);
  }
  function validCheck() {
    if (
      nomefaz.length === 0 ||
      listaFaz.length != 0 ||
      proprietario.length === 0 ||
      tipoprod.length === 0
    ) {
      if (nomefaz.length === 0) {
        setIsNomefazValid(false);
      }
      if (listaFaz.length != 0) {
        setNomeExist(true);
      }
      if (proprietario.length === 0) {
        setIsProprValid(false);
      }
      if (tipoprod.length === 0) {
        setIsTipoValid(false);
      }
    } else if (isNomefazValid && isProprValid && isTipoValid && !nomeExist) {
      handleAddFarm();
    }
  }
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
      return styles.containerbotao;
    }
  }
  //estilo ScrollView
  function StyleScrollViewContainer() {
    if (keyboardStatus) {
      return [styles.ContainerScrollStyle, { paddingBottom: 15 }];
    } else {
      return [styles.ContainerScrollStyle, { flex: 1 }];
    }
  }
  return (
    <KeyboardAvoidingView behavior="undefined" style={styles.containerkeyboard}>
      <SafeAreaView style={styles.container}>
        <View style={styles.containergeral}>
          <ScrollView
            contentContainerStyle={StyleScrollViewContainer()}
            style={{ flex: 1 }}
          >
            <Image
              style={keyboardStatus ? { display: "none" } : styles.logo}
              source={require("../../../../assets/FazFin.png")}
            />
            {/* Nome Rebanho */}
            <TextInput
              mode="flat"
              label="Nome da Fazenda"
              style={styles.campoTexto}
              placeholderTextColor={Colors.grey}
              textColor={Colors.black}
              activeUnderlineColor={Colors.green}
              underlineColor={Colors.blue}
              underlineStyle={{ paddingBottom: 3 }}
              placeholder="Ex: Fazenda Sonho meu"
              onChangeText={handleNomefazChange}
              value={nomefaz}
              error={!isNomefazValid}
            />
            <HelperText
              type="error"
              style={{
                color: MD3Colors.error60,
                fontSize: 14,
                lineHeight: 15,
              }}
              visible={!isNomefazValid || nomeExist}
              padding="20"
            >
              {!isNomefazValid
                ? "Digite o nome da fazenda."
                : "Já existe uma fazenda com esse nome."}
            </HelperText>
            {/* Nome Do Proprietario */}
            <TextInput
              mode="flat"
              style={styles.campoTexto}
              placeholderTextColor={Colors.grey}
              textColor={Colors.black}
              activeUnderlineColor={Colors.green}
              underlineColor={Colors.blue}
              underlineStyle={{ paddingBottom: 3 }}
              label="Nome do Proprietário"
              placeholder="Ex: Jose Ferreira Pires"
              onChangeText={handleProprChange}
              value={proprietario}
              error={!isProprValid}
            />
            <HelperText
              type="error"
              style={{
                color: MD3Colors.error60,
                fontSize: 14,
                lineHeight: 15,
              }}
              visible={!isProprValid}
              padding="20"
            >
              Digite o nome do Proprietário.
            </HelperText>
            {/* Tipo de Pecuaria */}
            <TextInput
              mode="flat"
              label="Tipo da Pecuária"
              style={styles.campoTexto}
              placeholderTextColor={Colors.grey}
              textColor={Colors.black}
              activeUnderlineColor={Colors.green}
              underlineColor={Colors.blue}
              underlineStyle={{ paddingBottom: 3 }}
              placeholder="Ex: Pecuária Leiteira"
              onChangeText={handleTipoChange}
              value={tipoprod}
              error={!isTipoValid}
            />
            <HelperText
              type="error"
              style={{
                color: MD3Colors.error60,
                fontSize: 14,
                lineHeight: 15,
              }}
              visible={!isTipoValid}
              padding="20"
            >
              Digite o tipo de pecuária.
            </HelperText>
          </ScrollView>
          <View style={StyleFuncKeyboard()}>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => navigation.navigate("SelectFazPage")}
            >
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={styles.tituloBotao}>{"Voltar"}</Text>
              </View>
              <MaterialIcons name="arrow-back" size={scale(24)} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.botao} onPress={validCheck}>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={styles.tituloBotao}>{"Cadastrar"}</Text>
              </View>
              <MaterialIcons name="add" size={scale(24)} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default CadastroFaz;
