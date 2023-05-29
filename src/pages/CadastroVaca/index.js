import React, { useState, useContext } from "react";
import {
  Dimensions,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  DatePickerIOS, Button
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { scale, verticalScale } from "react-native-size-matters";
import { AuthContext } from "../../contexts/auth";
import { Feather } from "@expo/vector-icons";
import { useLinkBuilder } from "@react-navigation/native";
import uuid from "react-native-uuid";
import writenewVaca from "../../Realm/WritenewVaca";

function CadastroVaca({ navigation }) {
  const [nomeVaca, setnomeVaca] = useState();
  const [nascVaca, setnascVaca] = useState();
  const [brincoVaca, setbrincoVaca] = useState();
  const [descVaca, setdescVaca] = useState();
  const [genero, setgenero] = useState();
  const [macho, setmacho] = useState("square");
  const [femea, setfemea] = useState("square");
}

  function CombineData() {
    const newvaca = {
      _id: uuid.v4(),
      nomeVaca: nomeVaca,
      nascimentoVaca: nascVaca,
      brincoVaca: brincoVaca,
      descVaca: descVaca,
      createdAt: new Date(),
      genero: genero,
      receitas: [],
      assignee: {
        type: "linkingObjects",
        objectType: "RebanhoSchema",
        property: "vacas",
      },
    };
    return newvaca;
  }
  const { rebID } = useContext(AuthContext);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  return (
    <ScrollView>
      <View style={styles.container}>
        {/*Nome da Vaca*/}
        <View style={styles.containerinfos}>
          <Text style={styles.tituloinfo}>Nome Da Vaca:</Text>
          <TextInput
            style={styles.detalhe}
            value={nomeVaca}
            onChangeText={setnomeVaca}
          />
        </View>
        {/*Nascimento*/}
        <View style={styles.containerinfos}>
          <Text style={styles.tituloinfo}>Ano de Nascimento:</Text>
          <TextInput
            style={styles.detalhe}
            value={nascVaca}
            onChangeText={setnascVaca}
            keyboardType="number-pad"
          />
        </View>
        {/*Etiqueta*/}
        <View style={styles.containerinfos}>
          <Text style={styles.tituloinfo}>Identificação ou Brinco:</Text>
          <TextInput
            style={styles.detalhe}
            value={brincoVaca}
            onChangeText={setbrincoVaca}
          />
        </View>
        {/*Descrição*/}
        <View style={styles.containerinfos}>
          <Text style={styles.tituloinfo}>Descrição:</Text>
          <TextInput
            style={styles.detalhe}
            value={descVaca}
            onChangeText={setdescVaca}
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
                  setgenero(1), setmacho("check-square"), setfemea("square");
                }}
              >
                <Text style={styles.titulogen}>Macho</Text>
                <Feather name={macho} size={scale(25)} color="white" />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setgenero(0), setmacho("square"), setfemea("check-square");
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
            writenewVaca(rebID, CombineData()),
              navigation.navigate("PageListavacas");
          }}
        >
          <Text style={styles.textovoltar}>Cadastrar Animal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaopress, { marginBottom: scale(30) }]}
          onPress={() => navigation.navigate("PageListavacas")}
        >
          <Text style={styles.textovoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );


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
