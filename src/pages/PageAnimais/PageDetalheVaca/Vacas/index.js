import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../../../../contexts/auth";
import { useMainContext } from "../../../../contexts/RealmContext";
import styles from "./styles";
import { TextInput, MD3Colors, HelperText } from "react-native-paper";
import { Colors } from "../../../../styles";
import DropdownSexo from "../../../../components/Dropdown/DropdownSexo";
import { Alert } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { scale } from "react-native-size-matters";

function Vacas({ navigation }) {
  const { idVaca, rebID, machoFemea, Genero, ListaReceitasVaca, ListaDespesasVaca } = useContext(AuthContext);
  const realm = useMainContext();
  const [lista, setLista] = useState([]);
  const [listaVacas, setListaVacas] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [nomeVaca, setNomeVaca] = useState();
  const [isNomeVacaValid, setIsNomeVacaValid] = useState(true);
  const [nomeVacaExists, setNomeVacaExists] = useState(false);
  const [brincoVaca, setBrincoVaca] = useState();
  const [isBrincoVacaValid, setIsBrincoVacaValid] = useState(true);
  const [brincoVacaExists, setBrincoVacaExists] = useState(false);
  const [nascimentoVaca, setNascimentoVaca] = useState();
  const [isNascimentoVacaValid, setIsNascimentoVacaValid] = useState(true);
  const [descVaca, setDescVaca] = useState();

  // update bd
  async function UpdateInfoVaca() {
    if (realm) {
      try {
        realm.write(() => {
          let updateVaca = realm.objectForPrimaryKey("VacasSchema", idVaca);
          updateVaca.nomeVaca = nomeVaca;
          updateVaca.nascimentoVaca = nascimentoVaca;
          updateVaca.brincoVaca = brincoVaca;
          updateVaca.createdAt = new Date();
          updateVaca.descVaca = descVaca;
          updateVaca.genero = machoFemea;
          Alert.alert("Dados modificados com sucesso!");
          setEditMode(false);
        });
      } catch (e) {
        Alert.alert("Não foi possível modificar!", e.message);
      }
    }
  }
  //buscar banco
  useEffect(() => {
    if (realm) {
      let dataVaca = realm.objectForPrimaryKey("VacasSchema", idVaca);
      setLista(dataVaca);
      setNomeVaca(dataVaca.nomeVaca);
      setBrincoVaca(dataVaca.brincoVaca);
      setNascimentoVaca(dataVaca.nascimentoVaca);
      setDescVaca(dataVaca.descVaca);
      Genero(dataVaca.genero);
      dataVaca.addListener((values) => {
        ListaReceitasVaca(values.receitas);
        ListaDespesasVaca(values.despesas);
        setLista(values);
        setNomeVaca(values.nomeVaca);
        setBrincoVaca(values.brincoVaca);
        setNascimentoVaca(values.nascimentoVaca);
        setDescVaca(values.descVaca);
        Genero(values.genero);
      });
      let dataVacas = realm.objectForPrimaryKey("RebanhoSchema", rebID);
      setListaVacas(dataVacas.vacas);
    }
  }, [realm]);
  function handleNomeVacaChange(text) {
    const isValid = text.trim().length > 0;
    if (
      listaVacas.filter((vacas) => vacas.nomeVaca === text).length > 0 &&
      lista.nomeVaca != text
    ) {
      setNomeVacaExists(true);
    } else {
      setNomeVacaExists(false);
    }
    setIsNomeVacaValid(isValid);
    setNomeVaca(text);
  }
  function handleBrincoVacaChange(text) {
    const isValid = text.trim().length > 0;
    if (
      listaVacas.filter((vacas) => vacas.brincoVaca === text).length > 0 &&
      lista.brincoVaca != text
    ) {
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
      UpdateInfoVaca();
    } else {
      Alert.alert("Preencha todos os campos e tente novamente.");
    }
  }
  function setCor(genero) {
    if (genero === 1) {
      return [
        styles.ContainerInfoCard,
        { elevation: 10, shadowColor: "#e500fa" },
      ];
    } else
      return [
        styles.ContainerInfoCard,
        { elevation: 10, shadowColor: "#0f53ff" },
      ];
  }

  return (
    <View style={styles.container}>
      <View style={styles.containergeral}>
        {!editMode ? (
          <>
            <View style={styles.contentContainer}>
              <View style={styles.containerCard}>
                <View style={styles.ContainerInfoCard}>
                  <Text style={styles.fontTitulo}>Nome da Vaca:</Text>
                  <Text style={styles.font}>{lista.nomeVaca}</Text>
                </View>
                <View style={styles.ContainerInfoCard}>
                  <Text style={styles.fontTitulo}>Identificação da vaca:</Text>
                  <Text style={styles.font}>{lista.brincoVaca}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.ContainerInfoCard}>
                    <Text style={styles.fontTitulo}>Ano de nascimento:</Text>
                    <Text style={styles.font}>{lista.nascimentoVaca}</Text>
                  </View>
                  <View style={setCor(lista.genero)}>
                    <Text style={styles.fontTitulo}>Gênero:</Text>
                    <Text style={styles.font}>
                      {lista.genero === 1 ? "Fêmea" : "Macho"}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.ContainerInfoCardOBS}>
                <Text style={styles.fontTitulo}>Observações:</Text>
                <Text style={styles.font}>{lista.descVaca}</Text>
              </View>
              <View style={styles.containervoltar}>
                <TouchableOpacity
                  style={styles.botao}
                  onPress={() => setEditMode(true)}
                >
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={styles.voltarfont}>{"Editar"}</Text>
                  </View>
                  <AntDesign name="edit" size={scale(24)} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.botao}
                  onPress={() => navigation.navigate("PageAnimais")}
                >
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={styles.voltarfont}>{"Voltar"}</Text>
                  </View>
                  <MaterialIcons
                    name="arrow-back"
                    size={scale(24)}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.contentContainer}>
              <View style={styles.ContainerInfoCard}>
                <View style={styles.containerInput}>
                  <TextInput
                    mode="flat"
                    label={"Nome do animal"}
                    style={styles.textInput}
                    placeholderTextColor={Colors.grey}
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
                    placeholderTextColor={Colors.grey}
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
                    label={"Ano de nascimento (Ex:2019)"}
                    placeholderTextColor={Colors.grey}
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
                    placeholderTextColor={Colors.grey}
                    textColor={Colors.black}
                    activeUnderlineColor={Colors.green}
                    underlineColor={Colors.blue}
                    underlineStyle={{ paddingBottom: 3 }}
                    value={descVaca}
                    onChangeText={setDescVaca}
                  />
                </View>
              </View>
            </View>
            <View style={styles.containervoltar}>
              <TouchableOpacity
                style={styles.botao}
                onPress={() => validCheck()}
              >
                <Text style={styles.voltarfont}>{"Confirmar"}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botao}
                onPress={() => navigation.navigate("PageAnimais")}
              >
                <Text style={styles.voltarfont}>{"Voltar"}</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

export default Vacas;
