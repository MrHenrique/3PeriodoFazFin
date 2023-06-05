import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import Animated, { SlideInLeft, SlideOutRight } from "react-native-reanimated";
import {
  TextInput,
  HelperText,
  MD3Colors,
  RadioButton,
} from "react-native-paper";
import { Colors } from "../../../styles";
import uuid from "react-native-uuid";
import { AuthContext } from "../../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { useMainContext } from "../../../contexts/RealmContext";
import styles from "./styles";
import Modal from "react-native-modal";

export default function Outros() {
  const realm = useMainContext();
  const navigation = useNavigation();
  const [checked, setChecked] = React.useState("rebanho");
  const [valorProdString, setValorProd] = useState("");
  const [nomeProd, setNomeProd] = useState("");
  const [valorProdValid, setIsValorProdValid] = useState(true);
  const [valorProdPreenchido, setValorProdPreenchido] = useState(true);
  const [nomeValid, setNomeValid] = useState(true);
  const [listaVaca, setListaVaca] = useState([]);
  const [lista, setLista] = useState(listaVaca);
  const [searchText, setSearchText] = useState("");
  // listener teclado
  const [keyboardStatus, setkeyboardStatus] = useState(false);
  const { rebID } = useContext(AuthContext);
  const [vacaID, setVacaID] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const renderItem = ({ item, index }) => {
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
              backgroundColor: index % 2 === 0 ? "#1B5E20" : "#154c21",
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
  function handleValorChange(text) {
    const cleanedText = text.replace(",", ".");
    const parsedValue = parseFloat(cleanedText);
    const isValid = !isNaN(parsedValue) && parsedValue > 0;
    setIsValorProdValid(isValid);
    setValorProd(parsedValue);
    if (cleanedText.length > 0) {
      setValorProdPreenchido(true);
    }
  }
  function handleNomeChange(text) {
    const desc = text;
    setNomeProd(desc);
    if (desc.length > 0) {
      setNomeValid(true);
    }
  }
  function validCheck() {
    if (valorProdString.length === 0 || nomeProd.length === 0) {
      if (valorProdString.length === 0) {
        setValorProdPreenchido(false);
      }
      if (nomeProd.length === 0) {
        setNomeValid(false);
      }
    } else if (valorProdPreenchido && valorProdValid) {
      handleAddGastos();
    }
  }
  async function handleAddGastos() {
    if (realm) {
      if (checked === "rebanho") {
        try {
          let id = uuid.v4();
          realm.write(() => {
            let reb = realm.objectForPrimaryKey("RebanhoSchema", rebID);
            const valorProd = Number(valorProdString);
            let createdGastosReb = realm.create("DespesaRebSchema", {
              _id: id,
              createdAt: new Date(),
              nomeProd,
              valorProd,
              qtdProd: 1,
              obserProd: "",
              pesoProd: 0,
              volumeProd: 0,
            });
            reb.despesas.push(createdGastosReb);
            let nVacas = reb.vacas.length;
            reb.vacas.forEach((vaca) => {
              let createdGastos = realm.create("DespesasSchema", {
                _id: uuid.v4(),
                idTransacao: id,
                createdAt: new Date(),
                nomeProd,
                valorProd: valorProd / nVacas,
                qtdProd: 1,
                obserProd: "",
                pesoProd: 0,
                volumeProd: 0,
              });
              vaca.despesas.push(createdGastos);
            });
            Alert.alert("Dados cadastrados com sucesso!");
          });
        } catch (e) {
          Alert.alert("Não foi possível cadastrar!", e.message);
        } finally {
          setNomeProd("");
          setValorProd("");
          setVacaID("");
        }
      }
    }
    if (checked === "vacas") {
      try {
        let id = uuid.v4();
        realm.write(() => {
          let reb = realm.objectForPrimaryKey("RebanhoSchema", rebID);
          const valorProd = Number(valorProdString);
          let createdGastosReb = realm.create("DespesaRebSchema", {
            _id: id,
            createdAt: new Date(),
            nomeProd,
            valorProd,
            qtdProd: 1,
            obserProd: "",
            pesoProd: 0,
            volumeProd: 0,
          });
          reb.despesas.push(createdGastosReb);
          let Vacas = realm.objectForPrimaryKey("VacasSchema", vacaID);
          let createdGastos = realm.create("DespesasSchema", {
            _id: uuid.v4(),
            idTransacao: id,
            createdAt: new Date(),
            nomeProd,
            valorProd,
            qtdProd: 1,
            obserProd: "",
            pesoProd: 0,
            volumeProd: 0,
          });
          Vacas.despesas.push(createdGastos);
          Alert.alert("Dados cadastrados com sucesso!");
        });
      } catch (e) {
        Alert.alert("Não foi possível cadastrar!", e.message);
      } finally {
        setNomeProd("");
        setValorProd("");
        setVacaID("");
      }
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
      return styles.ContainerScrollStyle;
    } else {
      return [styles.ContainerScrollStyle, { flex: 1 }];
    }
  }
  return (
    <KeyboardAvoidingView behavior="undefined" style={styles.containerkeyboard}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../../assets/fazfinwhiteletter.png")}
          resizeMode="repeat"
          imageStyle={{ opacity: 0.02 }} // imageStyle={{ margin: 25 }}
          style={styles.containergeral}
        >
          <ScrollView
            style={styles.scrollcontainer}
            contentContainerStyle={StyleScrollViewContainer()}
          >
            <View style={styles.containerCadastroOutras}>
              <View style={styles.containerOutrasDespesas}>
                <TextInput
                  mode="flat"
                  label={"Descrição"}
                  style={styles.txtInput}
                  placeholderTextColor={Colors.grey}
                  textColor={Colors.black}
                  activeUnderlineColor={Colors.green}
                  underlineColor={Colors.blue}
                  underlineStyle={{ paddingBottom: 3 }}
                  value={nomeProd}
                  onChangeText={handleNomeChange}
                  placeholder="Exemplo: Reforma pasto"
                  error={!nomeValid}
                />
                <HelperText
                  type="error"
                  style={{
                    color: MD3Colors.error60,
                    fontSize: 14,
                    lineHeight: 12,
                  }}
                  visible={!nomeValid}
                  padding="20"
                >
                  Digite uma descrição.
                </HelperText>
              </View>
              <View style={styles.containerOutrasDespesas}>
                <TextInput
                  mode="flat"
                  label={"Valor total."}
                  style={styles.txtInput}
                  placeholderTextColor={Colors.grey}
                  textColor={Colors.black}
                  activeUnderlineColor={Colors.green}
                  underlineColor={Colors.blue}
                  underlineStyle={{ paddingBottom: 3 }}
                  value={valorProdString}
                  keyboardType="decimal-pad"
                  inputMode="text"
                  onChangeText={handleValorChange}
                  error={!valorProdValid || !valorProdPreenchido}
                />
                <HelperText
                  type="error"
                  style={{
                    color: MD3Colors.error60,
                    fontSize: 14,
                    lineHeight: 15,
                  }}
                  visible={!valorProdValid || !valorProdPreenchido}
                  padding="20"
                >
                  {!valorProdValid
                    ? "Valor inválido."
                    : "Preencha o campo valor total."}
                </HelperText>
              </View>
            </View>
            <View style={styles.radioBView}>
              <RadioButton
                uncheckedColor={Colors.white}
                color={Colors.white}
                value="rebanho"
                status={checked === "rebanho" ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked("rebanho"), setVacaID("");
                }}
              />
              <Text style={styles.RadioTextStyle}>Cadastro por Rebanho</Text>
              <RadioButton
                uncheckedColor={Colors.white}
                color={Colors.white}
                value="vacas"
                status={checked === "vacas" ? "checked" : "unchecked"}
                onPress={() => setChecked("vacas")}
              />
              <Text style={styles.RadioTextStyle}>Cadastro individual</Text>
            </View>
            {checked === "vacas" ? (
              <>
                <Animated.View style={{flex:0.5,}} entering={SlideInLeft} exiting={SlideOutRight}>
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
                      backdropOpacity={0.5}
                      backdropColor={"black"}
                      animationIn="slideInUp"
                      animationOut="slideOutDown"
                      onBackdropPress={() => setModalVisible(false)}
                    >
                      <View style={styles.modalContainer}>
                        <Text style={styles.TituloM}>Selecione um animal</Text>
                        <TouchableOpacity
                          style={styles.filtroNome}
                          onPress={handleFilterNome}
                        >
                          <Text style={styles.tituloBotao}>
                            Filtrar por nome
                          </Text>
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
                </Animated.View>
              </>
            ) : null}
          </ScrollView>
          <View style={StyleFuncKeyboard()}>
            <TouchableOpacity onPress={validCheck} style={styles.botao}>
              <Text style={styles.txtBotao}>{"Cadastrar"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={styles.botao}
            >
              <Text style={styles.txtBotao}>{"Voltar"}</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
}
