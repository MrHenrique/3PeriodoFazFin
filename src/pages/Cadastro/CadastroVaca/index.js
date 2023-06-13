import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, Keyboard } from "react-native";
import { AuthContext } from "../../../contexts/auth";
import { useMainContext } from "../../../contexts/RealmContext";
import styles from "./styles";
import {
  TextInput,
  MD3Colors,
  IconButton,
  HelperText,
} from "react-native-paper";
import { Colors } from "../../../styles";
import DropdownSexo from "../../../components/Dropdown/DropdownSexo";
import { Alert } from "react-native";
import uuid from "react-native-uuid";
import { scale } from "react-native-size-matters";
import { MaterialIcons } from "@expo/vector-icons";

function CadastroVaca({ navigation }) {
  const { rebID, machoFemea } = useContext(AuthContext);
  const realm = useMainContext();
  const [listaVacas, setListaVacas] = useState([]);
  const [nomeVaca, setNomeVaca] = useState();
  const [isNomeVacaValid, setIsNomeVacaValid] = useState(true);
  const [nomeVacaExists, setNomeVacaExists] = useState(false);
  const [brincoVaca, setBrincoVaca] = useState();
  const [isBrincoVacaValid, setIsBrincoVacaValid] = useState(true);
  const [brincoVacaExists, setBrincoVacaExists] = useState(false);
  const [nascimentoVaca, setNascimentoVaca] = useState();
  const [isNascimentoVacaValid, setIsNascimentoVacaValid] = useState(true);
  const [descVaca, setDescVaca] = useState();
  const [genero, setGenero] = useState(); //update bd
  const [keyboardStatus, setkeyboardStatus] = useState(false);
  async function handleAddVaca() {
    if (realm) {
      try {
        realm.write(() => {
          let dataReb = realm.objectForPrimaryKey("RebanhoSchema", rebID);
          let createdVaca = realm.create("VacasSchema", {
            _id: uuid.v4(),
            nomeVaca: nomeVaca,
            nascimentoVaca: nascimentoVaca,
            brincoVaca: brincoVaca,
            descVaca: descVaca,
            createdAt: new Date(),
            genero: machoFemea,
            receitas:[],
            despesas:[],
            reproducao: [
              {
                _id: uuid.v4(),
                cio: false,
                cobertura: false,
                prenhez: false,
                dataCio: null,
                dataCobertura: null,
                dataParto: null,
                partos: [],
                notificacao: false,
              },
            ],
          });
          dataReb.vacas.push(createdVaca);
          navigation.navigate("PageAnimais");
          Alert.alert("Dados cadastrados com sucesso!");
        });
      } catch (e) {
        Alert.alert("Não foi possível cadastrar!", e.message);
      }
    }
  }
  //buscar banco
  useEffect(() => {
    if (realm) {
      let dataVacas = realm.objectForPrimaryKey("RebanhoSchema", rebID);
      setListaVacas(dataVacas.vacas);
    }
  }, [realm]);
  function handleNomeVacaChange(text) {
    const isValid = text.trim().length > 0;
    if (listaVacas.filter((vacas) => vacas.nomeVaca === text).length > 0) {
      setNomeVacaExists(true);
    } else {
      setNomeVacaExists(false);
    }
    setIsNomeVacaValid(isValid);
    setNomeVaca(text);
  }
  function handleBrincoVacaChange(text) {
    const isValid = text.trim().length > 0;
    if (listaVacas.filter((vacas) => vacas.brincoVaca === text).length > 0) {
      setBrincoVacaExists(true);
    } else {
      setBrincoVacaExists(false);
    }
    setIsBrincoVacaValid(isValid);
    setBrincoVaca(text);
  }
  function handleNascimentoVacaChange(text) {
    const parsedValue = parseInt(text, 10);
    const isValid =
      text.trim().length === 4 &&
      Number.isInteger(parsedValue) &&
      parsedValue >= 1974 &&
      parsedValue <= 2023 &&
      parsedValue.toString() === text.trim();
    setIsNascimentoVacaValid(isValid);
    setNascimentoVaca(text);
  }
  function validCheck() {
    if (
      isNomeVacaValid &&
      !nomeVacaExists &&
      !brincoVacaExists &&
      isBrincoVacaValid &&
      isNascimentoVacaValid
    ) {
      handleAddVaca();
    } else {
      Alert.alert("Preencha todos os campos e tente novamente.");
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
  function voltarBtnStyle() {
    if (!keyboardStatus === true) {
      return styles.containerEdit;
    } else {
      return { display: "none" };
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.containergeral}>
        <View style={styles.ContainerInfoCard}>
          <View style={styles.containerInput}>
            <TextInput
              mode="flat"
              label={"Nome do animal"}
              placeholder="ex: Mimosa"
              style={styles.textInput}
              placeholderTextColor={Colors.darkgrey}
              textColor={Colors.black}
              activeUnderlineColor={Colors.green}
              underlineColor={Colors.blue}
              underlineStyle={{ paddingBottom: 3 }}
              value={nomeVaca}
              onChangeText={handleNomeVacaChange}
              error={!isNomeVacaValid || nomeVacaExists}
            />
            <HelperText
              type="error"
              style={{
                color: MD3Colors.error60,
                fontSize: 14,
                lineHeight: 12,
              }}
              visible={!isNomeVacaValid || nomeVacaExists}
              padding="20"
            >
              {!isNomeVacaValid
                ? "Preencha o nome do animal."
                : "Nome digitado já está em uso."}
            </HelperText>
          </View>
          <View style={styles.containerInput}>
            <TextInput
              mode="flat"
              label={"Identificação do animal(brinco)"}
              style={styles.textInput}
              placeholderTextColor={Colors.darkgrey}
              textColor={Colors.black}
              activeUnderlineColor={Colors.green}
              underlineColor={Colors.blue}
              underlineStyle={{ paddingBottom: 3 }}
              value={brincoVaca}
              onChangeText={handleBrincoVacaChange}
              error={!isBrincoVacaValid || brincoVacaExists}
            />
            <HelperText
              type="error"
              style={{
                color: MD3Colors.error60,
                fontSize: 14,
                lineHeight: 12,
              }}
              visible={!isBrincoVacaValid || brincoVacaExists}
              padding="20"
            >
              {!isBrincoVacaValid
                ? "Preencha a identificação do animal."
                : "Identificação digitada já está em uso."}
            </HelperText>
          </View>
          <View style={styles.containerInput}>
            <TextInput
              mode="flat"
              style={styles.textInput}
              label={"Ano de nascimento"}
              placeholder="ex: 2009"
              placeholderTextColor={Colors.darkgrey}
              textColor={Colors.black}
              activeUnderlineColor={Colors.green}
              underlineColor={Colors.blue}
              underlineStyle={{ paddingBottom: 3 }}
              value={nascimentoVaca}
              onChangeText={(valor) => handleNascimentoVacaChange(valor)}
              keyboardType="numeric"
              error={!isNascimentoVacaValid}
            />
            <HelperText
              type="error"
              style={{
                color: MD3Colors.error60,
                fontSize: 14,
                lineHeight: 12,
              }}
              visible={!isNascimentoVacaValid}
              padding="20"
            >
              Digite um nascimento válido.
            </HelperText>
          </View>
          <View style={styles.containerInput}>
            <DropdownSexo />
          </View>
          <View style={styles.containerInput}>
            <TextInput
              mode="flat"
              style={styles.textInput}
              label={"Observações"}
              placeholder="ex: vaca esta doente... "
              placeholderTextColor={Colors.darkgrey}
              textColor={Colors.black}
              activeUnderlineColor={Colors.green}
              underlineColor={Colors.blue}
              underlineStyle={{ paddingBottom: 3 }}
              value={descVaca}
              onChangeText={setDescVaca}
            />
          </View>
        </View>
        <View style={voltarBtnStyle()}>
          <TouchableOpacity style={styles.botao} onPress={() => validCheck()}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={styles.voltarfont}>{"Cadastrar"}</Text>
            </View>
            <MaterialIcons name="add" size={scale(24)} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate("PageAnimais")}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={styles.voltarfont}>{"Voltar"}</Text>
            </View>
            <MaterialIcons name="arrow-back" size={scale(24)} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default CadastroVaca;
