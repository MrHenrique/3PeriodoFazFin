import React, { useState, useContext } from "react";
import { View, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { scale, verticalScale } from "react-native-size-matters";
import { AuthContext } from "../../../contexts/auth";
import { Feather } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import { useMainContext } from "../../../contexts/RealmContext";
import { Alert } from "react-native";

function CadastroVaca({ navigation }) {
  const realm = useMainContext();
  const [nomeVaca, setNomeVaca] = useState();
  const [nascVaca, setNascVaca] = useState();
  const [brincoVaca, setBrincoVaca] = useState();
  const [descVaca, setDescVaca] = useState();
  const [genero, setGenero] = useState();
  const [macho, setMacho] = useState("square");
  const [femea, setFemea] = useState("square");
  //Escrever no Banco
  async function handleAddVaca() {
    if (realm) {
      try {
        realm.write(() => {
          let dataReb = realm.objectForPrimaryKey("RebanhoSchema", rebID);
          let createdVaca = realm.create("VacasSchema", {
            _id: uuid.v4(),
            nomeVaca: nomeVaca,
            nascimentoVaca: nascVaca,
            brincoVaca: brincoVaca,
            descVaca: descVaca,
            createdAt: new Date(),
            genero: genero,
          });
          dataReb.vacas.push(createdVaca);
          Alert.alert("Dados cadastrados com sucesso!");
        });
      } catch (e) {
        Alert.alert("Não foi possível cadastrar!", e.message);
      } finally {
        setNomeVaca();
        setNascVaca();
        setBrincoVaca();
        setDescVaca();
        setGenero();
        setMacho("square");
        setFemea("square");
      }
    }
  }
  const { rebID } = useContext(AuthContext);
  return (
    <ScrollView>
      <View style={styles.container}>
        {/*Nome da Vaca*/}
        <View style={styles.containerinfos}>
          <Text style={styles.tituloinfo}>Nome Da Vaca:</Text>
          <TextInput
            style={styles.detalhe}
            value={nomeVaca}
            onChangeText={setNomeVaca}
          />
        </View>
        {/*Nascimento*/}
        <View style={styles.containerinfos}>
          <Text style={styles.tituloinfo}>Ano de Nascimento:</Text>
          <TextInput
            style={styles.detalhe}
            value={nascVaca}
            onChangeText={setNascVaca}
            keyboardType="number-pad"
          />
        </View>
        {/*Etiqueta*/}
        <View style={styles.containerinfos}>
          <Text style={styles.tituloinfo}>Identificação ou Brinco:</Text>
          <TextInput
            style={styles.detalhe}
            value={brincoVaca}
            onChangeText={setBrincoVaca}
          />
        </View>
        {/*Descrição*/}
        <View style={styles.containerinfos}>
          <Text style={styles.tituloinfo}>Descrição:</Text>
          <TextInput
            style={styles.detalhe}
            value={descVaca}
            onChangeText={setDescVaca}
            multiline
          />
        </View>
        {/*Genero*/}
        <View style={styles.containerinfos}>
          <Text style={styles.tituloinfo}>Gênero:</Text>
          <View style={styles.containergenero}>
            <View style={{ alignSelf: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  setGenero(1), setMacho("check-square"), setFemea("square");
                }}
              >
                <Text style={styles.titulogen}>Macho</Text>
                <Feather name={macho} size={scale(25)} color="white" />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setGenero(0), setMacho("square"), setFemea("check-square");
                }}
              >
                <Text style={styles.titulogen}>Fêmea</Text>
                <Feather name={femea} size={scale(25)} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.botaopress}
          onPress={() => {
            handleAddVaca();
          }}
        >
          <Text style={styles.textovoltar}>Cadastrar Animal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaopress, { marginBottom: scale(30) }]}
          onPress={() => navigation.navigate("PageAnimais")}
        >
          <Text style={styles.textovoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#004513",
  },
  containerinput: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    marginTop: scale(30),
    padding: scale(20),
    width: scale(320),
  },
  containerinfos: {
    marginVertical: verticalScale(15),
    padding: verticalScale(20),
    width: scale(320),
    backgroundColor: "rgba(15, 109, 0, 0.7)",
    borderRadius: 20,
    alignSelf: "center",
  },
  tituloinfo: {
    color: "white",
    fontSize: verticalScale(20),
    marginBottom: verticalScale(10),
    textAlign: "center",
  },
  detalhe: {
    fontSize: verticalScale(20),
    color: "black",
    backgroundColor: "white",
    borderRadius: verticalScale(5),
    marginBottom: verticalScale(20),
  },
  titulogen: {
    color: "#c4c4c4ff",
    fontSize: scale(15),
  },
  containergenero: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  botaopress: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: scale(10),
  },
  textovoltar: {
    fontSize: verticalScale(14),
    fontWeight: "bold",
    color: "#fff",
  },
});

export default CadastroVaca;