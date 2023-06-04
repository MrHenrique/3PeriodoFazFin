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
  const [selectedItemId, setSelectedItemId] = useState(null);
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
      let dataReceitasreb = realm.objectForPrimaryKey("RebanhoSchema", rebID);
      setListaLeite(dataReceitasreb.receitas);
      ListaFiltrada(dataReceitasreb.receitas);

      dataReceitasreb.receitas.addListener((values) => {
        const sortedValues = [...values].sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });

        setListaLeite(sortedValues);
        ListaFiltrada(sortedValues);
      });
    }
  }, [realm]);

  async function UpdateinfoLeite() {
    if (realm) {
      try {
        realm.write(() => {
          const prodL = Number(prodLV);
          let updateLeite = realm.objectForPrimaryKey(
            "ReceitaRebSchema",
            idDoItemSelecionado
          );
          updateLeite.createdAt = date;
          updateLeite.prodL = prodL;
          updateLeite.description = description;
          let updateVacaLeite = realm
            .objects("ReceitaSchema")
            .filtered(`idTransacao = '${idDoItemSelecionado}'`);
          let nVacas = updateVacaLeite.length;
          updateVacaLeite.forEach((receita) => {
            receita.createdAt = date;
            receita.prodL = prodL / nVacas;
            receita.description = description;
          });
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

  //Função para mostrar os detalhes dos item escolhido
  const handleItemPress = (itemId) => {
    if (itemId === selectedItemId) {
      // Se o itemId for o mesmo do item selecionado atualmente,
      // feche o modal de detalhes
      setSelectedItemId(null);
      setShouldShowDetalhes(false);
    } else {
      // Se o itemId for diferente do item selecionado atualmente
      // atualize o itemId e abra o modal de detalhes
      setSelectedItemId(itemId);
      setShouldShowDetalhes(true);
    }
  };

  //Função para editar os dados do item escolhido
  const handleEditPress = (item) => () => {
    setModalEditarVisible(true);
    setIdDoItemSelecionado(item._id);
    setProdLV(item.prodL.toString());
    setDescription(item.description);
    setText(
      item.createdAt.getDate().toString().padStart(2, "0") +
        "/" +
        (item.createdAt.getMonth() + 1).toString().padStart(2, "0") +
        "/" +
        item.createdAt.getFullYear().toString()
    );
  };

  const handleDeletePress = () => {
    console.log("Excluir pressionado");
  };

  //Função para formatar os valores mostrado na tela pelo tipo escolhido
  const formatarResultado = (valorRecebido, tipo) => {
    let formattedResult = "";
    if (tipo == "preco") {
      const result = valorRecebido.toFixed(2);
      formattedResult = `R$ ${result.replace(".", ",")}`;
    } else if (tipo == "prod") {
      const result = valorRecebido.toFixed(2);
      formattedResult = `${result.replace(".", ",")} L`;
    }
    return formattedResult;
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
    const isItemSelected = item._id === selectedItemId;

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
              onPress={handleEditPress(item)}
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
        {shouldShowDetalhes && isItemSelected && (
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
                <Text style={styles.textContent}>Produção: </Text>
                <Text style={styles.textContent}>
                  {formatarResultado(item.prodL, "prod")}
                </Text>
              </View>
              <View style={styles.modalContent}>
                <Text style={styles.textContent}>Preco: </Text>
                <Text style={styles.textContent}>
                  {formatarResultado(item.precoL, "preco")}
                </Text>
              </View>
              <View style={styles.modalContent}>
                <Text style={styles.textContent}>Valor Total: </Text>
                <Text style={styles.textContent}>
                  {formatarResultado(item.precoL * item.prodL, "preco")}
                </Text>
              </View>
              <Text style={styles.textContent}>
                Descrição: {item.description}
              </Text>
            </View>
          </View>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FiltrosData listaRecebida={listaLeite} />
      <FlatList
        style={[styles.lista]}
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
              date={date}
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
            />
          </View>
          <View style={styles.containerinfos}>
            <Text style={styles.tituloinfo}>Descrição:</Text>
            <TextInput
              style={styles.detalhe}
              value={description}
              onChangeText={setDescription}
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContent: {
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
