import React, { useState, useContext, useEffect } from "react";
import {
  Keyboard,
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
} from "react-native";
import {
  TextInput,
  MD3Colors,
  IconButton,
  HelperText,
} from "react-native-paper";
import { Colors } from "../../../styles";
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
  const [teste, setteste] = useState(true);
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
    if (
      nomeProd.length === 0 ||
      valorProd.length === 0 ||
      qtdProd <= 0 ||
      (volumeProd.length === 0 && pesoProd.length === 0)
    ) {
      if (nomeProd.length === 0) {
        setIsNomeProdValid(false);
      }
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
            let volumeProdT = qtdProdN * volumeProd;
            let valorProdT = qtdProd * valorProd;
            realm.write(() => {
              let farm = realm.objectForPrimaryKey("Farm", fazID);
              let createdEstoque = realm.create("AtualEstoqueSchema", {
                nomeProd: nomeProd,
                _id: uuid.v4(),
                valorProd: valorProdT,
                pesoProd: pesoProdNull,
                volumeProd: volumeProdT,
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
            let pesoProdT = qtdProdN * pesoProd;
            let valorProdT = qtdProd * valorProd;
            realm.write(() => {
              let farm = realm.objectForPrimaryKey("Farm", fazID);
              let createdEstoque = realm.create("AtualEstoqueSchema", {
                nomeProd: nomeProd,
                _id: uuid.v4(),
                valorProd: valorProdT,
                pesoProd: pesoProdT,
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
        let volumeProdT = qtdProdN * volumeProd;
        let valorProdT = qtdProd * valorProd;
        let valorProdF = valorProdT + listaEstoqueFiltered[0].valorProd;
        let volumeProdF = volumeProdT + listaEstoqueFiltered[0].volumeProd;
        if (realm) {
          try {
            realm.write(() => {
              let updateEstoque = realm
                .objects("AtualEstoqueSchema")
                .filtered(`_id= '${listaEstoqueFiltered[0]._id}'`)[0];
              updateEstoque.valorProd = valorProdF;
              updateEstoque.pesoProd = pesoProdNull;
              updateEstoque.volumeProd = volumeProdF;
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
        let pesoProdT = qtdProdN * pesoProd;
        let valorProdT = qtdProd * valorProd;
        let valorProdF = valorProdT + listaEstoqueFiltered[0].valorProd;
        let pesoProdF = pesoProdT + listaEstoqueFiltered[0].pesoProd;
        if (realm) {
          try {
            realm.write(() => {
              let updateEstoque = realm
                .objects("AtualEstoqueSchema")
                .filtered(`_id= '${listaEstoqueFiltered[0]._id}'`)[0];
              updateEstoque.valorProd = valorProdF;
              updateEstoque.pesoProd = pesoProdF;
              updateEstoque.volumeProd = volumeProdNull;
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
          <TextInput
            label="Volume da unidade do produto"
            style={styles.textInput}
            placeholderTextColor={Colors.grey}
            textColor={Colors.black}
            activeUnderlineColor={Colors.green}
            underlineColor={Colors.blue}
            underlineStyle={{ paddingBottom: 3 }}
            value={volumeProd}
            onChangeText={handleVolumeProdChange}
            keyboardType="decimal-pad"
            inputMode="decimal"
            error={!isVolumeProdValid}
          />
          <HelperText
            type="error"
            style={{ color: MD3Colors.error60, fontSize: 14, lineHeight: 12 }}
            visible={!isVolumeProdValid}
            padding="20"
          >
            Digite um volumeda unidade do produto.
          </HelperText>
        </View>
      );
    }
    return (
      <View style={styles.containerInput}>
        <TextInput
          mode="flat"
          label={"Peso da unidade do produto"}
          style={styles.textInput}
          placeholderTextColor={Colors.grey}
          textColor={Colors.black}
          activeUnderlineColor={Colors.green}
          underlineColor={Colors.blue}
          underlineStyle={{ paddingBottom: 3 }}
          value={pesoProd}
          onChangeText={handlePesoProdChange}
          keyboardType="decimal-pad"
          inputMode="decimal"
          error={!isPesoProdValid}
        />
        <HelperText
          type="error"
          style={{ color: MD3Colors.error60, fontSize: 14, lineHeight: 12 }}
          visible={!isPesoProdValid}
          padding="20"
        >
          Digite o peso da unidade do produto.
        </HelperText>
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
      return styles.containerButaoKeyboardOn;
    } else {
      return styles.containerButao;
    }
  }
  return (
    <KeyboardAvoidingView behavior="undefined" style={styles.containerkeyboard}>
      <View style={styles.container}>
        <ImageBackground
          // imageStyle={{ opacity: 0.05 }}
          resizeMode="repeat"
          // source={require("../../../../assets/fazfinwhiteletter.png")}
          style={styles.containergeral}
        >
          <ScrollView style={styles.scrollcontainer}>
            <View style={styles.containerInput}>
              <TextInput
                mode="flat"
                label="Nome do produto"
                style={styles.textInput}
                placeholderTextColor={Colors.grey}
                textColor={Colors.black}
                activeUnderlineColor={Colors.green}
                underlineColor={Colors.blue}
                underlineStyle={{ paddingBottom: 3 }}
                value={nomeProd}
                onChangeText={handleNomeProdChange}
                placeholder="Ex: Prata"
                keyboardType="default"
                error={!isNomeProdValid}
              />
              <HelperText
                type="error"
                style={{
                  color: MD3Colors.error60,
                  fontSize: 14,
                  lineHeight: 12,
                }}
                visible={!isNomeProdValid}
                padding="20"
              >
                Digite o nome do produto.
              </HelperText>
            </View>

            <View style={styles.containerInput}>
              <DropdownComponent />
            </View>
            <View style={styles.containerInput}>
              <TextInput
                value={valorProd}
                mode="flat"
                label="Preço da unidade do produto."
                style={styles.textInput}
                placeholderTextColor={Colors.grey}
                textColor={Colors.black}
                activeUnderlineColor={Colors.green}
                underlineColor={Colors.blue}
                underlineStyle={{ paddingBottom: 3 }}
                onChangeText={handleValorProdChange}
                keyboardType="decimal-pad"
                inputMode="text"
                error={!isValorProdValid}
              />
              <HelperText
                type="error"
                style={{
                  color: MD3Colors.error60,
                  fontSize: 14,
                  lineHeight: 12,
                }}
                visible={!isValorProdValid}
                padding="20"
              >
                Digite o preço da unidade do produto..
              </HelperText>
            </View>
            <View style={styles.containerInput}>
              <Text style={styles.fonts}>Quantidade de produtos comprados</Text>
              <View style={styles.containerMaisMenos}>
                <IconButton
                  icon="minus"
                  iconColor={MD3Colors.neutral0}
                  size={20}
                  onPress={menosButton}
                  containerColor={MD3Colors.neutral70}
                />
                <TextInput
                  mode="flat"
                  style={styles.textInputQtd}
                  placeholderTextColor={Colors.grey}
                  textColor={Colors.black}
                  activeUnderlineColor={Colors.green}
                  underlineColor={Colors.blue}
                  underlineStyle={{ paddingBottom: 3 }}
                  value={qtdProd}
                  onChangeText={(valor) => handleQtdProdChange(valor)}
                  keyboardType="numeric"
                  error={!isQtdProdValid}
                />
                <IconButton
                  icon="plus"
                  iconColor={MD3Colors.neutral0}
                  size={20}
                  onPress={maisButton}
                  containerColor={MD3Colors.neutral70}
                />
              </View>
              <HelperText
                type="error"
                style={{
                  color: MD3Colors.error60,
                  fontSize: 14,
                  lineHeight: 12,
                }}
                visible={!isQtdProdValid}
                padding="20"
              >
                Quantidade inválida.
              </HelperText>
            </View>
            <View style={styles.containerInput}>{TextInputTipo()}</View>
            <View style={styles.containerInput}>
              <TextInput
                mode="flat"
                label="Observações"
                style={styles.textInput}
                placeholderTextColor={Colors.grey}
                textColor={Colors.black}
                activeUnderlineColor={Colors.green}
                underlineColor={Colors.blue}
                underlineStyle={{ paddingBottom: 3 }}
                value={obserProd}
                onChangeText={setObserProd}
                placeholder="Ex: Produto comprado em ..."
                keyboardType="default"
                inputMode="text"
              />
            </View>
          </ScrollView>
          <View style={StyleFuncKeyboard()}>
            <TouchableOpacity style={styles.botao} onPress={validCheck}>
              <Text style={styles.fontBackButton}>{"Cadastrar"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botao}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.fontBackButton}>{"Voltar"}</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
}

export default EntradaEstoque;
