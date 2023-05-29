import * as React from "react";
import { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import FiltrosData from "../../../components/Filtros/FiltrosData";
import { scale, verticalScale } from "react-native-size-matters";
import { AuthContext } from "../../../contexts/auth";
import { useMainContext } from "../../../contexts/RealmContext";
import DateTimePickerModal from "react-native-modal-datetime-picker";
function RegistrosLeite() {
  const realm = useMainContext();
  const navigation = useNavigation();
  const { rebID, ListaFiltrada, listaFiltrada } = useContext(AuthContext);
  const [listaLeite, setListaLeite] = useState([]);
  const [shouldShow, setShouldShow] = useState(false);
  const [shouldShowDetalhes, setShouldShowDetalhes] = useState(false);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [description, setDescription] = useState("");
  const [prodLV, setProdLV] = useState("");
  const [idDoItemSelecionado, setIdDoItemSelecionado] = useState("");
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [text, setText] = useState(
    new Date().getDate().toString().padStart(2, "0") +
      "/" +
      (new Date().getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      new Date().getFullYear().toString().padStart(2, "0")
  );

  useEffect(() => {
    if (realm) {
      let dataReceitas = realm.objectForPrimaryKey("RebanhoSchema", rebID);

      dataReceitas.vacas.addListener((object) => {
        let NewReceitas = [];
        object.forEach((vaca) => {
          NewReceitas.push(...vaca.receitas);
        });
        if (NewReceitas.length > 0) {
          NewReceitas = NewReceitas.sort((a, b) => a.createdAt - b.createdAt);
        }
        setListaLeite(NewReceitas);
        ListaFiltrada(NewReceitas);
      });

      let receitas = [];
      dataReceitas.vacas.forEach((vaca) => {
        receitas.push(...vaca.receitas);
      });
      if (receitas.length > 0) {
        receitas = receitas.sort((a, b) => a.createdAt - b.createdAt);
      }
      setListaLeite(receitas);
      ListaFiltrada(receitas);
    }
  }, [realm]);

  async function UpdateinfoLeite() {
    if (realm) {
      try {
        realm.write(() => {
          const prodL = Number(prodLV);
          let updateLeite = realm.objectForPrimaryKey(
            "LeiteSchema",
            idDoItemSelecionado
          );
          updateLeite.createdAt = date;
          updateLeite.prodL = prodL;
          updateLeite.description = description;
          Alert.alert("Dados modificados com sucesso!");
        });
      } catch (e) {
        Alert.alert("Não foi possível modificar!", e.message);
      }
    }
  }

  //CODIGO DA DATA(EDITAR)
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

  //Confere se o detalhe do item ja está aberto se estiver fecha, se não estiver abre.
  const handleItemPress = (itemId) => {
    if (selectedItemIds.includes(itemId)) {
      setSelectedItemIds(selectedItemIds.filter((id) => id !== itemId));
      setShouldShowDetalhes(selectedItemIds.length > 1);
    } else {
      setSelectedItemIds([...selectedItemIds, itemId]);
      setShouldShowDetalhes(true);
    }
  };

  //Função para editar os dados do item escolhido
  const handleEditPress = (idLeite) => () => {
    setModalEditarVisible(true);
    setIdDoItemSelecionado(idLeite);
  };

  const handleDeletePress = () => {
    console.log("Excluir pressionado");
  };

  const renderItem = ({ item }) => {
    const result = item.prodL.toFixed(2);
    const formattedResult = `${result.replace(".", ",")}L`;
    const formattedData = `${
      item.createdAt.getDate().toString().padStart(2, 0) +
      "/" +
      (item.createdAt.getMonth() + 1).toString().padStart(2, 0) +
      "/" +
      item.createdAt.getFullYear().toString()
    }`;
    const isItemSelected = selectedItemIds.includes(item._id);

    return (
      <>
        <TouchableOpacity
          style={styles.listaDet}
          onPress={() => handleItemPress(item._id)}
        >
          <View style={styles.itemContainer}>
            <View style={[styles.indicador, { backgroundColor: "yellow" }]} />
            <Text style={styles.itemText}>
              {formattedData} - {formattedResult}
            </Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditPress(item._id)}
            >
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeletePress}
            >
              <AntDesign name="delete" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <View
          style={[
            styles.containerDetalhes,
            { display: shouldShowDetalhes && isItemSelected ? "flex" : "none" },
          ]}
        >
          <View>
            <Text style={styles.tituloDetalhes}>Detalhes</Text>
          </View>
          <View style={styles.modalContainerText}>
            <Text style={styles.modalContent}>Data: {formattedData}</Text>
            <Text style={styles.modalContent}>
              Horario: {item.createdAt.toLocaleTimeString()}
            </Text>
            <Text style={styles.modalContent}>Produção: {item.prodL} </Text>
            <Text style={styles.modalContent}>Preço: {item.precoL} </Text>
            <Text style={styles.modalContent}>
              Descrição: {item.description}
            </Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setShouldShow(!shouldShow)}
        style={styles.filtrosBotao}
      >
        <Text style={styles.tituloBotao}>Filtros</Text>
      </TouchableOpacity>
      <View style={[styles.filtros, { display: shouldShow ? "flex" : "none" }]}>
        {/*filtros*/}
        <FiltrosData listaRecebida={listaLeite} />
      </View>
      <FlatList
        style={[
          styles.lista,
          { marginTop: shouldShow ? verticalScale(140) : 0 },
        ]}
        data={listaFiltrada}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
      <TouchableOpacity
        style={styles.botaopress}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.tituloBotao}>{"Voltar"}</Text>
      </TouchableOpacity>
      <Modal
        visible={modalEditarVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.containerinfos}>
            <TouchableOpacity style={styles.teste} onPress={showDatePicker}>
              <Text style={styles.tituloinfo}>{text}</Text>
              <AntDesign name="calendar" size={24} color="black" />
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={hideDatePicker}
              maximumDate={new Date()}
            />
          </View>
          <View style={styles.containerinfos}>
            <Text style={styles.tituloinfo}>
              Produção da vaca hoje(litros):
            </Text>
            <TextInput
              style={styles.detalhe}
              value={prodLV}
              keyboardType="number-pad"
              onChangeText={setProdLV}
              placeholder="Exemplo: 10.2"
            />
          </View>
          <View style={styles.containerinfos}>
            <Text style={styles.tituloinfo}>Descrição:</Text>
            <TextInput
              style={styles.detalhe}
              value={description}
              onChangeText={setDescription}
              placeholder="Exemplo: "
            />
          </View>
          <View style={styles.modalContainerBotoes}>
            <TouchableOpacity
              style={styles.botaopressM}
              onPress={() => {
                UpdateinfoLeite();
                setModalEditarVisible(false);
              }}
            >
              <Text style={styles.textovoltar}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaopressM}
              onPress={() => setModalEditarVisible(false)}
            >
              <Text style={styles.textovoltar}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  teste: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItens: "center",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    backgroundColor: "#004513",
    padding: 20,
  },
  filtros: {
    alignSelf: "center",
    width: scale(300),
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 10,
    margin: 10,
    position: "absolute",
    top: verticalScale(65),
  },
  filtrosBotao: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  lista: {
    flex: 1,
    marginTop: 10,
    marginBottom: 40,
  },
  botaopress: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(530),
    position: "absolute",
  },
  tituloBotao: {
    fontSize: verticalScale(14),
    fontWeight: "bold",
    color: "#fff",
  },
  listaDet: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.95)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: verticalScale(5),
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  editButton: {
    //padding: 10,
    //backgroundColor: "red",
  },
  deleteButton: {
    //padding: 10,
    //backgroundColor: "blue",
  },
  itemText: {
    //backgroundColor: "gray",
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    fontSize: verticalScale(14),
    fontWeight: "bold",
    color: "#fff",
  },
  indicador: {
    padding: 8,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    width: 10,
    height: 40,
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
  tituloDetalhes: {
    color: "black",
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
  },
  containerinfos: {
    marginVertical: verticalScale(5),
    padding: verticalScale(5),
    width: scale(320),
    backgroundColor: "rgba(15, 109, 0, 0.7)",
    borderRadius: 20,
    alignSelf: "center",
  },

  textavatar: {
    borderWidth: 1,
    borderColor: "red",
    fontSize: 24,
    paddingLeft: scale(10),
  },
  modalContainer: {
    //flex: 1,
    backgroundColor: "#004513",
    borderRadius: 10,
    margin: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "18%",
  },
  containerDetalhes: {
    width: scale(300),
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  modalContainerBotoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalContent: {
    fontSize: 20,
  },
  modalContainerText: {
    width: "100%",
    padding: 5,
  },
  botaopressM: {
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: "50%",
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
export default RegistrosLeite;
