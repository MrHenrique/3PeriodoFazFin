import React, { useState, useContext, useEffect } from "react";
import { verticalScale } from "react-native-size-matters";
import {
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
  ImageBackground,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import uuid from "react-native-uuid";
import styles from "./styles";
import { AuthContext } from "../../../contexts/auth";
import { useMainContext } from "../../../contexts/RealmContext";
import { Alert } from "react-native";
function CadastroFaz() {
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
    if (nomefaz.length === 0) {
      setIsNomefazValid(false);
    } else if (listaFaz.length != 0) {
      setNomeExist(true);
    } else if (proprietario.length === 0) {
      setIsProprValid(false);
    } else if (tipoprod.length === 0) {
      setIsTipoValid(false);
    } else if (
      isNomefazValid === true &&
      isProprValid === true &&
      isTipoValid === true &&
      nomeExist === false
    ) {
      handleAddFarm();
    } else {
      console.log("erro")
      Alert.alert("Preencha todos os campos e tente novamente.");
    }
  }
  const navigation = useNavigation();
  const imgbg1 = "../../../../assets/backgroundCad.jpg";
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgbg}
        source={require(imgbg1)}
        imageStyle={{ opacity: 0.6 }}
      >
        <View style={styles.containergeral}>
          <Image
            style={styles.logo}
            source={require("../../../../assets/FazFin.png")}
          />
          <Text style={[styles.texto, { marginTop: verticalScale(40) }]}>
            Nome da fazenda
          </Text>
          <TextInput
            style={styles.campoTexto}
            onChangeText={handleNomefazChange}
            value={nomefaz}
            placeholder="Qual o nome da sua Fazenda?"
          ></TextInput>
          {!isNomefazValid && (
            <Text style={styles.error}>
              O nome da fazenda não pode estar vazio.
            </Text>
          )}
          {nomeExist && (
            <Text style={styles.error}>
              Uma Fazenda com esse nome já existe.
            </Text>
          )}
          <Text style={styles.texto}>Proprietário</Text>
          <TextInput
            style={styles.campoTexto}
            onChangeText={handleProprChange}
            value={proprietario}
            placeholder="Qual o nome do proprietário?"
          ></TextInput>
          {!isProprValid && (
            <Text style={styles.error}>
              O nome do proprietário não pode estar vazio.
            </Text>
          )}
          <Text style={styles.texto}>Tipo de produção</Text>
          <TextInput
            style={styles.campoTexto}
            onChangeText={handleTipoChange}
            value={tipoprod}
            placeholder="Ex: Pecuária Leiteira"
          ></TextInput>
          {!isTipoValid && (
            <Text style={styles.error}>
              O tipo de produção não pode estar vazio.
            </Text>
          )}
          <View style={styles.containerbotao}>
            <TouchableOpacity
              style={styles.botaopress2}
              onPress={() => navigation.navigate("SelectFazPage")}
            >
              <Text style={styles.tituloBotao}>{"Voltar"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaopress} onPress={validCheck}>
              <Text style={styles.tituloBotao}>{"Cadastrar"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default CadastroFaz;
