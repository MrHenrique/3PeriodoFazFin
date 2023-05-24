import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ImageBackground,
} from "react-native";
import { useState, useContext } from "react";
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
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../../assets/adaptive-icon.png")}
        resizeMode="contain"
        imageStyle={{opacity: 0.05}}        // imageStyle={{ margin: 25 }}
        style={styles.containergeral}
      >
        <View style={styles.containerCadastroOutras}>
          <Text style={styles.txtTitulo}>Cadastro de outras despesas.</Text>
          <View style={styles.containerOutrasDespesas}>
            <Text style={styles.txtDescricao}>{"Descrição:"}</Text>
            <TextInput
              style={styles.txtInput}
              value={nomeProd}
              onChangeText={setNomeProd}
              placeholder="Exemplo: Reforma pasto"
            />
          </View>
          <View style={styles.containerOutrasDespesas}>
            <Text style={styles.txtDescricao}>{"Total pago:"}</Text>
            <TextInput
              style={styles.txtInput}
              value={valorProdString}
              keyboardType="number-pad"
              onChangeText={setValorProd}
              placeholder="Exemplo: 10000.20"
            />
          </View>
        </View>
        <View style={styles.containerbutao}>
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
  );
}
