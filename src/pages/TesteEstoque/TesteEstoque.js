import React, { useState, useContext, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import DropdownComponent from "../../components/Dropdown/TipoProd";
import uuid from "react-native-uuid";
import { AuthContext } from "../../contexts/auth";
import writeEstoqueEntrada from "../../Realm/writeEstoqueEntrada";
import getAllEstoqueEntrada from "../../Realm/getAllEstoqueEntrada";
import writeEstoque from "../../Realm/writeEstoque";
import getAllEstoque from "../../Realm/getAllEstoque";
import getAllEstoqueFiltered from "../../Realm/getAllEstoqueFiltered";
import Modal from "react-native-modal";
function TesteEstoque() {
  const navigation = useNavigation();
  //estados
  const [listaEstoque, setListaEstoque] = useState([]);
  const [listaEstoqueFiltered, setListaEstoqueFiltered] = useState([]);
  const [listaEstoqueEntrada, setListaEstoqueEntrada] = useState([]);
  const [nomeProd, setNomeProd] = useState("");
  const [valorProdI, setValorProd] = useState("");
  const [volumeProdI, setVolumeProd] = useState("");
  const [pesoProdI, setPesoProd] = useState("");
  const [obserProd, setObserProd] = useState("");
  const [qtdProdI, setQtdProd] = useState("");
  const { tipoProd } = useContext(AuthContext);
  const { fazID } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  function toggleModal() {
    setModalVisible(!isModalVisible);
    fetchDataEntrada(fazID);
    fetchDataEstoque(fazID);
  }
  //Gravar dados em Estoque principal
  async function handleAddEstoque() {
    //checar se produto já existe
    if (listaEstoqueFiltered == undefined) {
      //se não existe checar se cadastro é relacionado a tipo 1 ou 2 (farmácia/alimentos)
      if (tipoProd == 1) {
        let valorProd = Number(valorProdI);
        let volumeProd = Number(volumeProdI);
        let qtdProd = Number(qtdProdI);
        await writeEstoque(
          {
            nomeProd,
            _id: uuid.v4(),
            valorProd,
            qtdProd,
            volumeProd,
            obserProd,
            createdAt: new Date(),
          },
          fazID,
          nomeProd
        );
      } else if (tipoProd == 2) {
        let valorProd = Number(valorProdI);
        let pesoProd = Number(pesoProdI);
        let qtdProd = Number(qtdProdI);
        await writeEstoque(
          {
            nomeProd,
            _id: uuid.v4(),
            valorProd,
            pesoProd,
            qtdProd,
            obserProd,
            createdAt: new Date(),
          },
          fazID,
          nomeProd
        );
      }
    }
    //se produto existe
    else {
      if (tipoProd == 1 && listaEstoqueFiltered.volumeProd > 0) {
        let valorProd = Number(valorProdI);
        let volumeProd = Number(volumeProdI);
        let qtdProd = Number(qtdProdI);
        valorProd = valorProd + listaEstoqueFiltered.valorProd;
        volumeProd = volumeProd + listaEstoqueFiltered.volumeProd;
        qtdProd = qtdProd + listaEstoqueFiltered.qtdProd;
        await writeEstoque(
          {
            nomeProd,
            _id: uuid.v4(),
            valorProd,
            qtdProd,
            volumeProd,
            obserProd,
            createdAt: new Date(),
          },
          fazID,
          nomeProd
        );
      } else if (tipoProd == 2 && listaEstoqueFiltered.pesoProd > 0) {
        let valorProd = Number(valorProdI);
        let pesoProd = Number(pesoProdI);
        let qtdProd = Number(qtdProdI);
        await writeEstoque(
          {
            nomeProd,
            _id: uuid.v4(),
            valorProd,
            pesoProd,
            qtdProd,
            obserProd,
            createdAt: new Date(),
          },
          fazID,
          nomeProd
        );
      } else {
        Alert.alert(
          "Produto com mesmo nome encontrado em outra categoria, cadastro sem sucesso."
        );
      }
    }
  }
  //Buscar no banco filtrando por nome
  async function fetchDataEstoqueFiltered(fazID, nomeProd) {
    const dataEstoqueFiltered = await getAllEstoqueFiltered(fazID, nomeProd);
    setListaEstoqueFiltered(dataEstoqueFiltered);
  }
  useEffect(() => {
    fetchDataEstoqueFiltered(fazID, nomeProd);
  }, [nomeProd]);
  console.log(listaEstoqueFiltered);
  //Buscar no banco estoque
  async function fetchDataEstoque(fazID) {
    const dataEstoque = await getAllEstoque(fazID);
    setListaEstoque(dataEstoque);
  }
  //Gravar dados de transações de entrada no banco
  async function handleAddEstoqueEntrada() {
    //checar se produto já existe
    if (listaEstoqueFiltered == undefined) {
      //se n existe checar se cadastro é relacionado a tipo 1 ou 2 (farmácia/alimentos)
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
      } else if (tipoProd == 2) {
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
      } //se existe checar se cadastro é relacionado a tipo 1 ou 2 (farmácia/alimentos)
    } else {
      if (tipoProd == 1 && listaEstoqueFiltered.volumeProd > 0) {
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
      } else if (tipoProd == 2 && listaEstoqueFiltered.pesoProd > 0) {
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
    handleAddEstoque();
  }
  //Buscar no banco Transações de entrada
  async function fetchDataEntrada(fazID) {
    const dataEstoqueEntrada = await getAllEstoqueEntrada(fazID);
    setListaEstoqueEntrada(dataEstoqueEntrada);
  }
  useFocusEffect(
    useCallback(() => {
      fetchDataEntrada(fazID);
      fetchDataEstoque(fazID);
    }, [])
  );
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
  const TipoAfter = (item) => {
    if (item.volumeProd > 0) {
      const categoriaProd = "Remédios";
      return categoriaProd;
    }
    if (item.pesoProd > 0) {
      const categoriaProd = "Alimentos";
      return categoriaProd;
    }
  };
  const renderItemEntrada = ({ item }) => {
    return (
      <ScrollView>
        <TouchableOpacity>
          <Text style={styles.font}>
            {item.nomeProd} - R$ {(item.valorProd * item.qtdProd).toFixed(2)}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };
  const renderItemEstoque = ({ item }) => {
    const categoriaProd = TipoAfter(item);
    return (
      <ScrollView>
        <TouchableOpacity>
          <Text style={styles.font}>
            Nome {item.nomeProd} - Quantidade {item.qtdProd.toFixed(0)} - Media
            de preço - R$
            {((item.valorProd * item.qtdProd) / item.qtdProd).toFixed(2)} -
            Categoria {categoriaProd}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };
  return (
    <View style={styles.container}>
      <Header />
      <TouchableOpacity
        onPress={() => {
          toggleModal();
        }}
      >
        <Text style={styles.font}>Teste</Text>
      </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        coverScreen={true}
        backdropColor={"rgba(234,242,215,0.8)"}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.container}>
          <Text style={styles.font}>Detalhes de receitas:</Text>
          <FlatList
            data={listaEstoqueEntrada}
            renderItem={renderItemEntrada}
            keyExtractor={(item) => item._id}
          ></FlatList>
          <Text style={styles.font}>Estoques:</Text>
          <FlatList
            data={listaEstoque}
            renderItem={renderItemEstoque}
            keyExtractor={(item) => item._id}
          ></FlatList>
          <TouchableOpacity
            onPress={() => {
              toggleModal();
            }}
          >
            <Text style={styles.font}>Teste</Text>
          </TouchableOpacity>
        </View>
      </Modal>

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
          <Text style={styles.font}>Estoques:</Text>
          <FlatList
            data={listaEstoque}
            renderItem={renderItemEstoque}
            keyExtractor={(item) => item._id}
          ></FlatList>
        </View>
        <View>
          <Text style={styles.font}>Detalhes de receitas:</Text>
          <FlatList
            data={listaEstoqueEntrada}
            renderItem={renderItemEntrada}
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
