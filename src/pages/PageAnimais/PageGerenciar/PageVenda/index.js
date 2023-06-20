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
import { AuthContext } from "../../../../contexts/auth";
import Modal from "react-native-modal";
import { scale } from "react-native-size-matters";
import { useMainContext } from "../../../../contexts/RealmContext";
import { Colors } from "../../../../styles";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { TextInput, MD3Colors, HelperText } from "react-native-paper";
import Animated, { SlideInLeft, SlideOutRight } from "react-native-reanimated";
function Venda({ navigation }) {
  const realm = useMainContext();
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
      handleAddVenda();
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
  async function handleAddVenda() {
    if (realm) {
      try {
        const precoL = Number(precoLV);
        const prodL = Number(prodLV);
        let id = uuid.v4();
        realm.write(() => {
          let vaca = realm.objectForPrimaryKey("VacasSchema", vacaID);
          let reb = realm.objectForPrimaryKey("RebanhoSchema", rebID);
          let createdVendaReb = realm.create("ReceitaRebSchema", {
            _id: id,
            tipo: 2,
            nomeProd: vaca.nomeVaca,
            precoL,
            prodL,
            description,
            createdAt: new Date(date),
          });
          reb.receitas.push(createdVendaReb);
          let newVacas = copyAndDeleteVaca(reb, vacaID);
          reb.vacas = [];
          newVacas.forEach((vaca) => {
            reb.vacas.push(vaca);
          });
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
  function copyAndDeleteVaca(reb, vacaID) {
    const copiedVacas = [...reb.vacas];
    const index = copiedVacas.findIndex((vaca) => vaca._id === vacaID);
    if (index !== -1) {
      copiedVacas.splice(index, 1);
    }
    return copiedVacas;
  }
  //Buscar no banco
  useEffect(() => {
    if (realm) {
      let dataVaca = realm.objectForPrimaryKey("RebanhoSchema", rebID);
      setListaVaca(dataVaca.vacas.sorted("nomeVaca"));
      dataVaca.vacas.sorted("nomeVaca").addListener((values) => {
        setListaVaca([...values]);
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
  const [dateTemp, setDateTemp] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [text, setText] = useState(
    new Date().getDate().toString().padStart(2, "0") +
      "/" +
      (new Date().getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      new Date().getFullYear().toString().padStart(2, "0")
  );

  useEffect(() => {
    setDate(dateTemp);
  }, [dateTemp]);

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
    setDateTemp(selectedDate);
    hideDatePicker();
  };
  //Fim do código da data .....

  //-----------------------------
  function CanContinue(vacaID) {
    if (typeof vacaID == "undefined" || vacaID == "") {
      const CanContinue = true;
      return CanContinue;
    } else {
      const CanContinue = false;
      return CanContinue;
    }
  }
  function DisabledStyle(vacaID) {
    if (typeof vacaID == "undefined" || vacaID == "") {
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
                date={date}
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
                label="Preço da @ negociado"
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
                label="Peso em arroba(@)"
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
                Digite o peso do animal.
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
                  coverScreen={true}
                  backdropOpacity={0.5}
                  backdropColor={"black"}
                  animationIn="slideInUp"
                  animationOut="slideOutDown"
                  statusBarTranslucent
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContainerSearch}>
                      <Text style={styles.TituloM}>Selecione um animal</Text>
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

export default Venda;
