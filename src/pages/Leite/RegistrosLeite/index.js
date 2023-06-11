import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import FiltrosData from "../../../components/Filtros/FiltrosData";
import { AuthContext } from "../../../contexts/auth";
import { useMainContext } from "../../../contexts/RealmContext";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Colors } from "../../../styles";
import styles from "./styles";
import { TextInput, MD3Colors, HelperText } from "react-native-paper";
function RegistrosLeite({ navigation }) {
  const realm = useMainContext();
  const { rebID, ListaFiltrada, listaFiltrada, ListaDadosLeiteReb } =
    useContext(AuthContext);
  const [listaLeite, setListaLeite] = useState([]);
  const [shouldShowDetalhes, setShouldShowDetalhes] = useState(false);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [description, setDescription] = useState("");
  const [prodLV, setProdLV] = useState("");
  const [idDoItemSelecionado, setIdDoItemSelecionado] = useState("");
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isVolumeProdValid, setIsVolumeProdValid] = useState(true);
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
      ListaDadosLeiteReb(dataReceitasreb.receitas);
      //ListaFiltrada(dataReceitasreb.receitas);

      dataReceitasreb.receitas.addListener((values) => {
        const sortedValues = [...values].sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
        ListaDadosLeiteReb(sortedValues);

        const lista7Dias = sortedValues.filter((item) => {
          const dataHoje = new Date();
          dataHoje.setHours(0, 0, 0, 0);
          const dataSeteDiasAtras = new Date(dataHoje);
          dataSeteDiasAtras.setDate(dataHoje.getDate() - 7);
          const itemDataDeCriacao = new Date(item.createdAt);
          itemDataDeCriacao.setHours(0, 0, 0, 0);
          return (
            itemDataDeCriacao >= dataSeteDiasAtras &&
            itemDataDeCriacao <= dataHoje
          );
        });
        ListaFiltrada(lista7Dias); // Para a lista retornar por padrão os valores de 7 dias
      });
    }
  }, [realm]);

  async function UpdateinfoLeite() {
    if (realm) {
      try {
        realm.write(() => {
          const cleanedText = prodLV.replace(",", ".");
          const prodL = parseFloat(cleanedText);
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
          setModalEditarVisible(false);
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
      // Se o itemId for o mesmo do item selecionado atualmente,feche o modal de detalhes
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
    const cleanedText = item.prodL.toString().replace(".", ",");
    setProdLV(cleanedText);
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
  function handleVolumeProdChange(text) {
    const cleanedText = text.replace(",", ".");
    const parsedValue = parseFloat(cleanedText);
    const isValid = !isNaN(parsedValue) && parsedValue > 0;
    setIsVolumeProdValid(isValid);
    setProdLV(text);
  }
  function validCheck() {
    if (prodLV.length === 0) {
      if (prodLV.length === 0) {
        setIsVolumeProdValid(false);
      }
    } else if (isVolumeProdValid) {
      UpdateinfoLeite();
    }
  }
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
            <View style={styles.containerTextList}>
              <Text style={styles.itemText}>{formattedData}</Text>
              <Text style={styles.itemText}>{formattedResult}</Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditPress(item)}
            >
              <AntDesign name="edit" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeletePress}
            >
              <AntDesign name="delete" size={24} color="white" />
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
      <View style={styles.containergeral}>
        <View style={{ paddingHorizontal: 12}}>
          <FiltrosData listaAFiltrar={"dadosLeite"} ordenarPor={"litro"} />
        </View>
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
          coverScreen={true}
          backdropColor="black"
          backdropOpacity={0.5}
          visible={modalEditarVisible}
          animationType="slide"
          transparent={true}
          statusBarTranslucent
        >
          <View style={styles.modalContainer}>
            <View style={styles.containergeralmodal}>
              <View style={styles.containerinfos}>
                <TouchableOpacity style={styles.teste} onPress={showDatePicker}>
                  <Text style={styles.tituloinfo}>{text}</Text>
                  <AntDesign name="calendar" size={30} color="white" />
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
                <TextInput
                  label="Litros de Leite"
                  style={styles.textInput}
                  placeholderTextColor={Colors.grey}
                  textColor={Colors.black}
                  activeUnderlineColor={Colors.green}
                  underlineColor={Colors.blue}
                  underlineStyle={{ paddingBottom: 3 }}
                  value={prodLV}
                  onChangeText={handleVolumeProdChange}
                  keyboardType="decimal-pad"
                  inputMode="decimal"
                  error={!isVolumeProdValid}
                />
                <HelperText
                  type="error"
                  style={{
                    color: MD3Colors.error60,
                    fontSize: 14,
                    lineHeight: 12,
                  }}
                  visible={!isVolumeProdValid}
                  padding="20"
                >
                  Digite o volume da unidade do produto.
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
              <View style={styles.modalContainerBotoes}>
                <TouchableOpacity
                  style={styles.botaopressM}
                  onPress={() => {
                    validCheck();
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
          </View>
        </Modal>
      </View>
    </View>
  );
}
export default RegistrosLeite;
