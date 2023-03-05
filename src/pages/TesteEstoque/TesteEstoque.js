import React, { useState, useContext, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import DropdownComponent from "../../components/Dropdown/TipoProd";
import uuid from "react-native-uuid";
import { AuthContext } from "../../contexts/auth";
import writeEstoqueEntrada from "../../Realm/writeEstoqueEntrada";
import getAllEstoque from "../../Realm/getAllEstoque";
function TesteEstoque() {
  const navigation = useNavigation();
  //estados
  const [listaEstoque, setListaEstoque] = useState([]);
  const [nomeProd, setNomeProd] = useState("");
  const [valorCompraI, setValorCompra] = useState("");
  const [volumeProdI, setVolumeProd] = useState("");
  const [pesoProdI, setPesoProd] = useState("");
  const [obserProd, setObserProd] = useState("");
  const { tipoProd } = useContext(AuthContext);
  const { fazID } = useContext(AuthContext);
  async function handleAddEstoqueEntrada() {
    if (tipoProd == 1) {
      let valorCompra = Number(valorCompraI);
      let volumeProd = Number(volumeProdI);
      await writeEstoqueEntrada(
        {
          _id: uuid.v4(),
          nomeProd,
          valorCompra,
          volumeProd,
          obserProd,
          createdAt: new Date(),
        },
        fazID
      );
    }
    if (tipoProd == 2) {
      let valorCompra = Number(valorCompraI);
      let pesoProd = Number(pesoProdI);
      await writeEstoqueEntrada(
        {
          _id: uuid.v4(),
          nomeProd,
          valorCompra,
          pesoProd,
          obserProd,
          createdAt: new Date(),
        },
        fazID
      );
    }
  }
  //Buscar no banco
  async function fetchData(fazID) {
    const dataEstoque = await getAllEstoque(fazID);
    setListaEstoque(dataEstoque);
  }
  useFocusEffect(
    useCallback(() => {
      fetchData(fazID);
    }, [])
  );
  console.log(listaEstoque);
  const TextInputTipo = () => {
    console.log(tipoProd);
    if (tipoProd == 1) {
      return (
        <View>
          <Text style={styles.font}>Volume do produto:</Text>
          <TextInput
            style={styles.font}
            value={volumeProdI}
            onChangeText={setVolumeProd}
            placeholder="200"
            keyboardType="decimal-pad"
            inputMode="decimal"
          />
        </View>
      );
    }
    return (
      <View>
        <Text style={styles.font}>Peso do produto:</Text>
        <TextInput
          style={styles.font}
          value={pesoProdI}
          onChangeText={setPesoProd}
          placeholder="60"
          keyboardType="decimal-pad"
          inputMode="decimal"
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
          inputMode="text"
        />
        <Text style={styles.font}>Preço do produto:</Text>
        <TextInput
          style={styles.font}
          value={valorCompraI}
          onChangeText={setValorCompra}
          placeholder="50,00"
          keyboardType="decimal-pad"
          inputMode="decimal"
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
          inputMode="text"
        />
        <TouchableOpacity onPress={handleAddEstoqueEntrada}>
          <Text>{"Cadastrar"}</Text>
        </TouchableOpacity>
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
