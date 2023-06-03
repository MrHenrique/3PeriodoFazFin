import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageBackground,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../contexts/auth";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";
import { useMainContext } from "../../../contexts/RealmContext";
import styles from "../styles";
import { Colors } from "../../../styles";
function EstoqueGeral() {
  const realm = useMainContext();

  const navigation = useNavigation();
  //flatlist
  const numcolumns = 2;
  const windowwidth = Dimensions.get("window").width;
  //estados
  const [listaEstoque, setListaEstoque] = useState([]);
  const [oldListaEstoque, setOldListaEstoque] = useState([]);
  const [filterEstoque, setFilterEstoque] = useState(false);
  const [listaEstoqueEntrada, setListaEstoqueEntrada] = useState([]);
  const { fazID } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [shouldShowDetalhes, setShouldShowDetalhes] = useState(true);
  const [shouldShowRelatorio, setShouldShowRelatorio] = useState(false);
  const [nome, setNome] = useState();
  //Funcao, recebe item e retorna nome
  function nameItem(item) {
    const nome = item.nomeProd;
    return nome;
  }
  //abrir e fechar modal, chama funcao buscando dados no DB de entrada, modal troca de estado
  function toggleModal() {
    setModalVisible(!isModalVisible);
  }
  //Chama funcao buscando dados do estoque
  useEffect(() => {
    if (realm) {
      let dataEstoque = realm.objectForPrimaryKey("Farm", fazID);
      setListaEstoque(dataEstoque.atualEstoque.sorted("nomeProd"));
      setListaEstoqueEntrada(dataEstoque.entradaEstoque.sorted("createdAt"));
      dataEstoque.atualEstoque.sorted("nomeProd").addListener((values) => {
        setListaEstoque([...values]);
      });
      dataEstoque.entradaEstoque.sorted("createdAt").addListener((values) => {
        setListaEstoqueEntrada([...values]);
      });
    }
  }, [realm]);

  //renderiza flat list com transações de entrada
  const renderItemEntrada = ({ item }) => {
    const valor = (item.valorProd * item.qtdProd).toFixed(2);
    const formattedValor = `R$ ${valor.replace(".", ",")}`;
    return (
      <ScrollView>
        <TouchableOpacity style={styles.listaDet}>
          <Text style={styles.font}>
            {item.nomeProd} - {formattedValor}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };
  //recebe volume ou peso, e retorna a categoria do produto
  const TipoAfter = (item) => {
    if (item.volumeProd >= 0) {
      const categoriaProd = "Remédios";
      return categoriaProd;
    }
    if (item.pesoProd >= 0) {
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
    let ValorTotal = listaEstoque.reduce(
      (total, produto) => total + produto.valorProd,
      0
    );
    const formattedValor = `R$ ${ValorTotal.toFixed(2).replace(".", ",")}`;
    return formattedValor;
  };
  function formatMediaPreco(item) {
    if (item.volumeProd > 0 || item.pesoProd > 0) {
      if (item.volumeProd > 0) {
        const valor = (item.valorProd / item.volumeProd).toFixed(2);
        const formattedValor = `R$ ${valor.replace(".", ",")}`;
        return formattedValor;
      } else {
        const valor = (item.valorProd / item.pesoProd).toFixed(2);
        const formattedValor = `R$ ${valor.replace(".", ",")}`;
        return formattedValor;
      }
    } else {
      return "-";
    }
  }
  const CategImg = (categoriaProd) => {
    if (categoriaProd == "Alimentos") {
      return require("../../../../assets/wheat-sack.png");
    } else {
      return require("../../../../assets/syringe.png");
    }
  };
  const renderItemEstoque = ({ item }) => {
    const categoriaProd = TipoAfter(item);
    const imgCateg = CategImg(categoriaProd);
    function tipoRelatorio(categoriaProd) {
      if (categoriaProd == "Alimentos") {
        const valor = item.pesoProd.toFixed(2);
        const formattedValor = `${valor.replace(".", ",")}kg`;
        return (
          <View style={styles.containerlist}>
            <View style={styles.ListItem}>
              <Text style={styles.fontsubtitulo}>Peso em estoque :</Text>
              <Text style={styles.fontcontainerlistitem}>{formattedValor}</Text>
            </View>
          </View>
        );
      } else {
        const valor = item.volumeProd.toFixed(2);
        const formattedValor = `${valor.replace(".", ",")}L`;
        return (
          <View style={styles.containerlist}>
            <View style={styles.ListItem}>
              <Text style={styles.fontsubtitulo}>Volume em estoque :</Text>
              <Text style={styles.fontcontainerlistitem}>{formattedValor}</Text>
            </View>
          </View>
        );
      }
    }
    return (
      <View style={styles.containerlist}>
        <TouchableOpacity
          style={
            shouldShow
              ? styles.listcontainerstyleMargin
              : styles.listcontainerstyle
          }
          onPress={() => EstoqueClick(item)}
        >
          <ImageBackground
            source={imgCateg}
            resizeMode="contain"
            style={styles.containerItem}
            imageStyle={{ margin: 25 }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.containerText}>
                <Text style={styles.Text}>{item.nomeProd}</Text>
              </View>
              <MaterialIcons
                name={"expand-more"}
                size={35}
                color={"white"}
                style={shouldShow ? styles.iconArrowvirado : styles.iconArrow}
              />
            </View>
          </ImageBackground>
        </TouchableOpacity>
        {shouldShow ? (
          <ScrollView style={styles.containerItems}>
            <View style={styles.containerlist}>
              <View
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <View
                  style={[
                    styles.ListItem,
                    { flex: 1, flexDirection: "column", borderBottomWidth: 0 },
                  ]}
                >
                  <Text style={styles.fontsubtitulo}>Categoria do item:</Text>
                  <Text style={styles.fontcontainerlistitem}>
                    {categoriaProd}
                  </Text>
                </View>
              </View>
            </View>
            {item.pesoProd >= 0 ? (
              <View>
                {tipoRelatorio(categoriaProd)}
                <View style={styles.containerlist}>
                  <View style={styles.ListItem}>
                    <Text style={styles.fontsubtitulo}>
                      Média de preço por kg:
                    </Text>
                    <Text style={styles.fontcontainerlistitem}>
                      {formatMediaPreco(item, categoriaProd)}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <></>
            )}
            {item.volumeProd >= 0 ? (
              <View>
                {tipoRelatorio(categoriaProd)}
                <View style={styles.containerlist}>
                  <View style={styles.ListItem}>
                    <Text style={styles.fontsubtitulo}>
                      Média de preço por litro:
                    </Text>
                    <Text style={styles.fontcontainerlistitem}>
                      {formatMediaPreco(item, categoriaProd)}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <></>
            )}
            <View style={styles.containerlist}>
              <View style={styles.ListItem}>
                <Text style={styles.fontsubtitulo}>
                  Data da última compra :
                </Text>
                <Text style={styles.fontcontainerlistitem}>
                  {item.createdAt.getDate().toString().padStart(2, 0)}/
                  {(item.createdAt.getMonth() + 1).toString().padStart(2, 0)}/
                  {item.createdAt.getFullYear().toString()}
                </Text>
              </View>
            </View>
            <View style={styles.containerlist}>
              <View
                style={{
                  flex: 1,
                  alignContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <View
                  style={[
                    styles.ListItem,
                    { flex: 1, flexDirection: "column", borderBottomWidth: 0 },
                  ]}
                >
                  <Text style={styles.fontsubtitulo}>Observações:</Text>
                  <Text
                    style={[
                      styles.fontcontainerlistitem,
                      {
                        flex: 1,
                        textAlign: "left",
                      },
                    ]}
                  >
                    {" "}
                    {item.obserProd}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        ) : null}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.containergeral}>
        <View style={styles.containerValor}>
          <View>
            <Text style={styles.font}>
              {shouldShow ? "Valor Produto" : "Valor produtos em estoque"}
            </Text>
            <Text style={styles.fontvalortotal}>{EstoqueValorTotal()}</Text>
          </View>
        </View>

        <View style={styles.containerlista}>
          <View style={styles.relatorioCadastro}>
            <TouchableOpacity
              style={styles.botaorelatorioproduto}
              onPress={() => {
                setShouldShowRelatorio(!shouldShowRelatorio);
                setShouldShowDetalhes(false);
              }}
            >
              <Text style={styles.fontblk}>Relatórios</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaorelatorioproduto}
              onPress={() => {
                setShouldShowDetalhes(!shouldShowDetalhes);
                setShouldShowRelatorio(false);
              }}
            >
              <Text style={styles.fontblk}>Produtos</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containershouldshow}>
            {/* Produtos */}
            {shouldShowDetalhes ? (
              <Animated.View entering={FadeIn} exiting={FadeOut}>
                <FlatList
                  data={listaEstoque}
                  renderItem={renderItemEstoque}
                  keyExtractor={(item) => item._id}
                  numColumns={numcolumns}
                ></FlatList>
              </Animated.View>
            ) : null}
            {/* Relatorio */}
            {shouldShowRelatorio ? (
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                style={styles.containergeral}
              >
                <FlatList
                  data={listaEstoqueEntrada}
                  renderItem={renderItemEntrada}
                  keyExtractor={(item) => item._id}
                ></FlatList>
              </Animated.View>
            ) : null}
          </View>
          <View style={styles.containerButaoestqgeral}>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.font}>{"Voltar"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
export default EstoqueGeral;
