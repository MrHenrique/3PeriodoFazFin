import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { TextInput, HelperText, MD3Colors } from "react-native-paper";
import { Colors } from "../../../styles";
import uuid from "react-native-uuid";
import { AuthContext } from "../../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { useMainContext } from "../../../contexts/RealmContext";
import styles from "./styles";

export default function Outros() {
  const realm = useMainContext();
  const navigation = useNavigation();
  const [valorProdString, setValorProd] = useState("");
  const [nomeProd, setNomeProd] = useState("");
  const [valorProdValid, setIsValorProdValid] = useState(true);
  const [valorProdPreenchido, setValorProdPreenchido] = useState(true);
  const [nomeValid, setNomeValid] = useState(true);
  // listener teclado
  const [keyboardStatus, setkeyboardStatus] = useState(false);
  const { rebID } = useContext(AuthContext);
  function handleValorChange(text) {
    const cleanedText = text.replace(",", ".");
    const parsedValue = parseFloat(cleanedText);
    const isValid = !isNaN(parsedValue) && parsedValue > 0;
    setIsValorProdValid(isValid);
    setValorProd(parsedValue);
  }
  function validCheck() {
    if (valorProdString.length === 0 || nomeProd.length === 0) {
      if (valorProdString.length === 0) {
        setValorProdPreenchido(false);
      }
      if (nomeProd.length === 0) {
        setNomeValid(false);
      }
    } else if (valorProdPreenchido && valorProdValid) {
      handleAddGastos();
    }
  }
  async function handleAddGastos() {
    if (realm) {
      try {
        realm.write(() => {
          let reb = realm.objectForPrimaryKey("RebanhoSchema", rebID);
          const valorProd = Number(valorProdString);
          let createdGastos = realm.create("DespesaRebSchema", {
            _id: uuid.v4(),
            createdAt: new Date(),
            nomeProd,
            valorProd,
            qtdProd: 1,
            obserProd: "",
            pesoProd: 0,
            volumeProd: 0,
          });
          reb.despesas.push(createdGastos);
          Alert.alert("Dados cadastrados com sucesso!");
        });
      } catch (e) {
        Alert.alert("Não foi possível cadastrar!", e.message);
      } finally {
        setNomeProd("");
        setValorProd("");
      }
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
      return styles.containerbutaoKeyboardOn;
    } else {
      return styles.containerbutao;
    }
  }
  function StyleScrollViewContainer() {
    if (keyboardStatus) {
      return styles.ContainerScrollStyle;
    } else {
      return [styles.ContainerScrollStyle, { flex: 1 }];
    }
  }
  return (
    <KeyboardAvoidingView behavior="undefined" style={styles.containerkeyboard}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../../assets/fazfinwhiteletter.png")}
          resizeMode="repeat"
          imageStyle={{ opacity: 0.02 }} // imageStyle={{ margin: 25 }}
          style={styles.containergeral}
        >
          <ScrollView
            style={styles.scrollcontainer}
            contentContainerStyle={StyleScrollViewContainer()}
          >
            <View style={styles.containerCadastroOutras}>
              <View style={styles.containerOutrasDespesas}>
                <TextInput
                  mode="flat"
                  label={"Descrição"}
                  style={styles.txtInput}
                  placeholderTextColor={Colors.grey}
                  textColor={Colors.black}
                  activeUnderlineColor={Colors.green}
                  underlineColor={Colors.blue}
                  underlineStyle={{ paddingBottom: 3 }}
                  value={nomeProd}
                  onChangeText={setNomeProd}
                  placeholder="Exemplo: Reforma pasto"
                  error={!nomeValid}
                />
                <HelperText
                  type="error"
                  style={{
                    color: MD3Colors.error60,
                    fontSize: 14,
                    lineHeight: 12,
                  }}
                  visible={!nomeValid}
                  padding="20"
                >
                  Digite uma descrição.
                </HelperText>
              </View>
              <View style={styles.containerOutrasDespesas}>
                <TextInput
                  mode="flat"
                  label={"Valor total."}
                  style={styles.txtInput}
                  placeholderTextColor={Colors.grey}
                  textColor={Colors.black}
                  activeUnderlineColor={Colors.green}
                  underlineColor={Colors.blue}
                  underlineStyle={{ paddingBottom: 3 }}
                  value={valorProdString}
                  keyboardType="decimal-pad"
                  inputMode="text"
                  onChangeText={handleValorChange}
                  error={!valorProdValid || !valorProdPreenchido}
                />
                <HelperText
                  type="error"
                  style={{
                    color: MD3Colors.error60,
                    fontSize: 14,
                    lineHeight: 15,
                  }}
                  visible={!valorProdValid || !valorProdPreenchido}
                  padding="20"
                >
                  {!valorProdValid
                    ? "Valor inválido."
                    : "Preencha o campo valor total."}
                </HelperText>
              </View>
            </View>
          </ScrollView>
          <View style={StyleFuncKeyboard()}>
            <TouchableOpacity onPress={validCheck} style={styles.botao}>
              <Text style={styles.txtBotao}>{"Cadastrar"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={styles.botao}
            >
              <Text style={styles.txtBotao}>{"Voltar"}</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
}
