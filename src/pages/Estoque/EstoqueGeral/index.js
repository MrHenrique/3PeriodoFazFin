import React, { useState, useContext, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../contexts/auth";
import getAllEstoqueEntrada from "../../../Realm/getAllEstoqueEntrada";
import getAllEstoque from "../../../Realm/getAllEstoque";
import Modal from "react-native-modal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
function EstoqueGeral() {
  const navigation = useNavigation();
  //estados
  const [listaEstoque, setListaEstoque] = useState([]);
  const [oldListaEstoque, setOldListaEstoque] = useState([]);
  const [filterEstoque, setFilterEstoque] = useState(false);
  const [listaEstoqueEntrada, setListaEstoqueEntrada] = useState([]);
  const { fazID } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [shouldShowDetalhes, setShouldShowDetalhes] = useState(false);
  const [nome, setNome] = useState();
  //Funcao, recebe item e retorna nome
  function nameItem(item) {
    const nome = item.nomeProd;
    return nome;
  }
  //abrir e fechar modal, chama funcao buscando dados no DB de entrada, modal troca de estado
  function toggleModal() {
    fetchDataEntrada(fazID);
    setModalVisible(!isModalVisible);
  }
  //Buscar no banco estoque
  async function fetchDataEstoque(fazID) {
    const dataEstoque = await getAllEstoque(fazID);
    setListaEstoque(dataEstoque);
  }
  //Buscar no banco Transações de entrada
  async function fetchDataEntrada(fazID) {
    const dataEstoqueEntrada = await getAllEstoqueEntrada(fazID);
    setListaEstoqueEntrada(dataEstoqueEntrada);
  }
  //Chama funcao buscando dados do estoque ao focar em página
  useFocusEffect(
    useCallback(() => {
      fetchDataEstoque(fazID);
    }, [])
  );
  //renderiza flat list com transações de entrada
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
  //recebe volume ou peso, e retorna a categoria do produto
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
  //recebe e define estado para nome, troca estado de filtrar estoque e mostrar codigo html de detalhes do produto
  async function EstoqueClick(item) {
    setNome(nameItem(item));
    setFilterEstoque(!filterEstoque);
    setShouldShow(!shouldShow);
  }
  //chama funcao de filtrar estoque caso estado filterestoque mude
  useEffect(() => {
    FilterEstoqueData(nome);
  }, [filterEstoque]);
  //funcao filtrar estoque, recebe estado nome e filtra estoque de acordo com o mesmo, define lista pré filtro em estado oldlistaestoque
  const FilterEstoqueData = () => {
    if (filterEstoque == true) {
      setOldListaEstoque(listaEstoque);
      setListaEstoque(
        listaEstoque.filter((estoque) => estoque.nomeProd === nome)
      );
    } else {
      setListaEstoque(oldListaEstoque);
    }
  };
  const EstoqueValorTotal = () => {
    let Valor = 0;
    let ValorTotal = 0;
    let x = 0;
    while (x < listaEstoque.length) {
      Valor = listaEstoque[x].qtdProd * listaEstoque[x].valorProd;
      x = x + 1;
      ValorTotal = ValorTotal + Valor;
    }
    return ValorTotal;
  };
  const CategImg = (categoriaProd) => {
    if (categoriaProd == "Alimentos") {
      return (
        <Image
          style={styles.tinyLogo}
          source={require("../../../../assets/wheat-sack.png")}
        />
      );
    } else {
      return (
        <TouchableOpacity>
          <Image
            style={styles.tinyLogo}
            source={require("../../../../assets/syringe.png")}
          />
        </TouchableOpacity>
      );
    }
  };
  const renderItemEstoque = ({ item }) => {
    const categoriaProd = TipoAfter(item);
    const imgCateg = CategImg(categoriaProd);
    function tipoRelatorio(categoriaProd) {
      if (categoriaProd == "Alimentos") {
        return (
          <View style={styles.containerlist}>
            <Text style={styles.font}>
              Peso em estoque : {(item.pesoProd / item.qtdProd) * item.qtdProd}{" "}
              KG
            </Text>
          </View>
        );
      } else {
        return (
          <View style={styles.containerlist}>
            <Text style={styles.font}>
              Volume em estoque :{" "}
              {(item.volumeProd / item.qtdProd) * item.qtdProd} ml
            </Text>
          </View>
        );
      }
    }
    return (
      <View style={styles.containerlist}>
        <TouchableOpacity onPress={() => EstoqueClick(item)}>
          <View style={styles.modalContainer}>
            <View style={styles.containerItem}>{imgCateg}</View>
            <View style={styles.containerText}>
              <Text style={styles.Text}>{item.nomeProd}</Text>
              <Text style={styles.Text}>{item.qtdProd.toFixed(0)}</Text>
            </View>
            <MaterialCommunityIcons
              name={"arrow-down-right"}
              size={25}
              color={"white"}
              style={styles.iconArrow}
            />
          </View>
        </TouchableOpacity>
        {shouldShow ? (
          <ScrollView>
            <View style={styles.containerlist}>
              <Text style={styles.font}>Nome do item : {item.nomeProd}</Text>
            </View>
            <View style={styles.containerlist}>
              <Text style={styles.font}>
                Categoria do item : {categoriaProd}
              </Text>
            </View>
            <View style={styles.containerlist}>
              <Text style={styles.font}>Itens em estoque : {item.qtdProd}</Text>
            </View>
            {tipoRelatorio(categoriaProd)}
            <View style={styles.containerlist}>
              <Text style={styles.font}>
                Média de preço por item : R$
                {(item.valorProd / item.qtdProd).toFixed(2)}
              </Text>
            </View>
            <View style={styles.containerlist}>
              <Text style={styles.font}>Data da ultima compra :</Text>
            </View>
            <View style={styles.containerlist}>
              <Text style={styles.font}>Observações : {item.obserProd}</Text>
            </View>
          </ScrollView>
        ) : null}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.font}>Valor de produtos em Estoque</Text>
        <Text style={styles.font}>R$ {EstoqueValorTotal().toFixed(2)}</Text>
      </View>
      <View>
      <TouchableOpacity
          onPress={() => {
            toggleModal();
          }}
        >
          <Text style={styles.font}>Relatorio de Compras</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShouldShowDetalhes(!shouldShowDetalhes)}
        >
          <Text style={styles.font}>Produtos cadastrados</Text>
        </TouchableOpacity>
        {shouldShowDetalhes ? (
          <View>
            <FlatList
              data={listaEstoque}
              renderItem={renderItemEstoque}
              keyExtractor={(item) => item._id}
            ></FlatList>
          </View>
        ) : null}
        <Modal
          isVisible={isModalVisible}
          coverScreen={true}
          backdropColor={"rgba(234,242,215,0.8)"}
          animationIn="slideInUp"
          animationOut="slideOutDown"
        >
          <View style={styles.container}>
            <Text style={styles.font}>Compras:</Text>
            <FlatList
              data={listaEstoqueEntrada}
              renderItem={renderItemEntrada}
              keyExtractor={(item) => item._id}
            ></FlatList>
            <TouchableOpacity
              onPress={() => {
                toggleModal();
              }}
            >
              <Text style={styles.font}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate("GeralFaz")}
        >
          <Text style={styles.font}>{"Voltar"}</Text>
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
  containerlist: {
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    overflow: "scroll",
    flexDirection: "row",
    alignSelf: "center",
  },
  containerItem: { flex: 1, marginLeft: 15 },
  containerText: { flex: 1 },
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
  tinyLogo: {
    width: 60,
    height: 60,
  },
  Text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  iconArrow: {
    marginTop: 50,
  },
});
export default EstoqueGeral;
