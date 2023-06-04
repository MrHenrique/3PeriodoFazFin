import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  FlatList,
} from "react-native";
import {
  TextInput,
  HelperText,
  MD3Colors,
  RadioButton,
} from "react-native-paper";
import Animated, {
  LightSpeedInLeft,
  LightSpeedOutLeft,
} from "react-native-reanimated";
import { Colors } from "../../../styles";
import EstoqueOptions from "../../../components/Dropdown/EstoqueOptions";
import { useState, useContext, useEffect } from "react";
import uuid from "react-native-uuid";
import { AuthContext } from "../../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import { CheckBox, Icon } from "react-native-elements";
import { useMainContext } from "../../../contexts/RealmContext";
import styles from "./styles";
import Modal from "react-native-modal";

export default function SaidaEstoque() {
  const realm = useMainContext();
  const navigation = useNavigation();
  const [checked, setChecked] = React.useState("rebanho");
  const [qtdProd, setQtdProd] = useState("");
  const [obserProd, setObserProd] = useState("");
  const [listaEstoque, setListaEstoque] = useState([]);
  const [shouldShow, setShouldShow] = useState(false);
  const [newListaEstoque, setNewListaEstoque] = useState([]);
  const [idSelected, setIdSelected] = useState("");
  const [tipo, setTipo] = useState(1);
  const [listaVaca, setListaVaca] = useState([]);
  const [lista, setLista] = useState(listaVaca);
  const [searchText, setSearchText] = useState("");
  const [qtdValid, setQtdValid] = useState(true);
  const [vacaID, setVacaID] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [qtdPreenchida, setQtdPreenchida] = useState(true);
  // listener teclado
  const [keyboardStatus, setkeyboardStatus] = useState(false);

  const { fazID, rebID, idEstoqueSaida, TipoEstoqueSaida, IdEstoqueSaida } =
    useContext(AuthContext);
  const renderItem = ({ item }) => {
    return (
      <View style={styles.modalContainer2}>
        <TouchableOpacity
          onPress={function ReturnID() {
            const VacaID = item._id;
            setVacaID(VacaID);
            toggleModal();
          }}
          style={[
            styles.cardVacas,
            {
              backgroundColor:
                item.brincoVaca % 2 === 0 ? "#0F6D00" : "#004513",
            },
          ]}
        >
          <Text style={styles.tituloBotao}>
            Nome: {item.nomeVaca} - Brinco: {item.brincoVaca}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  useEffect(() => {
    if (searchText === "") {
      setLista(listaVaca);
    } else {
      setLista(
        listaVaca.filter(
          (item) =>
            item.nomeVaca.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [searchText]);
  function toggleModal() {
    setModalVisible(!isModalVisible);
    setSearchText("");
    setLista(listaVaca);
  }
  useEffect(() => {
    if (realm) {
      let dataVaca = realm.objectForPrimaryKey("RebanhoSchema", rebID);
      setListaVaca(dataVaca.vacas.sorted("nomeVaca"));
      dataVaca.vacas.sorted("nomeVaca").addListener((values) => {
        setListaVaca([...values]);
      });
    }
  }, [realm]);
  const handleFilterNome = () => {
    let newList = [...lista];
    newList.sort((a, b) =>
      a.nomeVaca > b.nomeVaca ? 1 : b.nomeVaca > a.nomeVaca ? -1 : 0
    );
    setLista(newList);
  };
  //Buscar no banco estoque
  useEffect(() => {
    if (realm) {
      let dataEstoque = realm.objectForPrimaryKey("Farm", fazID);
      setListaEstoque(dataEstoque.atualEstoque.sorted("nomeProd"));
      dataEstoque.atualEstoque.sorted("nomeProd").addListener((values) => {
        setListaEstoque([...values]);
      });
    }
  }, [realm]);
  useEffect(() => {
    setIdSelected(idEstoqueSaida);
  }, [idEstoqueSaida]);
  //chama funcao de filtrar estoque caso estado filterestoque mude
  useEffect(() => {
    FilterEstoqueData(idSelected);
  }, [idSelected]);

  useEffect(() => {
    setShouldShow(false);
    TipoEstoqueSaida(tipo);
  }, [tipo]);

  //Validacoes
  function handleQtdChange(text) {
    const cleanedText = text.replace(",", ".");
    const parsedValue = parseFloat(cleanedText);
    setQtdProd(parsedValue);
    checkQtd(parsedValue, cleanedText);
    if (cleanedText.length > 0) {
      setQtdPreenchida(true);
    }
  }
  function validCheck() {
    if (qtdProd.length === 0) {
      setQtdPreenchida(false);
    } else if (qtdPreenchida && qtdValid) {
      handleAddGastos();
    }
  }
  const checkQtd = (parsedValue, cleanedText) => {
    if (cleanedText.length > 0) {
      if (tipo === 1) {
        if (newListaEstoque[0].volumeProd >= parsedValue && parsedValue > 0) {
          setQtdValid(true);
        } else {
          setQtdValid(false);
        }
      } else {
        if (newListaEstoque[0].pesoProd >= parsedValue && parsedValue > 0) {
          setQtdValid(true);
        } else {
          setQtdValid(false);
        }
      }
    }
  };
  //funcao filtrar estoque
  const FilterEstoqueData = () => {
    if (idEstoqueSaida != undefined && idEstoqueSaida != "") {
      setShouldShow(true);
      setNewListaEstoque(
        listaEstoque.filter((estoque) => estoque._id === idEstoqueSaida)
      );
    } else {
      setShouldShow(false);
    }
  };

  async function handleAddGastos() {
    if (realm) {
      if (checked === "rebanho") {
        let id = uuid.v4();
        if (tipo === 1) {
          const volumeProdFinal =
            newListaEstoque[0].volumeProd - Number(qtdProd);
          const valorProdFinal =
            (newListaEstoque[0].valorProd / newListaEstoque[0].volumeProd) *
            volumeProdFinal;
          const valorMedioTransacao =
            (newListaEstoque[0].valorProd / newListaEstoque[0].volumeProd) *
            Number(qtdProd);
          try {
            realm.write(() => {
              let updateEstoque = realm
                .objects("AtualEstoqueSchema")
                .filtered(`_id= '${idEstoqueSaida}'`)[0];
              updateEstoque.obserProd = obserProd;
              updateEstoque.createdAt = new Date();
              updateEstoque.valorProd = valorProdFinal;
              updateEstoque.volumeProd = volumeProdFinal;

              let reb = realm.objectForPrimaryKey("RebanhoSchema", rebID);
              let createdGastosReb = realm.create("DespesaRebSchema", {
                _id: id,
                createdAt: new Date(),
                nomeProd: newListaEstoque[0].nomeProd,
                valorProd: valorMedioTransacao,
                qtdProd: 1,
                obserProd: obserProd,
                pesoProd: 0,
                volumeProd: Number(qtdProd),
              });
              reb.despesas.push(createdGastosReb);
              let nVacas = reb.vacas.length;
              reb.vacas.forEach((vaca) => {
                let createdGastos = realm.create("DespesasSchema", {
                  _id: uuid.v4(),
                  idTransacao: id,
                  createdAt: new Date(),
                  nomeProd: newListaEstoque[0].nomeProd,
                  valorProd: valorMedioTransacao / nVacas,
                  qtdProd: 1,
                  obserProd: obserProd,
                  pesoProd: 0,
                  volumeProd: Number(qtdProd),
                });
                vaca.despesas.push(createdGastos);
              });
              Alert.alert("Dados cadastrados com sucesso!");
            });
          } catch (e) {
            Alert.alert("Não foi possível cadastrar.");
          } finally {
            setObserProd("");
            setQtdProd("");
            IdEstoqueSaida("");
          }
        }
        if (tipo === 2) {
          const pesoProdFinal = newListaEstoque[0].pesoProd - Number(qtdProd);
          const valorProdFinal =
            (newListaEstoque[0].valorProd / newListaEstoque[0].pesoProd) *
            pesoProdFinal;
          const valorMedioTransacao =
            (newListaEstoque[0].valorProd / newListaEstoque[0].pesoProd) *
            Number(qtdProd);
          try {
            realm.write(() => {
              let updateEstoque = realm
                .objects("AtualEstoqueSchema")
                .filtered(`_id= '${idEstoqueSaida}'`)[0];
              updateEstoque.obserProd = obserProd;
              updateEstoque.createdAt = new Date();
              updateEstoque.valorProd = valorProdFinal;
              updateEstoque.pesoProd = pesoProdFinal;
              let reb = realm.objectForPrimaryKey("RebanhoSchema", rebID);
              let createdGastos = realm.create("DespesaRebSchema", {
                _id: id,
                createdAt: new Date(),
                nomeProd: newListaEstoque[0].nomeProd,
                valorProd: valorMedioTransacao,
                qtdProd: 1,
                obserProd: obserProd,
                pesoProd: Number(qtdProd),
                volumeProd: 0,
              });
              reb.despesas.push(createdGastos);
              let nVacas = reb.vacas.length;
              reb.vacas.forEach((vaca) => {
                let createdGastos = realm.create("DespesasSchema", {
                  _id: uuid.v4(),
                  idTransacao: id,
                  createdAt: new Date(),
                  nomeProd: newListaEstoque[0].nomeProd,
                  valorProd: valorMedioTransacao / nVacas,
                  qtdProd: 1,
                  obserProd: obserProd,
                  pesoProd: Number(qtdProd),
                  volumeProd: 0,
                });
                vaca.despesas.push(createdGastos);
              });
              Alert.alert("Dados cadastrados com sucesso!");
            });
          } catch (e) {
            Alert.alert("Não foi possível cadastrar.");
          } finally {
            setObserProd("");
            setQtdProd("");
            IdEstoqueSaida("");
          }
        }
      }
      if (checked === "vacas") {
        if (tipo === 1) {
          const volumeProdFinal =
            newListaEstoque[0].volumeProd - Number(qtdProd);
          const valorProdFinal =
            (newListaEstoque[0].valorProd / newListaEstoque[0].volumeProd) *
            volumeProdFinal;
          const valorMedioTransacao =
            (newListaEstoque[0].valorProd / newListaEstoque[0].volumeProd) *
            Number(qtdProd);
          try {
            let id = uuid.v4();
            realm.write(() => {
              let updateEstoque = realm
                .objects("AtualEstoqueSchema")
                .filtered(`_id= '${idEstoqueSaida}'`)[0];
              updateEstoque.obserProd = obserProd;
              updateEstoque.createdAt = new Date();
              updateEstoque.valorProd = valorProdFinal;
              updateEstoque.volumeProd = volumeProdFinal;

              let reb = realm.objectForPrimaryKey("RebanhoSchema", rebID);
              let createdGastosReb = realm.create("DespesaRebSchema", {
                _id: id,
                createdAt: new Date(),
                nomeProd: newListaEstoque[0].nomeProd,
                valorProd: valorMedioTransacao,
                qtdProd: 1,
                obserProd: obserProd,
                pesoProd: 0,
                volumeProd: Number(qtdProd),
              });
              reb.despesas.push(createdGastosReb);
              let Vacas = realm.objectForPrimaryKey("VacasSchema", vacaID);
              let createdGastos = realm.create("DespesasSchema", {
                _id: uuid.v4(),
                idTransacao: id,
                createdAt: new Date(),
                nomeProd: newListaEstoque[0].nomeProd,
                valorProd: valorMedioTransacao,
                qtdProd: 1,
                obserProd: obserProd,
                pesoProd: 0,
                volumeProd: Number(qtdProd),
              });
              Vacas.despesas.push(createdGastos);
              Alert.alert("Dados cadastrados com sucesso!");
            });
          } catch (e) {
            Alert.alert("Não foi possível cadastrar.");
          } finally {
            setObserProd("");
            setQtdProd("");
            IdEstoqueSaida("");
          }
        }
        if (tipo === 2) {
          const pesoProdFinal = newListaEstoque[0].pesoProd - Number(qtdProd);
          const valorProdFinal =
            (newListaEstoque[0].valorProd / newListaEstoque[0].pesoProd) *
            pesoProdFinal;
          const valorMedioTransacao =
            (newListaEstoque[0].valorProd / newListaEstoque[0].pesoProd) *
            Number(qtdProd);
          try {
            realm.write(() => {
              let updateEstoque = realm
                .objects("AtualEstoqueSchema")
                .filtered(`_id= '${idEstoqueSaida}'`)[0];
              updateEstoque.obserProd = obserProd;
              updateEstoque.createdAt = new Date();
              updateEstoque.valorProd = valorProdFinal;
              updateEstoque.pesoProd = pesoProdFinal;
              let reb = realm.objectForPrimaryKey("RebanhoSchema", rebID);
              let createdGastosReb = realm.create("DespesaRebSchema", {
                _id: uuid.v4(),
                createdAt: new Date(),
                nomeProd: newListaEstoque[0].nomeProd,
                valorProd: valorMedioTransacao,
                qtdProd: 1,
                obserProd: obserProd,
                pesoProd: Number(qtdProd),
                volumeProd: 0,
              });
              reb.despesas.push(createdGastosReb);
              let Vacas = realm.objectForPrimaryKey("VacasSchema", vacaID);
              let createdGastos = realm.create("DespesasSchema", {
                _id: uuid.v4(),
                idTransacao: id,
                createdAt: new Date(),
                nomeProd: newListaEstoque[0].nomeProd,
                valorProd: valorMedioTransacao,
                qtdProd: 1,
                obserProd: obserProd,
                pesoProd: Number(qtdProd),
                volumeProd: 0,
              });
              Vacas.despesas.push(createdGastos);
              Alert.alert("Dados cadastrados com sucesso!");
            });
          } catch (e) {
            Alert.alert("Não foi possível cadastrar.");
          } finally {
            setObserProd("");
            setQtdProd("");
            IdEstoqueSaida("");
          }
        }
      }
    }
  }
  function averagePrice() {
    if (newListaEstoque[0].volumeProd > 0 || newListaEstoque[0].pesoProd > 0) {
      if (newListaEstoque[0].volumeProd > 0) {
        const valor = (
          newListaEstoque[0].valorProd / newListaEstoque[0].volumeProd
        ).toFixed(2);
        const formattedValor = `R$ ${valor.replace(".", ",")}`;
        return formattedValor;
      } else {
        const valor = (
          newListaEstoque[0].valorProd / newListaEstoque[0].pesoProd
        ).toFixed(2);
        const formattedValor = `R$ ${valor.replace(".", ",")}`;
        return formattedValor;
      }
    } else {
      return "-";
    }
  }
  // LISTENER DO TECLADO(ATIVADO OU NAO)
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setkeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setkeyboardStatus(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  // RETORNA O ESTILO PARA O BOTAO, decidindo qual estilo, dependendo se o teclado esta ativo ou nao
  function StyleFuncKeyboard() {
    if (keyboardStatus) {
      return styles.containerbutaoKeyboardOn;
    } else {
      return styles.containerbutao;
    }
  }
  function StyleScrollViewContainer() {
    if (keyboardStatus) {
      return [styles.ContainerScrollStyle];
    } else {
      return [styles.ContainerScrollStyle];
    }
  }
  return (
    <KeyboardAvoidingView behavior="undefined" style={styles.containerkeyboard}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../../assets/fazfinwhiteletter.png")}
          resizeMode="repeat"
          imageStyle={{ opacity: 0.02 }}
          style={styles.containergeral}
        >
          <ScrollView
            style={styles.scrollcontainer}
            contentContainerStyle={StyleScrollViewContainer()}
          >
            {/* CheckBox */}
            <View style={styles.checkbox}>
              <CheckBox
                title="Remédios"
                checked={tipo === 1}
                containerStyle={styles.containerCheckBox}
                textStyle={styles.textCheckBox}
                uncheckedIcon={
                  <Icon
                    type="ionicon"
                    name="md-square-outline"
                    color={"#fff"}
                  />
                }
                checkedIcon={
                  <Icon
                    type="ionicon"
                    name="md-checkbox-outline"
                    color={"#fff"}
                  />
                }
                onPress={() => {
                  setTipo(1);
                  IdEstoqueSaida("");
                }}
              />
              <CheckBox
                title="Alimento"
                checked={tipo === 2}
                containerStyle={styles.containerCheckBox}
                textStyle={styles.textCheckBox}
                uncheckedIcon={
                  <Icon
                    type="ionicon"
                    name="md-square-outline"
                    color={"#fff"}
                  />
                }
                checkedIcon={
                  <Icon
                    type="ionicon"
                    name="md-checkbox-outline"
                    color={"#fff"}
                  />
                }
                onPress={() => {
                  setTipo(2);
                  IdEstoqueSaida("");
                }}
              />
            </View>
            {/* DropDown */}
            <View style={styles.dropdownContainer}>
              <EstoqueOptions />
            </View>
            {/* Cadastro de produtos */}
            <View style={styles.containerGeralCadastro}>
              {/* Visao do produto, preco medio e quantidade */}
              {shouldShow ? (
                <>
                  <Animated.View
                    entering={LightSpeedInLeft.delay(10)}
                    style={styles.containerProduto}
                  >
                    {newListaEstoque.length > 0 &&
                    (newListaEstoque[0].volumeProd >= 0 ||
                      newListaEstoque[0].pesoProd >= 0) ? (
                      <>
                        {newListaEstoque[0].volumeProd >= 0 ? (
                          <View style={styles.ctnProduto}>
                            <Text style={styles.textTitulo}>Produto</Text>
                            <View style={styles.ctntextos}>
                              <Text style={styles.txtProdTitulo}>
                                Preço Médio por litro:
                              </Text>
                              <Text style={styles.txtQtdPreco}>
                                {averagePrice()}
                              </Text>
                            </View>
                            <View style={styles.ctntextos}>
                              <Text style={styles.txtProdTitulo}>
                                Volume em Estoque:
                              </Text>
                              <Text style={styles.txtQtdPreco}>
                                {newListaEstoque[0].volumeProd.toFixed(2)}
                                {" l"}
                              </Text>
                            </View>
                          </View>
                        ) : (
                          <View style={styles.ctnProduto}>
                            <Text style={styles.textTitulo}>Produto</Text>
                            <View style={styles.ctntextos}>
                              <Text style={styles.txtProdTitulo}>
                                Preço Médio por KG:
                              </Text>
                              <Text style={styles.txtQtdPreco}>
                                {averagePrice()}
                              </Text>
                            </View>
                            <View style={styles.ctntextos}>
                              <Text style={styles.txtProdTitulo}>
                                Peso em Estoque:
                              </Text>
                              <Text style={styles.txtQtdPreco}>
                                {newListaEstoque[0].pesoProd.toFixed(2)}
                                {" kg"}
                              </Text>
                            </View>
                          </View>
                        )}
                      </>
                    ) : null}
                  </Animated.View>

                  {/* cadastro */}
                  <Animated.View
                    entering={LightSpeedInLeft.delay(100)}
                    style={styles.cadastroDespesas}
                  >
                    <View style={styles.containerTxtInputDespesas}>
                      <TextInput
                        label={"Quantidade utilizada"}
                        style={styles.txtInput}
                        placeholderTextColor={Colors.grey}
                        textColor={Colors.black}
                        activeUnderlineColor={Colors.green}
                        underlineColor={Colors.blue}
                        underlineStyle={{ paddingBottom: 3 }}
                        value={qtdProd}
                        onChangeText={handleQtdChange}
                        keyboardType="decimal-pad"
                        inputMode="decimal"
                        error={!qtdValid}
                      />
                      <HelperText
                        type="error"
                        style={{
                          color: MD3Colors.error60,
                          fontSize: 14,
                          lineHeight: 15,
                        }}
                        visible={!qtdValid || !qtdPreenchida}
                        padding="20"
                      >
                        {!qtdValid
                          ? "Valor inválido."
                          : "Preencha o campo quantidade."}
                      </HelperText>
                    </View>
                    <View style={styles.containerTxtInputDespesas}>
                      <TextInput
                        label="Observação"
                        style={styles.txtInput}
                        placeholderTextColor={Colors.grey}
                        textColor={Colors.black}
                        activeUnderlineColor={Colors.green}
                        underlineColor={Colors.blue}
                        underlineStyle={{ paddingBottom: 3 }}
                        value={obserProd}
                        onChangeText={setObserProd}
                        placeholder="Observação sobre produto"
                      />
                      <HelperText />
                    </View>
                  </Animated.View>
                </>
              ) : null}
            </View>

            <View style={styles.radioBView}>
              <RadioButton
                value="rebanho"
                status={checked === "rebanho" ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked("rebanho"), setVacaID("");
                }}
              />
              <Text>Cadastro por Rebanho</Text>
              <RadioButton
                value="vacas"
                status={checked === "vacas" ? "checked" : "unchecked"}
                onPress={() => setChecked("vacas")}
              />
              <Text>Cadastro individual</Text>
            </View>
            {checked === "vacas" ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    toggleModal(), setVacaID("");
                  }}
                  style={styles.botaoselecionaranimal}
                >
                  <Text style={styles.tituloBotao}>Selecionar animal</Text>
                  <Modal
                    isVisible={isModalVisible}
                    coverScreen={true}
                    backdropColor={"rgba(234,242,215,0.8)"}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                  >
                    <View style={styles.modalContainer}>
                      <Text style={styles.TituloM}>Selecione um animal</Text>
                      <TouchableOpacity
                        style={styles.filtroNome}
                        onPress={handleFilterNome}
                      >
                        <Text style={styles.tituloBotao}>Filtrar por nome</Text>
                      </TouchableOpacity>
                      <TextInput
                        style={styles.search}
                        placeholder="Pesquise pelo nome."
                        value={searchText}
                        onChangeText={(t) => setSearchText(t)}
                      ></TextInput>
                      <FlatList
                        style={styles.scroll}
                        data={lista}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id}
                      />
                    </View>
                    <TouchableOpacity
                      style={styles.botaopressM}
                      onPress={() => {
                        toggleModal();
                      }}
                    >
                      <Text style={styles.tituloBotao}>{"Voltar"}</Text>
                    </TouchableOpacity>
                  </Modal>
                </TouchableOpacity>
              </>
            ) : null}
          </ScrollView>
          <View style={StyleFuncKeyboard()}>
            <TouchableOpacity onPress={validCheck} style={styles.botao}>
              <Text style={styles.txtBotao}>{"Cadastrar"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botao}
              onPress={() => {
                navigation.navigate("Home");
                IdEstoqueSaida("");
              }}
            >
              <Text style={styles.txtBotao}>{"Voltar"}</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
}
