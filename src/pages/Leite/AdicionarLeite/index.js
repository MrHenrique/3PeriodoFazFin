import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import uuid from "react-native-uuid";
import { AuthContext } from "../../../contexts/auth";
import Modal from "react-native-modal";
import { scale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { useMainContext } from "../../../contexts/RealmContext";
import { Colors } from "../../../styles";
import {
  RadioButton,
  TextInput,
  MD3Colors,
  HelperText,
} from "react-native-paper";
function AdicionarLeite() {
  const realm = useMainContext();
  const [checked, setChecked] = React.useState("rebanho");
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [vacaID, setVacaID] = useState("");
  const [precoValido, setPrecoValido] = useState(true);
  const [prodValido, setProdValido] = useState(true);
  function toggleModal() {
    setModalVisible(!isModalVisible);
    setSearchText("");
    setLista(listaVaca);
  }
  function handlePrecoChange(text) {
    const cleanedText = text.replace(",", ".");
    const parsedValue = parseFloat(cleanedText);
    const isValid = !isNaN(parsedValue) && parsedValue > 0;
    setPrecoValido(isValid);
    setPrecoLV(parsedValue);
  }
  function handleProdChange(text) {
    const cleanedText = text.replace(",", ".");
    const parsedValue = parseFloat(cleanedText);
    const isValid = !isNaN(parsedValue) && parsedValue > 0;
    setProdValido(isValid);
    setProdLV(parsedValue);
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
    }
  }
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
  //Escrever no Banco
  async function handleAddLeite() {
    if (realm) {
      if (checked === "rebanho") {
        try {
          const precoL = Number(precoLV);
          const prodL = Number(prodLV);
          let id = uuid.v4();
          realm.write(() => {
            let reb = realm.objectForPrimaryKey("RebanhoSchema", rebID);
            let createdLeiteReb = realm.create("ReceitaRebSchema", {
              _id: id,
              tipo: 1,
              precoL,
              prodL,
              description,
              createdAt: new Date(date),
            });
            reb.receitas.push(createdLeiteReb);
            let nVacas = reb.vacas.length;
            reb.vacas.forEach((vaca) => {
              let createdLeite = realm.create("ReceitaSchema", {
                _id: uuid.v4(),
                idTransacao: id,
                tipo: 1,
                precoL,
                prodL: prodL / nVacas,
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
        try {
          const precoL = Number(precoLV);
          const prodL = Number(prodLV);
          let id = uuid.v4();
          realm.write(() => {
            let reb = realm.objectForPrimaryKey("RebanhoSchema", rebID);
            let createdLeiteReb = realm.create("ReceitaRebSchema", {
              _id: id,
              tipo: 1,
              precoL,
              prodL,
              description,
              createdAt: new Date(date),
            });
            reb.receitas.push(createdLeiteReb);
            let Vacas = realm.objectForPrimaryKey("VacasSchema", vacaID);
            let createdLeite = realm.create("ReceitaSchema", {
              _id: id,
              idTransacao: id,
              tipo: 1,
              precoL,
              prodL,
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
      setListaVaca(dataVaca.vacas.sorted("nomeVaca"));
      dataVaca.vacas.sorted("nomeVaca").addListener((values) => {
        setListaVaca([...values]);
      });
    }
  }, [realm]);
  const { ListaLeite, PrecoLeite, rebID, fazID } = useContext(AuthContext);
  //Background
  const imgbg1 = "../../../assets/bg10.jpg";
  //States para salvar o input
  const [description, setDescription] = useState("");
  const [precoLV, setPrecoLV] = useState("");
  const [prodLV, setProdLV] = useState("");
  const [listaVaca, setListaVaca] = useState([]);
  const [lista, setLista] = useState(listaVaca);
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
      const Style = styles.botaopress6;
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
  return (
    <View style={styles.container}>
      <ScrollView>
        {/*Data*/}
        <View style={styles.containerinfos}>
          <Text style={styles.tituloinfo}>{text}</Text>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: "grey",
                borderRadius: 20,
              }}
              onPress={showDatePicker}
            >
              <Text style={styles.tituloinfo}>Selecione a data:</Text>
            </TouchableOpacity>
          </View>

          <DateTimePickerModal
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
            style={styles.textInput}
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
      </ScrollView>
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
      <TouchableOpacity
        disabled={CanContinue(vacaID)}
        style={DisabledStyle(vacaID)}
        onPress={validCheck}
      >
        <Text style={styles.textovoltar}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.botaopress}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.textovoltar}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  radioBView: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
  },
  filtroNome: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    borderRadius: 20,
    width: scale(140),
    height: verticalScale(30),
    margin: verticalScale(5),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  search: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    fontSize: verticalScale(15),
    color: "white",
    textAlign: "center",
    alignSelf: "center",
    height: verticalScale(40),
    width: scale(300),
    margin: verticalScale(20),
    borderRadius: 20,
  },
  modalContainer: {
    backgroundColor: "rgba(234,242,215,1)",
    position: "absolute",
    top: verticalScale(10),
    alignSelf: "center",
    height: verticalScale(550),
    width: scale(330),
    borderRadius: 20,
  },
  cardVacas: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    marginVertical: verticalScale(4),
    position: "relative",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#004513",
  },
  contvoltar: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    color: "rgba(15, 109, 0, 0.9)",
    top: verticalScale(625),
  },
  botaovoltar: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    marginVertical: verticalScale(5),
    position: "relative",
    alignSelf: "center",
  },
  botaovoltar2: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    marginVertical: verticalScale(5),
    position: "relative",
    alignSelf: "center",
  },
  botaovoltar3: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    marginVertical: verticalScale(5),
    position: "relative",
    alignSelf: "center",
  },
  textovoltar: {
    fontSize: verticalScale(14),
    fontWeight: "bold",
    color: "#fff",
  },
  tituloinfo: {
    color: "white",
    fontSize: verticalScale(20),
    marginBottom: verticalScale(10),
    textAlign: "center",
    fontWeight: "bold",
  },
  detalhe: {
    fontSize: verticalScale(20),
    color: "black",
    backgroundColor: "white",
    borderRadius: verticalScale(5),
    marginBottom: verticalScale(20),
    textAlign: "center",
    width: scale(280),
  },
  containerinfos: {
    marginVertical: verticalScale(5),
    padding: verticalScale(5),
    width: scale(320),
    backgroundColor: "rgba(15, 109, 0, 0.7)",
    borderRadius: 20,
    alignSelf: "center",
  },
  botaoselecionaranimal: {
    backgroundColor: "#004513",
    width: scale(215),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 18,
    color: "white",
  },
  selecionaranimal: {
    color: "white",
    fontSize: verticalScale(20),
  },
  container2: {
    flex: 1,
    height: verticalScale(100),
    backgroundColor: "white",
  },
  lista2: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    alignSelf: "center",
    marginVertical: verticalScale(5),
    color: "white",
    textAlign: "center",
    fontSize: verticalScale(20),
    fontWeight: "bold",
  },
  container3: {
    height: verticalScale(300),
  },
  botaopressM: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(580),
    position: "absolute",
  },

  tituloBotao: {
    fontSize: verticalScale(14),
    fontWeight: "bold",
    color: "#fff",
  },
  botaopress: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(525),
    position: "absolute",
  },

  botaopress6: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(475),
    position: "absolute",
  },
  TituloM: {
    justifyContent: "center",
    alignSelf: "center",
    color: "#004513",
    fontSize: verticalScale(30),
    fontWeight: "bold",
  },
  botaoselecionaranimal: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    top: verticalScale(425),
    position: "absolute",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  botaopressdisabled: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.4)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(475),
    position: "absolute",
  },
  dateComponente: {
    width: 350,
  },
});

export default AdicionarLeite;
