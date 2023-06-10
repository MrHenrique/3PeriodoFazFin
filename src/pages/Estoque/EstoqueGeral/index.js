import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageBackground,
  Alert,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../contexts/auth";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";
import { useMainContext } from "../../../contexts/RealmContext";
import styles from "../styles";
import uuid from "react-native-uuid";
import {
  TextInput,
  MD3Colors,
  IconButton,
  HelperText,
} from "react-native-paper";
import { Colors } from "../../../styles";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { scale } from "react-native-size-matters";
function EstoqueGeral() {
  const realm = useMainContext();

  const navigation = useNavigation();
  //flatlist
  const numcolumns = 2;
  const windowwidth = Dimensions.get("window").width;
  //estados
  const [modalAlert, setModalAlert] = useState(false);
  const [alertMin, setAlertMin] = useState(0);
  const [alertId, setAlertID] = useState("");
  const [isAlertMinValid, setIsAlertMinValid] = useState(true);
  const [listaEstoque, setListaEstoque] = useState([]);
  const [oldListaEstoque, setOldListaEstoque] = useState([]);
  const [filterEstoque, setFilterEstoque] = useState(false);
  const [listaEstoqueEntrada, setListaEstoqueEntrada] = useState([]);
  const { fazID } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [shouldShowDetalhes, setShouldShowDetalhes] = useState(true);
  const [shouldShowDetalhesEntrada, setShouldShowDetalhesEntrada] =
    useState(false);
  const [shouldShowRelatorio, setShouldShowRelatorio] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [itemExport, setItemExport] = useState([{}]);
  const [nome, setNome] = useState();
  const [hora, setHora] = useState(new Date().toLocaleTimeString());
  const [text, setText] = useState(
    new Date().getDate().toString().padStart(2, "0") +
      "/" +
      (new Date().getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      new Date().getFullYear().toString().padStart(2, "0")
  );
  //Funcao, recebe item e retorna nome
  function nameItem(item) {
    const nome = item.nomeProd;
    return nome;
  }
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Relatório do Rebanho</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 3vh;
          background-color: #f1f1f1;
        }
  
        .containerResumo {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          height: 100%;
        }
  
        h1 {
          margin-top: 0px;
          text-align: center;
          font-size: 40px;
        }
  
        table {
          width: 100%;
          border-collapse: collapse;
          border-top: 1px solid #ddd;
        }
  
        th,
        td {
          padding: 14px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
  
        .left {
          text-align: left;
          font-weight: bold;
          font-size: 20px;
        }
  
        .right {
          text-align: right;
          font-weight: normal;
          font-size: 15px;
        }
        .markFazFin {
          font-weight: 200;
          font-size: 13px;
          color: #777777;
        }
        .fazFin {
          margin-top: 20px;
          text-align: center;
          justify-content: center;
        }
      </style>
    </head>
    <body>
      <div class="containerResumo">
        <h1>Relatório de Estoque</h1>
  
        <table>
          <tr>
            <th>Nome do Produto</th>
            <th>Categoria do Produto</th>
            <th>Peso/Volume em estoque</th>
            <th>Valor em estoque</th>
            <th>Média de preço</th>
            <th>Observações</th>
          </tr>
          ${numberOfProducts()}
        </table>
        <div class="fazFin">
          <span class="markFazFin">
            Relatório Gerado por FazFin em ${text} ${hora}
          </span>
        </div>
      </div>
    </body>
  </html>`;
  function numberOfProducts() {
    return itemExport
      .map((item) => {
        return `<tr>
          <th>${item.nomeProd}</th>
          <th>${item.pesoProd > 0 ? "Alimentos" : "Remédios"}</th>
          <th>
            ${
              item.pesoProd > 0 ? item.pesoProd + " KG" : item.volumeProd + " L"
            }
          </th>
          <th>${"R$ " + item.valorProd}</th>
          <th>
            ${
              item.pesoProd > 0
                ? "R$ " + item.valorProd / item.pesoProd
                : "R$ " + item.valorProd / item.volumeProd
            }
          </th>
          <th>${item.obserProd}</th>
        </tr>`;
      })
      .join("");
  }
  function handleAlertMinChange(text) {
    const cleanedText = text.replace(",", ".");
    const parsedValue = parseFloat(cleanedText);
    const isValid = !isNaN(parsedValue) && parsedValue > 0;
    setIsAlertMinValid(isValid);
    setAlertMin(text);
  }
  function validCheck() {
    if (alertMin.length === 0) {
      if (alertMin.length === 0) {
        setIsAlertMinValid(false);
      }
    } else if (isAlertMinValid) {
      createAlert();
      setModalAlert(false);
    }
  }
  let dateGen = () => {
    let tempDate = new Date();
    let fDate =
      tempDate.getDate().toString().padStart(2, "0") +
      "/" +
      (tempDate.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      tempDate.getFullYear().toString().padStart(2, "0");
    setText(fDate);
    setHora(new Date().toLocaleTimeString());
    generatePDF();
  };
  let generatePDF = async () => {
    const file = await printToFileAsync({ html: html, base64: false });
    await shareAsync(file.uri);
  };
  function turnOffAlert(id) {
    if (realm) {
      try {
        realm.write(() => {
          let item = realm.objectForPrimaryKey("AtualEstoqueSchema", id);
          item.alert = [{ _id: uuid.v4(), alertOn: false, alertMin: 0 }];
        });
        setShouldShow(false);
        setFilterEstoque(false);
      } catch (e) {
        Alert.alert("Não foi possível modificar!", e.message);
      }
    }
  }
  function createAlert() {
    if (realm) {
      try {
        realm.write(() => {
          const cleanedText = alertMin.replace(",", ".");
          const alertMinParsed = parseFloat(cleanedText);
          let item = realm.objectForPrimaryKey("AtualEstoqueSchema", alertId);
          item.alert = [
            { _id: uuid.v4(), alertOn: true, alertMin: alertMinParsed },
          ];
        });
        setShouldShow(false);
        setFilterEstoque(false);
      } catch (e) {
        Alert.alert("Não foi possível modificar!", e.message);
      }
    }
  }
  //Chama funcao buscando dados do estoque
  useEffect(() => {
    if (realm) {
      let dataEstoque = realm.objectForPrimaryKey("Farm", fazID);
      setListaEstoque(dataEstoque.atualEstoque.sorted("nomeProd"));
      setItemExport(dataEstoque.atualEstoque.sorted("nomeProd"));
      setListaEstoqueEntrada(dataEstoque.entradaEstoque.sorted("createdAt"));
      dataEstoque.atualEstoque.sorted("nomeProd").addListener((values) => {
        setListaEstoque([...values]);
        setItemExport([...values]);
      });
      dataEstoque.entradaEstoque.sorted("createdAt").addListener((values) => {
        setListaEstoqueEntrada([...values]);
      });
    }
  }, [realm]);

  const handleItemPress = (itemId) => {
    if (itemId === selectedItemId) {
      // Se o itemId for o mesmo do item selecionado atualmente,
      // feche o modal de detalhes
      setSelectedItemId(null);
      setShouldShowDetalhesEntrada(false);
    } else {
      // Se o itemId for diferente do item selecionado atualmente
      // atualize o itemId e abra o modal de detalhes
      setSelectedItemId(itemId);
      setShouldShowDetalhesEntrada(true);
    }
  };

  const formatarResultado = (valorRecebido, tipo) => {
    let formattedResult = "";
    if (tipo == "preco") {
      const result = valorRecebido.toFixed(2);
      formattedResult = `R$ ${result.replace(".", ",")}`;
    } else if (tipo == "litro") {
      const result = valorRecebido.toFixed(2);
      formattedResult = `${result.replace(".", ",")} L`;
    } else if (tipo == "peso") {
      const result = valorRecebido.toFixed(2);
      formattedResult = `${result.replace(".", ",")} Kg`;
    }
    return formattedResult;
  };

  //renderiza flat list com transações de entrada
  const renderItemEntrada = ({ item }) => {
    const categoriaProd = TipoAfter(item);
    const valor = (item.valorProd * item.qtdProd).toFixed(2);
    const formattedValor = `R$ ${valor.replace(".", ",")}`;
    const formattedData = `${
      item.createdAt.getDate().toString().padStart(2, 0) +
      "/" +
      (item.createdAt.getMonth() + 1).toString().padStart(2, 0) +
      "/" +
      item.createdAt.getFullYear().toString()
    }`;
    const isItemSelected = item._id === selectedItemId;
    return (
      <ScrollView>
        <TouchableOpacity
          style={styles.listaDet}
          onPress={() => handleItemPress(item._id)}
        >
          <Text style={styles.font}>
            {item.nomeProd} - {formattedValor}
          </Text>
        </TouchableOpacity>
        {shouldShowDetalhesEntrada && isItemSelected && (
          <View style={[styles.containerDetalhes]}>
            <View>
              <Text style={styles.tituloDetalhes}>Detalhes</Text>
            </View>
            <View style={styles.modalContainerText}>
              <View style={styles.modalContent}>
                <Text style={styles.textContent}>Data: </Text>
                <Text style={styles.textContent}>{formattedData}</Text>
              </View>
              <View style={styles.modalContent}>
                <Text style={styles.textContent}>Horario: </Text>
                <Text style={styles.textContent}>
                  {item.createdAt.toLocaleTimeString()}
                </Text>
              </View>
              <View style={styles.modalContent}>
                <Text style={styles.textContent}>Preço Unitário: </Text>
                <Text style={styles.textContent}>
                  {formatarResultado(item.valorProd, "preco")}
                </Text>
              </View>

              {categoriaProd === "Alimentos" ? (
                <>
                  <View style={styles.modalContent}>
                    <Text style={styles.textContent}>Peso Unitário: </Text>
                    <Text style={styles.textContent}>
                      {formatarResultado(item.pesoProd, "peso")}
                    </Text>
                  </View>
                  <View style={styles.modalContent}>
                    <Text style={styles.textContent}>Quantidade: </Text>
                    <Text style={styles.textContent}>{item.qtdProd}</Text>
                  </View>
                  <View style={styles.modalContent}>
                    <Text style={styles.textContent}>Peso Total: </Text>
                    <Text style={styles.textContent}>
                      {formatarResultado(item.pesoProd * item.qtdProd, "peso")}
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.modalContent}>
                    <Text style={styles.textContent}>Volume Unitário: </Text>
                    <Text style={styles.textContent}>
                      {formatarResultado(item.volumeProd, "litro")}
                    </Text>
                  </View>
                  <View style={styles.modalContent}>
                    <Text style={styles.textContent}>Quantidade: </Text>
                    <Text style={styles.textContent}>{item.qtdProd}</Text>
                  </View>
                  <View style={styles.modalContent}>
                    <Text style={styles.textContent}>Volume Total: </Text>
                    <Text style={styles.textContent}>
                      {formatarResultado(
                        item.volumeProd * item.qtdProd,
                        "litro"
                      )}
                    </Text>
                  </View>
                </>
              )}

              <View style={styles.modalContent}>
                <Text style={styles.textContent}>Valor Total: </Text>
                <Text style={styles.textContent}>
                  {formatarResultado(item.valorProd * item.qtdProd, "preco")}
                </Text>
              </View>
              <Text style={styles.textContent}>
                Descrição: {item.obserProd}
              </Text>
            </View>
          </View>
        )}
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
              <View style={[styles.ListItem]}>
                <Text style={styles.fontsubtitulo}>Categoria do item:</Text>
                <Text style={styles.fontcontainerlistitem}>
                  {categoriaProd}
                </Text>
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
            <Modal
              coverScreen={true}
              backdropColor="black"
              backdropOpacity={0.5}
              visible={modalAlert}
              animationType="slide"
              transparent={true}
              statusBarTranslucent
            >
              <View style={styles.modalContainer}>
                <View style={styles.containergeral}>
                  <View style={styles.containerinfos}>
                    <TextInput
                      label="Quantidade mínima para alerta"
                      style={styles.textInput}
                      placeholderTextColor={Colors.grey}
                      textColor={Colors.black}
                      activeUnderlineColor={Colors.green}
                      underlineColor={Colors.blue}
                      underlineStyle={{ paddingBottom: 3 }}
                      value={alertMin}
                      onChangeText={handleAlertMinChange}
                      keyboardType="decimal-pad"
                      inputMode="decimal"
                      error={!isAlertMinValid}
                    />
                    <HelperText
                      type="error"
                      style={{
                        color: MD3Colors.error60,
                        fontSize: 14,
                        lineHeight: 12,
                      }}
                      visible={!isAlertMinValid}
                      padding="20"
                    >
                      Digite um valor.
                    </HelperText>
                  </View>
                  <View style={styles.modalContainerBotoes}>
                    <TouchableOpacity
                      style={styles.botaopressM}
                      onPress={() => {
                        validCheck();
                      }}
                    >
                      <Text style={styles.textovoltar}>Confirmar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.botaopressM}
                      onPress={() => setModalAlert(false)}
                    >
                      <Text style={styles.textovoltar}>Voltar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
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
              <View style={[styles.ListItem]}>
                <Text style={styles.fontsubtitulo}>Alerta:</Text>
                <Text style={styles.fontcontainerlistitem}>
                  {item.alert[0].alertOn === true ? "Ligado" : "Desligado"}
                </Text>
              </View>
            </View>
            <View style={styles.containerlist}>
              <View style={[styles.ListItem]}>
                {item.alert[0].alertOn === true ? (
                  <TouchableOpacity
                    style={styles.botaorelatorioproduto}
                    onPress={() => {
                      turnOffAlert(item._id);
                    }}
                  >
                    <Text>Desligar Alerta</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.botaorelatorioproduto}
                    onPress={() => {
                      setModalAlert(true);
                      setAlertID(item._id);
                    }}
                  >
                    <Text>Criar Alerta</Text>
                  </TouchableOpacity>
                )}
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
        <Animated.View style={styles.containerValor}>
          <View>
            <Animated.Text style={styles.font}>
              {shouldShow ? "Valor Produto" : "Valor produtos em estoque"}
            </Animated.Text>
            <Text style={styles.fontvalortotal}>{EstoqueValorTotal()}</Text>
          </View>
        </Animated.View>

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
          {shouldShowDetalhes ? (
            <Animated.View
              style={styles.exportContainer}
              entering={FadeIn}
              exiting={FadeOut}
            >
              <TouchableOpacity
                style={styles.botaoExport}
                onPress={() => {
                  dateGen();
                }}
              >
                <Text style={styles.fontblk}>Exportar estoque</Text>
              </TouchableOpacity>
            </Animated.View>
          ) : null}

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
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={styles.font}>{"Voltar"}</Text>
              </View>
              <MaterialIcons name="arrow-back" size={scale(24)} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
export default EstoqueGeral;
