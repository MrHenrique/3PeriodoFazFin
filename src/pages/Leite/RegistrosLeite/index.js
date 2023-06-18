import * as React from "react";
import { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
} from "react-native";
import Modal from "react-native-modal";
import { Button, Chip, Divider, IconButton } from "react-native-paper";
import { AntDesign, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../../../contexts/auth";
import { useMainContext } from "../../../contexts/RealmContext";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Colors } from "../../../styles";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput, MD3Colors, HelperText } from "react-native-paper";
import { scale } from "react-native-size-matters";
import { ScrollView } from "react-native";

function RegistrosLeite({ navigation }) {
  const realm = useMainContext();
  const { rebID } = useContext(AuthContext);
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
  //STATES FILTROS
  const [listaBuscada, setListaBuscada] = useState([]);
  const [lista, setLista] = useState(listaBuscada);
  const [lista1, setLista1] = useState([]);
  const [listaFiltrada, setListaFiltrada] = useState([]);
  const [startDate, setStartDate] = useState(""); //Filtro Intervalo entre datas
  const [textStartDate, setTextStartDate] = useState("Data Inicial"); //Filtro Intervalo entre datas
  const [endDate, setEndDate] = useState(""); //Filtro Intervalo entre datas
  const [textEndDate, setTextEndDate] = useState("Data Final"); //Filtro Intervalo entre datas
  const [isStartDatePickerVisible, setIsStartDatePickerVisible] =
    useState(false);
  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);
  const [dataChipValue, setDataChipValue] = React.useState(1);
  const [textDataChipValue, setTextDataChipValue] = useState("Período");
  const [valorChipValue, setValorChipValue] = React.useState(null);
  const [textValorChipValue, setTextValorChipValue] = useState("Valores");
  const [modalFiltrosVisible, setModalFiltrosVisible] = useState(false);
  const [contadorFiltros, setContadorFiltros] = useState(0);
  //FIM STATES FILTROS

  //INICIO FILTROS
  useEffect(() => {
    let count = 0;

    if (dataChipValue != null) {
      count++;
    }
    if (valorChipValue != null) {
      count++;
    }

    setContadorFiltros(count);
  }, [dataChipValue, valorChipValue]);

  useEffect(() => {
    setListaFiltrada(lista);
    setLista1(lista);
  }, [lista]);

  useEffect(() => {
    setLista(
      listaBuscada.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      })
    );
  }, [listaBuscada]);

  //Codigo do DateTimePickerModal
  //Data Inicial
  const showStartDatePicker = () => {
    setIsStartDatePickerVisible(true);
  };
  const hideStartDatePicker = () => {
    setIsStartDatePickerVisible(false);
  };
  const handleStartDateConfirm = (dateStart) => {
    let tempDateStart = new Date(dateStart);
    let fDateStart =
      tempDateStart.getDate().toString().padStart(2, "0") +
      "/" +
      (tempDateStart.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      tempDateStart.getFullYear();
    setTextStartDate(fDateStart);
    setStartDate(dateStart);
    hideStartDatePicker();
  };

  //Data Final
  const showEndDatePicker = () => {
    setIsEndDatePickerVisible(true);
  };
  const hideEndDatePicker = () => {
    setIsEndDatePickerVisible(false);
  };
  const handleEndDateConfirm = (dateEnd) => {
    let tempDateEnd = new Date(dateEnd);
    let fDateEnd =
      tempDateEnd.getDate().toString().padStart(2, "0") +
      "/" +
      (tempDateEnd.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      tempDateEnd.getFullYear();
    setTextEndDate(fDateEnd);
    setEndDate(dateEnd);
    hideEndDatePicker();
  };

  // Filtro por Datas
  useEffect(() => {
    const filtrarPorData = (lista, dataInicio, dataFim) => {
      return lista.filter((item) => {
        const itemDataDeCriacao = new Date(item.createdAt);
        itemDataDeCriacao.setHours(0, 0, 0, 0);
        return itemDataDeCriacao >= dataInicio && itemDataDeCriacao <= dataFim;
      });
    };
    if (dataChipValue === 1) {
      // Ultimos 7 dias
      const dataHoje = new Date();
      dataHoje.setHours(0, 0, 0, 0);
      const dataSeteDiasAtras = new Date(dataHoje);
      dataSeteDiasAtras.setDate(dataHoje.getDate() - 7);
      const listaUltimosSete = filtrarPorData(
        lista,
        dataSeteDiasAtras,
        dataHoje
      );
      setLista1(listaUltimosSete);
      setListaFiltrada(listaUltimosSete);
      setTextDataChipValue("7 dias");
    } else if (dataChipValue === 2) {
      // Ultimos mês
      const dataHoje = new Date();
      dataHoje.setHours(0, 0, 0, 0);
      const dataTrintaDiasAtras = new Date(dataHoje);
      dataTrintaDiasAtras.setDate(dataHoje.getDate() - 30);
      const listaUltimosTrinta = filtrarPorData(
        lista,
        dataTrintaDiasAtras,
        dataHoje
      );
      setLista1(listaUltimosTrinta);
      setListaFiltrada(listaUltimosTrinta);
      setTextDataChipValue("Último mês");
    } else if (dataChipValue === 3) {
      //Ultimos 3 meses
      const dataHoje = new Date();
      dataHoje.setHours(0, 0, 0, 0);
      const dataUltimosTresMeses = new Date(dataHoje);
      dataUltimosTresMeses.setDate(dataHoje.getDate() - 90);
      const listaUltimosTresMeses = filtrarPorData(
        lista,
        dataUltimosTresMeses,
        dataHoje
      );
      setLista1(listaUltimosTresMeses);
      setListaFiltrada(listaUltimosTresMeses);
      setTextDataChipValue("3 meses");
    } else if (dataChipValue === 4) {
      //Ultimos 6 meses
      const dataHoje = new Date();
      dataHoje.setHours(0, 0, 0, 0);
      const dataUltimosSeisMeses = new Date(dataHoje);
      dataUltimosSeisMeses.setDate(dataHoje.getDate() - 180);
      const listaUltimosSeisMeses = filtrarPorData(
        lista,
        dataUltimosSeisMeses,
        dataHoje
      );
      setLista1(listaUltimosSeisMeses);
      setListaFiltrada(listaUltimosSeisMeses);
      setTextDataChipValue("6 meses");
    } else if (dataChipValue === 5) {
      //todas as datas
      setLista1(lista);
      setListaFiltrada(lista);
      setTextDataChipValue("Todas as datas");
    } else if (dataChipValue === 6) {
      setTextDataChipValue("Customizado");
    } else {
      setTextDataChipValue("Período");
      setLista1(lista);
      setListaFiltrada(lista);
    }
  }, [dataChipValue]);

  // Filtro por Valores
  useEffect(() => {
    if (valorChipValue === 1) {
      const filtrarPorValores = (lista) => {
        const sortedItems = [...lista].sort((a, b) => {
          return a.prodL - b.prodL;
        });
        return sortedItems;
      };
      const crescente = filtrarPorValores(listaFiltrada);
      setListaFiltrada(crescente);
      setTextValorChipValue("Crescente");
    } else if (valorChipValue === 2) {
      const filtrarPorValores = (lista) => {
        const sortedItems = [...lista].sort((a, b) => {
          return b.prodL - a.prodL;
        });
        return sortedItems;
      };
      const decrescente = filtrarPorValores(listaFiltrada);
      setListaFiltrada(decrescente);
      setTextValorChipValue("Decrescente");
    } else {
      setTextValorChipValue("Valores");
    }
  }, [valorChipValue]);

  //Código para retornar uma lista do intevalo selecionado pelo usuário (FILTRO INTERVALO ENTRE DATAS)
  const filtrarIntervalo = () => {
    if (startDate != "" && endDate != "") {
      const listaFiltradaIntervalo = lista.filter((item) => {
        //pega todos os itens da lista que foi puxada da (lista)
        const itemDataDeCriacao = new Date(item.createdAt); //cria uma nova data com a data do (createdAt do item) e atribui a variavel itemDataDeCriacao
        const dataInicio = new Date(startDate); //pega a data de inicio escolhida pelo usuario
        dataInicio.setHours(0, 0, 0, 0); //ajusta o horario para 00:00:00 para garantir que a data de inicio seja no começo do dia.
        const dataFim = new Date(endDate); //pega a data final escolhida pelo usuario
        dataFim.setHours(23, 59, 59, 999); //ajusta o horario para 23:59:59 para garantir que a data final sejá no final do dia.
        return itemDataDeCriacao >= dataInicio && itemDataDeCriacao <= dataFim;
      });
      setLista1(listaFiltradaIntervalo);
      setListaFiltrada(listaFiltradaIntervalo);
    }
  };

  const handleDataChipPress = (value) => {
    setDataChipValue(value === dataChipValue ? null : value);
    setValorChipValue(null);
  };

  const handleValorChipPress = (value) => {
    setValorChipValue(
      value === valorChipValue
        ? () => {
            setListaFiltrada(lista1); // se clicar no botao do cres/decres e ele ja tiver ativo volta para a lista antiga
            return null;
          }
        : value
    );
  };

  const handleChipPress = (tipo) => {
    let teste = false;
    if (tipo === "data") {
      const dataValoresValidos = [1, 2, 3, 4, 5, 6];
      teste = dataValoresValidos.includes(dataChipValue);
    } else if (tipo === "valor") {
      const valorValoresValidos = [1, 2];
      teste = valorValoresValidos.includes(valorChipValue);
    }
    return teste;
  };
  //FIM FILTROS----------------------------------------------------------------

  useEffect(() => {
    const fetchReceitas = async () => {
      if (!realm) return;

      const dataReceitasreb = realm.objectForPrimaryKey("RebanhoSchema", rebID);
      const filteredReceitas = dataReceitasreb.receitas.filter(
        (item) => item.tipo === 1
      );
      setListaBuscada(filteredReceitas);
    };

    const sortReceitas = (values) => {
      const sortedValues = [...values].filter((item) => item.tipo === 1);
      setListaBuscada(sortedValues);
    };

    fetchReceitas();

    if (realm) {
      const dataReceitasreb = realm.objectForPrimaryKey("RebanhoSchema", rebID);
      const listener = (values) => {
        sortReceitas(values);
      };
      dataReceitasreb.receitas.addListener(listener);

      return () => {
        dataReceitasreb.receitas.removeListener(listener);
      };
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
              <AntDesign name="edit" size={scale(20)} color="white" />
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
        {/*filtros*/}
        <View style={styles.modalContainer}>
          <View
            style={{
              flexDirection: "row",
              margin: scale(10),
            }}
          >
            <Button
              contentStyle={{ marginVertical: scale(10) }}
              style={[
                styles.chipFiltroReceitaFiltro,
                (dataChipValue || valorChipValue) && styles.chipSelected,
              ]}
              textColor={Colors.white}
              labelStyle={{
                fontSize: scale(14),
                color: Colors.white,
              }}
              icon={() => <Icon name="filter" size={26} color="white" />}
              onPress={() => {
                setModalFiltrosVisible(true);
              }}
            >
              Filtros
            </Button>
          </View>
          <ScrollView
            style={{
              maxHeight: scale(40),
              marginHorizontal: scale(10),
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            fadingEdgeLength={100}
          >
            <Chip
              elevated="true"
              style={[
                styles.chipFiltroReceita,
                handleChipPress("data") && styles.chipSelected,
              ]}
              textStyle={{
                fontSize: scale(14),
                color: Colors.white,
              }}
              icon={() => <Icon name="calendar" size={20} color="white" />}
            >
              <Text>{textDataChipValue}</Text>
            </Chip>
            <Chip
              elevated="true"
              style={[
                styles.chipFiltroReceita,
                handleChipPress("valor") && styles.chipSelected,
              ]}
              textStyle={{
                fontSize: scale(14),
                color: Colors.white,
              }}
              icon={() => (
                <FontAwesome5 name="dollar-sign" size={20} color="white" />
              )}
            >
              <Text>{textValorChipValue}</Text>
            </Chip>
          </ScrollView>

          <Modal
            statusBarTranslucent
            coverScreen={true}
            backdropColor={Colors.black}
            backdropOpacity={0.5}
            isVisible={modalFiltrosVisible}
            onBackButtonPress={() => setModalFiltrosVisible(false)}
            onBackdropPress={() => setModalFiltrosVisible(false)}
            animationIn="fadeInLeftBig"
            animationInTiming={600}
            animationOut={"fadeOutRightBig"}
            animationOutTiming={600}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}
          >
            <SafeAreaView style={styles.containerFiltro}>
              <View style={styles.modalContainerFiltro}>
                <View style={styles.topFiltros}>
                  <TouchableOpacity
                    style={styles.BotaoLimparFiltro}
                    onPress={() => {
                      setDataChipValue(null);
                      setValorChipValue(null);
                      setListaFiltrada(listaBuscada);
                    }}
                  >
                    {dataChipValue || valorChipValue ? (
                      <Text style={styles.txtLimparFiltro}>
                        Limpar ({contadorFiltros})
                      </Text>
                    ) : null}
                  </TouchableOpacity>
                  <View style={styles.containerTituloModalFiltro}>
                    <Text style={styles.tituloinfo}>Filtros</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setModalFiltrosVisible(false)}
                  >
                    <AntDesign name="close" size={20} color={Colors.white} />
                  </TouchableOpacity>
                </View>
                <Divider
                  bold="true"
                  style={{ backgroundColor: "white", marginVertical: scale(4) }}
                />
                <Text style={styles.tituloinfo1}>Período</Text>
                <View style={styles.testeFiltro}>
                  <Chip
                    style={[
                      styles.chipsFiltro,
                      dataChipValue === 1 && styles.chipSelected,
                    ]}
                    onPress={() => handleDataChipPress(1)}
                    textStyle={[
                      styles.chipModalFiltro,
                      dataChipValue === 1 && { color: "white" },
                    ]}
                  >
                    <Text>7 dias</Text>
                  </Chip>
                  <Chip
                    style={[
                      styles.chipsFiltro,
                      dataChipValue === 2 && styles.chipSelected,
                    ]}
                    onPress={() => handleDataChipPress(2)}
                    textStyle={[
                      styles.chipModalFiltro,
                      dataChipValue === 2 && { color: "white" },
                    ]}
                  >
                    <Text>Último mês</Text>
                  </Chip>
                  <Chip
                    style={[
                      styles.chipsFiltro,
                      dataChipValue === 3 && styles.chipSelected,
                    ]}
                    onPress={() => handleDataChipPress(3)}
                    textStyle={[
                      styles.chipModalFiltro,
                      dataChipValue === 3 && { color: "white" },
                    ]}
                  >
                    <Text>3 meses</Text>
                  </Chip>
                  <Chip
                    style={[
                      styles.chipsFiltro,
                      dataChipValue === 4 && styles.chipSelected,
                    ]}
                    onPress={() => handleDataChipPress(4)}
                    textStyle={[
                      styles.chipModalFiltro,
                      dataChipValue === 4 && { color: "white" },
                    ]}
                  >
                    <Text>6 meses</Text>
                  </Chip>
                  <Chip
                    style={[
                      styles.chipsFiltro,
                      dataChipValue === 5 && styles.chipSelected,
                    ]}
                    onPress={() => handleDataChipPress(5)}
                    textStyle={[
                      styles.chipModalFiltro,
                      dataChipValue === 5 && { color: "white" },
                    ]}
                  >
                    <Text>Todas as datas</Text>
                  </Chip>
                  <Chip
                    style={[
                      styles.chipsFiltro,
                      dataChipValue === 6 && styles.chipSelected,
                    ]}
                    onPress={() => handleDataChipPress(6)}
                    textStyle={[
                      styles.chipModalFiltro,
                      dataChipValue === 6 && { color: "white" },
                    ]}
                  >
                    <Text>Customizado</Text>
                  </Chip>
                </View>
                {dataChipValue === 6 && (
                  <>
                    <View style={styles.containerBotoesFiltro}>
                      <TouchableOpacity
                        style={styles.botoes}
                        onPress={showStartDatePicker}
                      >
                        <View
                          style={{
                            flex: 1,
                          }}
                        >
                          <Text style={styles.textoFiltro}>
                            {textStartDate}
                          </Text>
                        </View>
                        <IconButton
                          icon={"calendar"}
                          size={20}
                          color={Colors.black}
                        />
                      </TouchableOpacity>
                      <DateTimePickerModal
                        isVisible={isStartDatePickerVisible}
                        mode="date"
                        onConfirm={handleStartDateConfirm}
                        onCancel={hideStartDatePicker}
                        maximumDate={new Date()}
                      />

                      <TouchableOpacity
                        style={styles.botoes}
                        onPress={showEndDatePicker}
                      >
                        <View
                          style={{
                            flex: 1,
                          }}
                        >
                          <Text style={styles.textoFiltro}>{textEndDate}</Text>
                        </View>
                        <IconButton
                          icon={"calendar"}
                          size={20}
                          color={Colors.black}
                        />
                      </TouchableOpacity>
                      <DateTimePickerModal
                        isVisible={isEndDatePickerVisible}
                        mode="date"
                        onConfirm={handleEndDateConfirm}
                        onCancel={hideEndDatePicker}
                        maximumDate={new Date()}
                      />
                    </View>
                    <View style={styles.containerBotoesFiltro}>
                      <TouchableOpacity
                        style={styles.botoes}
                        onPress={() => {
                          filtrarIntervalo();
                          setValorChipValue(null);
                        }}
                      >
                        <Text style={styles.textoFiltro}>Filtrar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.botoes}
                        onPress={() => {
                          setStartDate("");
                          setEndDate("");
                          setTextStartDate("Data Inicial");
                          setTextEndDate("Data Final");
                          setLista1(lista);
                          setListaFiltrada(lista);
                        }}
                      >
                        <Text style={styles.textoFiltro}>Limpar</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
                <Divider
                  bold="true"
                  style={{ backgroundColor: "white", marginVertical: scale(4) }}
                />
                <Text style={styles.tituloinfo1}>Valores</Text>
                <View style={styles.testeFiltro}>
                  <Chip
                    style={[
                      styles.chipsFiltro,
                      valorChipValue === 1 && styles.chipSelected,
                    ]}
                    onPress={() => handleValorChipPress(1)}
                    textStyle={[
                      styles.chipModalFiltro,
                      valorChipValue === 1 && { color: "white" },
                    ]}
                  >
                    <Text>Crescente</Text>
                  </Chip>
                  <Chip
                    style={[
                      styles.chipsFiltro,
                      valorChipValue === 2 && styles.chipSelected,
                    ]}
                    onPress={() => handleValorChipPress(2)}
                    textStyle={[
                      styles.chipModalFiltro,
                      valorChipValue === 2 && { color: "white" },
                    ]}
                  >
                    <Text>Decrescente</Text>
                  </Chip>
                </View>
              </View>
            </SafeAreaView>
          </Modal>
          {/*FIM FILTROS*/}
          <FlatList
            style={[styles.lista]}
            data={listaFiltrada}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />

          <View style={styles.containerButaoleitegeral}>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => navigation.navigate("Home")}
            >
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={styles.font}>{"Voltar"}</Text>
              </View>
              <MaterialIcons name="arrow-back" size={scale(24)} color="white" />
            </TouchableOpacity>
          </View>
          <Modal
            statusBarTranslucent
            coverScreen={true}
            backdropColor="black"
            backdropOpacity={0.5}
            isVisible={modalEditarVisible}
            animationType="slide"
            transparent={true}
            onBackButtonPress={() => setModalEditarVisible(!modalEditarVisible)}
            onBackdropPress={() => setModalEditarVisible(!modalEditarVisible)}
            animationIn="fadeInLeftBig"
            animationInTiming={600}
            animationOut="fadeOutRightBig"
            animationOutTiming={600}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}
          >
            <View style={styles.modalContainer}>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <View style={styles.containergeralmodal}>
                  <View style={styles.containerinfos}>
                    <TouchableOpacity
                      style={styles.btnModalEditDate}
                      onPress={showDatePicker}
                    >
                      <Text style={styles.TxtModalEditDate}>{text}</Text>
                      <AntDesign
                        name="calendar"
                        size={scale(26)}
                        color="white"
                      />
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
                      placeholderTextColor={Colors.darkgrey}
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
                      placeholderTextColor={Colors.darkgrey}
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
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
}
export default RegistrosLeite;
