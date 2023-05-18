import React, { useState, useContext, useEffect } from "react";
import {
  Keyboard,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DropdownComponent from "../../../components/Dropdown/TipoProd";
import uuid from "react-native-uuid";
import { AuthContext } from "../../../contexts/auth";
import { useMainContext } from "../../../contexts/RealmContext";
import styles from "../styles";

function EntradaEstoque() {
  const realm = useMainContext();
  const navigation = useNavigation();
  //estados
  const [listaEstoqueFiltered, setListaEstoqueFiltered] = useState([]);
  const [nomeProd, setNomeProd] = useState("");
  const [valorProd, setValorProd] = useState("");
  const [volumeProd, setVolumeProd] = useState("");
  const [pesoProd, setPesoProd] = useState("");
  const [obserProd, setObserProd] = useState("");
  const [qtdProd, setQtdProd] = useState("1");
  const [isNomeProdValid, setIsNomeProdValid] = useState(true);
  const [isValorProdValid, setIsValorProdValid] = useState(true);
  const [isVolumeProdValid, setIsVolumeProdValid] = useState(true);
  const [isPesoProdValid, setIsPesoProdValid] = useState(true);
  const [isQtdProdValid, setIsQtdProdValid] = useState(true);
  const { fazID, tipoProd } = useContext(AuthContext);
  //status teclado
  const [keyboardStatus, setkeyboardStatus] = useState(false);

  function handleNomeProdChange(text) {
    const isValid = text.trim().length > 0;
    setIsNomeProdValid(isValid);
    setNomeProd(text);
  }

  function handleValorProdChange(text) {
    const cleanedText = text.replace(",", ".");
    const parsedValue = parseFloat(cleanedText);

    const isValid = !isNaN(parsedValue) && parsedValue > 0;
    setIsValorProdValid(isValid);
    setValorProd(parsedValue);
  }

  function handleVolumeProdChange(text) {
    const cleanedText = text.replace(",", ".");
    const parsedValue = parseFloat(cleanedText);

    const isValid = !isNaN(parsedValue) && parsedValue > 0;
    setIsVolumeProdValid(isValid);
    setVolumeProd(parsedValue);
  }

  function handlePesoProdChange(text) {
    const cleanedText = text.replace(",", ".");
    const parsedValue = parseFloat(cleanedText);

    const isValid = !isNaN(parsedValue) && parsedValue > 0;
    setIsPesoProdValid(isValid);
    setPesoProd(parsedValue);
  }

  function handleQtdProdChange(text) {
    const parsedValue = parseInt(text, 10);
    const isValid =
      text.trim().length > 0 &&
      Number.isInteger(parsedValue) &&
      parsedValue > 0 &&
      parsedValue.toString() === text.trim();
    setIsQtdProdValid(isValid);
    setQtdProd(parsedValue);
  }
  function validCheck() {
    if (nomeProd.length === 0) {
      setIsNomeProdValid(false);
      if (valorProd.length === 0) {
        setIsValorProdValid(false);
      }
      if (volumeProd.length === 0 && tipoProd === 1) {
        setIsVolumeProdValid(false);
      }
      if (pesoProd.length === 0 && tipoProd === 2) {
        setIsPesoProdValid(false);
      }
      if (qtdProd <= 0) {
        setIsQtdProdValid(false);
      }
    } else if (
      isNomeProdValid &&
      isValorProdValid &&
      isVolumeProdValid &&
      isPesoProdValid &&
      isQtdProdValid
    ) {
      handleAddEstoque();
    } else {
      Alert.alert("Preencha todos os campos e tente novamente.");
    }
  }

  //Gravar dados em Estoque principal
  async function handleAddEstoque() {
    let qtdProdN = parseInt(qtdProd);
    let pesoProdNull = -1;
    let volumeProdNull = -1;
    //checar se produto já existe
    if (listaEstoqueFiltered.length === 0) {
      //se não existe checar se cadastro é relacionado a tipo 1 ou 2 (farmácia/alimentos)
      if (tipoProd == 1) {
        if (realm) {
          try {
            realm.write(() => {
              let farm = realm.objectForPrimaryKey("Farm", fazID);
              let createdEstoque = realm.create("AtualEstoqueSchema", {
                nomeProd: nomeProd,
                _id: uuid.v4(),
                valorProd,
                qtdProd: qtdProdN,
                pesoProd: pesoProdNull,
                volumeProd,
                obserProd,
                createdAt: new Date(),
              });
              let createdEstoqueEntrada = realm.create("EstoqueEntradaSchema", {
                nomeProd: nomeProd,
                _id: uuid.v4(),
                valorProd,
                qtdProd: qtdProdN,
                pesoProd: pesoProdNull,
                volumeProd,
                obserProd,
                createdAt: new Date(),
              });
              farm.entradaEstoque.push(createdEstoqueEntrada);
              farm.atualEstoque.push(createdEstoque);
              Alert.alert("Dados cadastrados com sucesso!");
            });
          } catch (e) {
            Alert.alert("Não foi possível cadastrar!", e.message);
          } finally {
            resetStates();
          }
        }
      } else if (tipoProd == 2) {
        if (realm) {
          try {
            realm.write(() => {
              let farm = realm.objectForPrimaryKey("Farm", fazID);
              let createdEstoque = realm.create("AtualEstoqueSchema", {
                nomeProd: nomeProd,
                _id: uuid.v4(),
                valorProd,
                qtdProd: qtdProdN,
                pesoProd,
                volumeProd: volumeProdNull,
                obserProd,
                createdAt: new Date(),
              });
              let createdEstoqueEntrada = realm.create("EstoqueEntradaSchema", {
                nomeProd: nomeProd,
                _id: uuid.v4(),
                valorProd,
                qtdProd: qtdProdN,
                pesoProd,
                volumeProd: volumeProdNull,
                obserProd,
                createdAt: new Date(),
              });
              farm.entradaEstoque.push(createdEstoqueEntrada);
              farm.atualEstoque.push(createdEstoque);
              Alert.alert("Dados cadastrados com sucesso!");
            });
          } catch (e) {
            Alert.alert("Não foi possível cadastrar!", e.message);
          } finally {
            resetStates();
          }
        }
      }
    }
    //se produto existe
    else {
      if (tipoProd == 1 && listaEstoqueFiltered[0].volumeProd >= 0) {
        let valorProdF = valorProd + listaEstoqueFiltered[0].valorProd;
        let volumeProdF = volumeProd + listaEstoqueFiltered[0].volumeProd;
        let qtdProdF = qtdProdN + listaEstoqueFiltered[0].qtdProd;
        if (realm) {
          try {
            realm.write(() => {
              let updateEstoque = realm
                .objects("AtualEstoqueSchema")
                .filtered(`_id= '${listaEstoqueFiltered[0]._id}'`)[0];
              updateEstoque.valorProd = valorProdF;
              updateEstoque.pesoProd = pesoProdNull;
              updateEstoque.volumeProd = volumeProdF;
              updateEstoque.qtdProd = qtdProdF;
              updateEstoque.obserProd = obserProd;
              updateEstoque.createdAt = new Date();

              let farm = realm.objectForPrimaryKey("Farm", fazID);
              let createdEstoqueEntrada = realm.create("EstoqueEntradaSchema", {
                nomeProd: nomeProd,
                _id: uuid.v4(),
                valorProd,
                qtdProd: qtdProdN,
                pesoProd: pesoProdNull,
                volumeProd,
                obserProd,
                createdAt: new Date(),
              });
              farm.entradaEstoque.push(createdEstoqueEntrada);
              Alert.alert("Dados cadastrados com sucesso!");
            });
          } catch (e) {
            Alert.alert("Não foi possível cadastrar.", e.message);
          } finally {
            resetStates();
          }
        }
      } else if (tipoProd == 2 && listaEstoqueFiltered[0].pesoProd >= 0) {
        let valorProdF = valorProd + listaEstoqueFiltered[0].valorProd;
        let pesoProdF = pesoProd + listaEstoqueFiltered[0].pesoProd;
        let qtdProdF = qtdProdN + listaEstoqueFiltered[0].qtdProd;
        if (realm) {
          try {
            realm.write(() => {
              let updateEstoque = realm
                .objects("AtualEstoqueSchema")
                .filtered(`_id= '${listaEstoqueFiltered[0]._id}'`)[0];
              updateEstoque.valorProd = valorProdF;
              updateEstoque.pesoProd = pesoProdF;
              updateEstoque.volumeProd = volumeProdNull;
              updateEstoque.qtdProd = qtdProdF;
              updateEstoque.obserProd = obserProd;
              updateEstoque.createdAt = new Date();

              let farm = realm.objectForPrimaryKey("Farm", fazID);
              let createdEstoqueEntrada = realm.create("EstoqueEntradaSchema", {
                nomeProd: nomeProd,
                _id: uuid.v4(),
                valorProd,
                qtdProd: qtdProdN,
                pesoProd,
                volumeProd: volumeProdNull,
                obserProd,
                createdAt: new Date(),
              });
              farm.entradaEstoque.push(createdEstoqueEntrada);
              Alert.alert("Dados cadastrados com sucesso!");
            });
          } catch (e) {
            Alert.alert("Não foi possível cadastrar.", e.message);
          } finally {
            resetStates();
          }
        }
      } else {
        Alert.alert(
          "Produto com mesmo nome encontrado em outra categoria, cadastro sem sucesso."
        );
        resetStates();
      }
    }
  }
  //reset estados
  const resetStates = () => {
    setNomeProd("");
    setValorProd("");
    setVolumeProd("");
    setPesoProd("");
    setObserProd("");
    setQtdProd("1");
  };
  //botões de + e -
  //mais
  const maisButton = () => {
    setQtdProd((parseInt(qtdProd) + 1).toString());
    if (qtdProd >= 0) {
      setIsQtdProdValid(true);
    }
  };
  //menos
  const menosButton = () => {
    if (qtdProd >= 2) {
      setQtdProd((parseInt(qtdProd) - 1).toString());
    }
  };
  //Buscar no banco filtrando por nome
  async function fetchDataEstoqueFiltered(realm, fazID) {
    let dataEstoque = realm.objectForPrimaryKey("Farm", fazID);
    let filteredEstoque = dataEstoque.atualEstoque.filter(
      (produto) => produto.nomeProd === nomeProd
    );
    setListaEstoqueFiltered(filteredEstoque);
    dataEstoque.atualEstoque.addListener((values) => {
      let filteredValues = values.filter(
        (produto) => produto.nomeProd === nomeProd
      );
      setListaEstoqueFiltered(filteredValues);
    });
  }
  useEffect(() => {
    if (realm) {
      fetchDataEstoqueFiltered(realm, fazID);
    }
  }, [realm, nomeProd]);
  //Checar tipo de input farmacia/alimentos e deixar visivel somente o campo relacionado (volume/peso)
  const TextInputTipo = () => {
    if (tipoProd == 1) {
      return (
        <View style={styles.containerInput}>
          <Text style={styles.font}>Volume do produto:</Text>
          <TextInput
            style={
              !isVolumeProdValid ? styles.textInputError : styles.textInput
            }
            value={volumeProd}
            onChangeText={handleVolumeProdChange}
            placeholder="200"
            keyboardType="decimal-pad"
            inputMode="decimal"
          />
          <View>
            {!isVolumeProdValid && (
              <Text style={styles.error}>
                Valor digitado inválido, tente novamente.
              </Text>
            )}
          </View>
        </View>
      );
    }
    return (
      <View style={styles.containerInput}>
        <Text style={styles.font}>Peso do produto:</Text>
        <TextInput
          style={!isPesoProdValid ? styles.textInputError : styles.textInput}
          value={pesoProd}
          onChangeText={handlePesoProdChange}
          placeholder="60"
          keyboardType="decimal-pad"
          inputMode="decimal"
        />
        <View>
          {!isPesoProdValid && (
            <Text style={styles.error}>
              Valor digitado inválido, tente novamente.
            </Text>
          )}
        </View>
      </View>
    );
  };
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
      console.log("Ativado");
      return styles.containerButaoKeyboardOn;
    } else {
      console.log("Desativado");
      return styles.containerButao;
    }
  }
  function StyleScrollViewContainer() {
    if (keyboardStatus) {
      return styles.ContainerScrollStyle;
    } else {
      return [styles.ContainerScrollStyle, {flex: 1,}];
    }
  }
  return (
    <KeyboardAvoidingView behavior="undefined" style={styles.containerkeyboard}>
      <View style={styles.container}>
        <View style={styles.containergeral}>
          <ScrollView style={styles.scrollcontainer} contentContainerStyle={StyleScrollViewContainer()}>
            <View style={styles.containerInput}>
              <Text style={styles.font}>Nome do produto:</Text>
              <TextInput
                style={
                  !isNomeProdValid ? styles.textInputError : styles.textInput
                }
                value={nomeProd}
                onChangeText={handleNomeProdChange}
                placeholder="Prata"
                keyboardType="default"
                inputMode="text"
              />
              <View>
                {!isNomeProdValid && (
                  <Text style={[styles.error]}>Digite o nome do produto!</Text>
                )}
              </View>
            </View>

            <View style={styles.containerInput}>
              <DropdownComponent />
            </View>
            <View style={styles.containerInput}>
              <Text style={styles.font}>Preço da compra:</Text>
              <TextInput
                style={
                  !isValorProdValid ? styles.textInputError : styles.textInput
                }
                value={valorProd}
                onChangeText={handleValorProdChange}
                placeholder="50,00"
                keyboardType="decimal-pad"
                inputMode="decimal"
              />
              <View>
                {!isValorProdValid && (
                  <Text style={styles.error}>
                    Valor digitado inválido, tente novamente.
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.containerInput}>
              <Text style={styles.font}>Quantidade de produtos comprados:</Text>
              <View style={styles.containerMaisMenos}>
                <TouchableOpacity style={styles.button} onPress={menosButton}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TextInput
                  style={
                    !isQtdProdValid
                      ? styles.textInputQtdError
                      : styles.textInputQtd
                  }
                  value={qtdProd}
                  onChangeText={(valor) => handleQtdProdChange(valor)}
                  keyboardType="numeric"
                />
                <TouchableOpacity style={styles.button} onPress={maisButton}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
              <View>
                {!isQtdProdValid && (
                  <Text style={styles.error}>
                    Valor digitado inválido, tente novamente.
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.containerInput}>{TextInputTipo()}</View>
            <View style={styles.containerInput}>
              <Text style={styles.font}>Observações:</Text>
              <TextInput
                style={styles.textInput}
                value={obserProd}
                onChangeText={setObserProd}
                placeholder="Produto comprado em ..."
                keyboardType="default"
                inputMode="text"
              />
            </View>
          </ScrollView>
          <View style={StyleFuncKeyboard()}>
            <TouchableOpacity style={styles.botao} onPress={validCheck}>
              <Text style={styles.font}>{"Cadastrar"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botao}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.font}>{"Voltar"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default EntradaEstoque;
