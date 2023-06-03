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
} from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { Colors } from "../../../styles";
import EstoqueOptions from "../../../components/Dropdown/EstoqueOptions";
import { useState, useContext, useEffect } from "react";
import uuid from "react-native-uuid";
import { AuthContext } from "../../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import { CheckBox, Icon } from "react-native-elements";
import { useMainContext } from "../../../contexts/RealmContext";
import styles from "./styles";

export default function SaidaEstoque() {
  const realm = useMainContext();
  const navigation = useNavigation();
  const [qtdProd, setQtdProd] = useState("");
  const [obserProd, setObserProd] = useState("");
  const [listaEstoque, setListaEstoque] = useState([]);
  const [shouldShow, setShouldShow] = useState(false);
  const [newListaEstoque, setNewListaEstoque] = useState([]);
  const [idSelected, setIdSelected] = useState("");
  const [tipo, setTipo] = useState(1);
  // listener teclado
  const [keyboardStatus, setkeyboardStatus] = useState(false);

  const { fazID, rebID, idEstoqueSaida, TipoEstoqueSaida, IdEstoqueSaida } =
    useContext(AuthContext);

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
  //funcao filtrar estoque
  const FilterEstoqueData = () => {
    console.log(idEstoqueSaida);
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
      if (tipo === 1) {
        const volumeProdFinal = newListaEstoque[0].volumeProd - Number(qtdProd);
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
            let createdGastos = realm.create("DespesasSchema", {
              _id: uuid.v4(),
              createdAt: new Date(),
              nomeProd: newListaEstoque[0].nomeProd,
              valorProd: valorMedioTransacao,
              qtdProd: 1,
              obserProd: obserProd,
              pesoProd: 0,
              volumeProd: Number(qtdProd),
            });
            reb.despesas.push(createdGastos);
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
            let createdGastos = realm.create("DespesasSchema", {
              _id: uuid.v4(),
              createdAt: new Date(),
              nomeProd: newListaEstoque[0].nomeProd,
              valorProd: valorMedioTransacao,
              qtdProd: 1,
              obserProd: obserProd,
              pesoProd: Number(qtdProd),
              volumeProd: 0,
            });
            reb.despesas.push(createdGastos);
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
      return [styles.ContainerScrollStyle,];
    } else {
      return [styles.ContainerScrollStyle,];
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
                <View style={styles.containerProduto}>
                  {newListaEstoque.length > 0 &&
                  (newListaEstoque[0].volumeProd >= 0 ||
                    newListaEstoque[0].pesoProd >= 0) ? (
                    <>
                      {newListaEstoque[0].volumeProd >= 0 ? (
                        <View style={styles.ctnProduto}>
                          <Text style={styles.textTitulo}>Produto</Text>
                          <View style={styles.ctntextos}>
                            <Text style={styles.txtProdTitulo}>
                              Preço Médio por ml:
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
                              {newListaEstoque[0].volumeProd}
                              {" ml"}
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
                              {newListaEstoque[0].pesoProd}
                              {" KG"}
                            </Text>
                          </View>
                        </View>
                      )}
                    </>
                  ) : null}
                </View>
              ) : null}
              {/* cadastro */}
              <View style={styles.cadastroDespesas}>
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
                    onChangeText={setQtdProd}
                    keyboardType="decimal-pad"
                    inputMode="decimal"
                    placeholder="50"
                  />
                  <HelperText></HelperText>
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
                  <HelperText></HelperText>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={StyleFuncKeyboard()}>
            <TouchableOpacity onPress={handleAddGastos} style={styles.botao}>
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
