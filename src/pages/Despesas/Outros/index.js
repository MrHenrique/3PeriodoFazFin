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
import { TextInput, HelperText } from "react-native-paper";
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
  // listener teclado
  const [keyboardStatus, setkeyboardStatus] = useState(false);
  const { rebID } = useContext(AuthContext);
  async function handleAddGastos() {
    if (realm) {
      try {
        realm.write(() => {
          let reb = realm.objectForPrimaryKey("RebanhoSchema", rebID);
          const valorProd = Number(valorProdString);
          let createdGastos = realm.create("DespesasSchema", {
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
                />
              </View>
              <HelperText></HelperText>
              <View style={styles.containerOutrasDespesas}>
                <TextInput
                  mode="flat"
                  label={"Total Pago"}
                  style={styles.txtInput}
                  placeholderTextColor={Colors.grey}
                  textColor={Colors.black}
                  activeUnderlineColor={Colors.green}
                  underlineColor={Colors.blue}
                  underlineStyle={{ paddingBottom: 3 }}
                  value={valorProdString}
                  keyboardType="number-pad"
                  onChangeText={setValorProd}
                  placeholder="Exemplo: 10000.20"
                />
              </View>
              <HelperText></HelperText>
            </View>
          </ScrollView>
          <View style={StyleFuncKeyboard()}>
            <TouchableOpacity onPress={handleAddGastos} style={styles.botao}>
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
