import React, { useState, useContext, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
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
  const [valorProdI, setValorProd] = useState("");
  const [volumeProdI, setVolumeProd] = useState("");
  const [pesoProdI, setPesoProd] = useState("");
  const [obserProd, setObserProd] = useState("");
  const [qtdProdI, setQtdProd] = useState("");
  const { tipoProd } = useContext(AuthContext);
  const { fazID } = useContext(AuthContext);
  //Gravar dados no banco
  async function handleAddEstoqueEntrada() {
    //checar se cadastro é relacionado a tipo 1 ou 2 (farmácia/alimentos)
    if (tipoProd == 1) {
      let valorProd = Number(valorProdI);
      let volumeProd = Number(volumeProdI);
      let qtdProd = Number(qtdProdI);
      await writeEstoqueEntrada(
        {
          _id: uuid.v4(),
          nomeProd,
          valorProd,
          qtdProd,
          volumeProd,
          obserProd,
          createdAt: new Date(),
        },
        fazID
      );
    }
    if (tipoProd == 2) {
      let valorProd = Number(valorProdI);
      let pesoProd = Number(pesoProdI);
      let qtdProd = Number(qtdProdI);
      await writeEstoqueEntrada(
        {
          _id: uuid.v4(),
          nomeProd,
          valorProd,
          pesoProd,
          qtdProd,
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
  //Checar tipo de input farmacia/alimentos e deixar visivel somente o campo relacionado (volume/peso)
  const TextInputTipo = () => {
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
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <Text>
          {item.nomeProd} - R$ {(item.valorProd * item.qtdProd).toFixed(2)}
        </Text>
      </TouchableOpacity>
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
        <DropdownComponent />
        <Text style={styles.font}>Preço do produto:</Text>
        <TextInput
          style={styles.font}
          value={valorProdI}
          onChangeText={setValorProd}
          placeholder="50,00"
          keyboardType="decimal-pad"
          inputMode="decimal"
        />
        <Text style={styles.font}>Quantidade de produtos comprados:</Text>
        <TextInput
          style={styles.font}
          value={qtdProdI}
          onChangeText={setQtdProd}
          placeholder="10"
          keyboardType="decimal-pad"
          inputMode="decimal"
        />
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
        <TouchableOpacity
          style={styles.botao}
          onPress={handleAddEstoqueEntrada}
        >
          <Text style={styles.font}>{"Cadastrar"}</Text>
        </TouchableOpacity>

        <View>
          <Text>Detalhes de receitas:</Text>
          <FlatList
            data={listaEstoque}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          ></FlatList>
        </View>
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
  botao: {
    backgroundColor: "green",
    alignSelf: "center",
    height: "100%",
    width: "100%",
    maxHeight: 50,
    maxWidth: 200,
  },
});
export default TesteEstoque;
