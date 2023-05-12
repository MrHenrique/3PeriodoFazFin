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
  useEffect(() => {
    if (realm) {
      let data = realm.objects("Farm").sorted("nomefaz");
      setListaFaz(data.filter((fazenda) => fazenda.nomefaz === nomefaz));
    }
  }, [realm,nomefaz]);
  //Escrever no Banco
  async function handleAddFarm() {
    if (realm && listaFaz.length === 0) {
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
    } else {
      Alert.alert("Essa fazenda já existe, troque o nome e tente novamente.");
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
            onChangeText={setNomefaz}
            value={nomefaz}
            placeholder="Qual o nome da sua Fazenda?"
          ></TextInput>
          <Text style={styles.texto}>Proprietário</Text>
          <TextInput
            style={styles.campoTexto}
            onChangeText={setProprietario}
            value={proprietario}
            placeholder="Qual o nome do proprietário?"
          ></TextInput>
          <Text style={styles.texto}>Tipo de produção</Text>
          <TextInput
            style={styles.campoTexto}
            onChangeText={setTipoprod}
            value={tipoprod}
            placeholder="Ex: Pecuária Leiteira"
          ></TextInput>
          <View style={styles.containerbotao}>
            <TouchableOpacity
              style={styles.botaopress2}
              onPress={() => navigation.navigate("SelectFazPage")}
            >
              <Text style={styles.tituloBotao}>{"Voltar"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaopress} onPress={handleAddFarm}>
              <Text style={styles.tituloBotao}>{"Cadastrar"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default CadastroFaz;
