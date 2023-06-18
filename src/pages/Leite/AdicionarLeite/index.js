import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import uuid from "react-native-uuid";
import { AuthContext } from "../../../contexts/auth";
import Modal from "react-native-modal";
import { scale, verticalScale } from "react-native-size-matters";
import { useMainContext } from "../../../contexts/RealmContext";
import { Colors } from "../../../styles";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import {
  RadioButton,
  TextInput,
  MD3Colors,
  HelperText,
} from "react-native-paper";
import Animated, { SlideInLeft, SlideOutRight } from "react-native-reanimated";
function AdicionarLeite({ navigation }) {
  const realm = useMainContext();
  const [checked, setChecked] = useState("rebanho");
  const [isModalVisible, setModalVisible] = useState(false);
  const [vacaID, setVacaID] = useState("");
  const [precoValido, setPrecoValido] = useState(true);
  const [prodValido, setProdValido] = useState(true);
  const [keyboardStatus, setkeyboardStatus] = useState(false);
  function toggleModal() {
    setModalVisible(!isModalVisible);
    setSearchText("");
    setLista(listaVaca);
  }
  function handlePrecoChange(text) {
    const cleanedText = text.replace(",", ".");
    const parsedValue = Number(cleanedText);
    const isValid = !isNaN(parsedValue) && parsedValue > 0;
    setPrecoValido(isValid);
    setPrecoLV(text);
  }
  function handleProdChange(text) {
    const cleanedText = text.replace(",", ".");
    const parsedValue = Number(cleanedText);
    const isValid = !isNaN(parsedValue) && parsedValue > 0;
    setProdValido(isValid);
    setProdLV(text);
  }
  function validCheck() {
    if (precoLV.length === 0 || prodLV.length === 0) {
      if (precoLV.length === 0) {
        setPrecoValido(false);
      }
      if (prodLV.length === 0) {
        setProdValido(false);
      }
    } else if (precoValido && prodValido) {
      handleAddLeite();
      setDate(new Date());
      let tempDate = new Date();
      let fDate =
        tempDate.getDate().toString().padStart(2, "0") +
        "/" +
        (tempDate.getMonth() + 1).toString().padStart(2, "0") +
        "/" +
        tempDate.getFullYear().toString().padStart(2, "0");
      setText(fDate);
    }
  }
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
  //Escrever no Banco
  async function handleAddLeite() {
    if (realm) {
      if (checked === "rebanho") {
        let reb = realm.objectForPrimaryKey("RebanhoSchema", rebID);
        let nVacas = reb.vacas.filtered("genero == 1").length;
        if (nVacas > 0) {
          try {
            const cleanedTextPreco = precoLV.replace(",", ".");
            const parsedValue = Number(cleanedTextPreco);
            const cleanedTextProd = prodLV.replace(",", ".");
            const parsedValueProd = Number(cleanedTextProd);
            let id = uuid.v4();
            realm.write(() => {
              let createdLeiteReb = realm.create("ReceitaRebSchema", {
                _id: id,
                tipo: 1,
                nomeProd: "Leite",
                precoL: parsedValue,
                prodL: parsedValueProd,
                description,
                createdAt: new Date(date),
              });
              reb.receitas.push(createdLeiteReb);

              reb.vacas.filtered("genero == 1").forEach((vaca) => {
                let createdLeite = realm.create("ReceitaSchema", {
                  _id: uuid.v4(),
                  idTransacao: id,
                  nomeProd: "Leite",
                  tipo: 1,
                  precoL: parsedValue,
                  prodL: parsedValueProd / nVacas,
                  description,
                  createdAt: new Date(date),
                });
                vaca.receitas.push(createdLeite);
              });

              Alert.alert("Dados cadastrados com sucesso no rebanho!");
            });
          } catch (e) {
            Alert.alert("Não foi possível cadastrar!", e.message);
          } finally {
            setPrecoLV("");
            setProdLV("");
            setDescription("");
            setVacaID("");
          }
        } else {
          Alert.alert(
            "Não foi possível cadastrar!",
            "Rebanho não possui animais!"
          );
        }
      } else {
        try {
          const cleanedTextPreco = precoLV.replace(",", ".");
          const parsedValue = Number(cleanedTextPreco);
          const cleanedTextProd = prodLV.replace(",", ".");
          const parsedValueProd = Number(cleanedTextProd);
          let id = uuid.v4();
          realm.write(() => {
            let reb = realm.objectForPrimaryKey("RebanhoSchema", rebID);
            let createdLeiteReb = realm.create("ReceitaRebSchema", {
              _id: id,
              tipo: 1,
              nomeProd: "Leite",
              precoL: parsedValue,
              prodL: parsedValueProd,
              description,
              createdAt: new Date(date),
            });
            reb.receitas.push(createdLeiteReb);
            let Vacas = realm.objectForPrimaryKey("VacasSchema", vacaID);
            let createdLeite = realm.create("ReceitaSchema", {
              _id: id,
              idTransacao: id,
              nomeProd: "Leite",
              tipo: 1,
              precoL: parsedValue,
              prodL: parsedValueProd,
              description,
              createdAt: new Date(date),
            });
            Vacas.receitas.push(createdLeite);
            Alert.alert("Dados cadastrados com sucesso!");
          });
        } catch (e) {
          Alert.alert("Não foi possível cadastrar!", e.message);
        } finally {
          setPrecoLV("");
          setProdLV("");
          setDescription("");
          setVacaID("");
        }
      }
    }
  }
  //Buscar no banco
  useEffect(() => {
    if (realm) {
      let dataVaca = realm.objectForPrimaryKey("RebanhoSchema", rebID);
      setListaVaca(dataVaca.vacas.filtered("genero == 1").sorted("nomeVaca"));
      dataVaca.vacas.addListener((values) => {
        setListaVaca([...values.filtered("genero == 1").sorted("nomeVaca")]);
      });
    }
  }, [realm]);
  const { rebID } = useContext(AuthContext);
  //Background
  //States para salvar o input
  const [description, setDescription] = useState("");
  const [precoLV, setPrecoLV] = useState("");
  const [prodLV, setProdLV] = useState("");
  const [listaVaca, setListaVaca] = useState([]);
  const [lista, setLista] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Códido para pegar a data ....
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [text, setText] = useState(
    new Date().getDate().toString().padStart(2, "0") +
      "/" +
      (new Date().getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      new Date().getFullYear().toString().padStart(2, "0")
  );

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };
  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };
  const handleDateConfirm = (selectedDate) => {
    let tempDate = new Date(selectedDate);
    let fDate =
      tempDate.getDate().toString().padStart(2, "0") +
      "/" +
      (tempDate.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      tempDate.getFullYear().toString().padStart(2, "0");
    setText(fDate);
    setDate(selectedDate);
    hideDatePicker();
  };
  //Fim do código da data .....

  //-----------------------------
  function CanContinue(vacaID) {
    if ((typeof vacaID == "undefined" || vacaID == "") && checked === "vacas") {
      const CanContinue = true;
      return CanContinue;
    } else {
      const CanContinue = false;
      return CanContinue;
    }
  }
  function DisabledStyle(vacaID) {
    if ((typeof vacaID == "undefined" || vacaID == "") && checked === "vacas") {
      const Style = styles.botaopressdisabled;
      return Style;
    } else {
      const Style = styles.botao;
      return Style;
    }
  }
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

  const handleFilterNome = () => {
    let newList = [...lista];
    newList.sort((a, b) =>
      a.nomeVaca > b.nomeVaca ? 1 : b.nomeVaca > a.nomeVaca ? -1 : 0
    );
    setLista(newList);
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
      return styles.containerbutaoKeyboardOn;
    } else {
      return styles.containervoltar;
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.containergeral}>
        <View style={styles.containerScrollView}>
          <ScrollView styles={{ flex: 1 }}>
            {/*Data*/}
            <View style={styles.containerinfos}>
              <Text style={styles.tituloinfo}>Selecione a data</Text>
              <View>
                <TouchableOpacity
                  style={styles.btndata}
                  onPress={showDatePicker}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: scale(24),
                        fontWeight: "bold",
                        padding: scale(5),
                      }}
                    >
                      {text}
                    </Text>
                  </View>
                  <View style={{ paddingRight: scale(20) }}>
                    <MaterialCommunityIcons
                      name="calendar"
                      size={scale(30)}
                      color="white"
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <DateTimePickerModal
                date={new Date()}
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
                maximumDate={new Date()}
              />
            </View>
            {/*Preco do leite*/}
            <View style={styles.containerinfos}>
              <TextInput
                mode="flat"
                label="Preço do litro do leite"
                style={styles.campoTexto}
                placeholderTextColor={Colors.grey}
                textColor={Colors.black}
                activeUnderlineColor={Colors.green}
                underlineColor={Colors.blue}
                underlineStyle={{ paddingBottom: 3 }}
                onChangeText={handlePrecoChange}
                value={precoLV}
                error={!precoValido}
                keyboardType="decimal-pad"
              />
              <HelperText
                type="error"
                style={{
                  color: MD3Colors.error60,
                  fontSize: 14,
                  lineHeight: 15,
                }}
                visible={!precoValido}
                padding="20"
              >
                Digite um preço válido.
              </HelperText>
            </View>
            {/*Produção diaria*/}
            <View style={styles.containerinfos}>
              <TextInput
                mode="flat"
                label="Litros de leite"
                style={styles.campoTexto}
                placeholderTextColor={Colors.grey}
                textColor={Colors.black}
                activeUnderlineColor={Colors.green}
                underlineColor={Colors.blue}
                underlineStyle={{ paddingBottom: 3 }}
                onChangeText={handleProdChange}
                value={prodLV}
                error={!prodValido}
                keyboardType="decimal-pad"
              />
              <HelperText
                type="error"
                style={{
                  color: MD3Colors.error60,
                  fontSize: 14,
                  lineHeight: 15,
                }}
                visible={!prodValido}
                padding="20"
              >
                Digite um valor de produção válido.
              </HelperText>
            </View>
            <View style={styles.containerinfos}>
              <TextInput
                label="Observações"
                style={styles.campoTexto}
                placeholderTextColor={Colors.grey}
                textColor={Colors.black}
                activeUnderlineColor={Colors.green}
                underlineColor={Colors.blue}
                underlineStyle={{ paddingBottom: 3 }}
                value={description}
                onChangeText={setDescription}
              />
            </View>
            {/*Descrição*/}
            <View style={styles.radioBView}>
              <RadioButton
                value="rebanho"
                uncheckedColor={Colors.white}
                color={Colors.white}
                status={checked === "rebanho" ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked("rebanho"), setVacaID("");
                }}
              />
              <Text style={styles.RadioTextStyle}>Cadastro por Rebanho</Text>
              <RadioButton
                value="vacas"
                uncheckedColor={Colors.white}
                color={Colors.white}
                status={checked === "vacas" ? "checked" : "unchecked"}
                onPress={() => setChecked("vacas")}
              />
              <Text style={styles.RadioTextStyle}>Cadastro individual</Text>
            </View>
            {checked === "vacas" ? (
              <>
                <Animated.View
                  style={{ flex: 2 }}
                  entering={SlideInLeft}
                  exiting={SlideOutRight}
                >
                  <TouchableOpacity
                    onPress={() => {
                      toggleModal(), setVacaID("");
                    }}
                    style={styles.botaoselecionaranimal}
                  >
                    <Text style={styles.tituloBotao}>Selecionar animal</Text>
                    <AntDesign name="right" size={scale(22)} color="white" />
                    <Modal
                      isVisible={isModalVisible}
                      backdropOpacity={0.5}
                      coverScreen={true}
                      backdropColor={"black"}
                      animationIn="slideInUp"
                      animationOut="slideOutDown"
                      statusBarTranslucent
                    >
                      <View style={styles.modalContainer}>
                        <View style={styles.modalContainerSearch}>
                          <Text style={styles.TituloM}>
                            Selecione um animal
                          </Text>
                          <View style={{ flex: 1 }}>
                            <TextInput
                              style={styles.search}
                              placeholder="Pesquise pelo nome."
                              value={searchText}
                              onChangeText={(t) => setSearchText(t)}
                              right={
                                <TextInput.Icon
                                  icon={"text-search"}
                                  onPress={() => {
                                    handleFilterNome;
                                  }}
                                />
                              }
                            />
                          </View>
                        </View>
                        <View style={styles.modalListContainer}>
                          <FlatList
                            style={styles.scroll}
                            data={lista}
                            renderItem={renderItem}
                            keyExtractor={(item) => item._id}
                          />
                        </View>
                        <View style={styles.modalVoltarContainer}>
                          <TouchableOpacity
                            style={styles.botaopressM}
                            onPress={() => {
                              toggleModal();
                            }}
                          >
                            <View style={{ flex: 1, justifyContent: "center" }}>
                              <Text style={styles.tituloBotao}>{"Voltar"}</Text>
                            </View>
                            <MaterialIcons
                              name="arrow-back"
                              size={scale(24)}
                              color="white"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                  </TouchableOpacity>
                </Animated.View>
              </>
            ) : null}
          </ScrollView>
        </View>
        <View style={StyleFuncKeyboard()}>
          <TouchableOpacity
            disabled={CanContinue(vacaID)}
            style={DisabledStyle(vacaID)}
            onPress={validCheck}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={styles.textovoltar}>Cadastrar</Text>
            </View>
            <MaterialIcons name="add" size={scale(24)} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate("Home")}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={styles.textovoltar}>Voltar</Text>
            </View>
            <MaterialIcons name="arrow-back" size={scale(24)} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default AdicionarLeite;
