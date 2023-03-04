import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, TextInput, FlatList } from "react-native";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import DropdownComponent from "../../components/Dropdown/TipoProd";

import { AuthContext } from "../../contexts/auth";

function TesteEstoque() {
  const navigation = useNavigation();
  //estados
  const [nomeProd, setNomeProd] = useState("");
  const [valorCompra, setValorCompra] = useState();
  const [volumeProd, setVolumeProd] = useState();
  const [pesoProd, setPesoProd] = useState();
  const [obserProd, setObserProd] = useState("");
  const { tipoProd } = useContext(AuthContext);

  const TextInputTipo = () => {
    console.log(tipoProd);
    if (tipoProd == 1) {
      return (
        <View>
          <Text style={styles.font}>Volume do produto:</Text>
          <TextInput
            style={styles.font}
            value={volumeProd}
            onChangeText={setVolumeProd}
            placeholder="200"
            keyboardType="decimal-pad"
          />
        </View>
      );
    }
    return (
      <View>
        <Text style={styles.font}>Peso do produto:</Text>
        <TextInput
          style={styles.font}
          value={pesoProd}
          onChangeText={setPesoProd}
          placeholder="60"
          keyboardType="decimal-pad"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.font}>Cadastro de Produto</Text>
      <View>
        <Text style={styles.font}>Nome do produto:</Text>
        <TextInput
          style={styles.font}
          value={nomeProd}
          onChangeText={setNomeProd}
          placeholder="Prata"
          keyboardType="default"
        />
        <Text style={styles.font}>Preço do produto:</Text>
        <TextInput
          style={styles.font}
          value={valorCompra}
          onChangeText={setValorCompra}
          placeholder="50,00"
          keyboardType="decimal-pad"
        />
        <DropdownComponent />
        {TextInputTipo()}
        <Text style={styles.font}>Observações:</Text>
        <TextInput
          style={styles.font}
          value={obserProd}
          onChangeText={setObserProd}
          placeholder="Produto comprado em ..."
          keyboardType="default"
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#004513",
  },
  font: {
    color: "white",
    fontSize: 20,
    alignSelf: "center",
  },
});
export default TesteEstoque;
