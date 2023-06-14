import * as React from "react";
import { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  FlatList,
  Dimensions,
} from "react-native";
import styles from "../../styles";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import BezierChartFaturamentoReb from "../../../../components/Graficos/BezierChartFaturamentoReb";
import { Button, Chip, Divider, IconButton } from "react-native-paper";
import { Colors } from "../../../../styles";
import { AuthContext } from "../../../../contexts/auth";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { scale, verticalScale } from "react-native-size-matters";
import { ScrollView } from "react-native";

function FaturamentoReb({ navigation }) {
  const { precoLeiteReb } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [shouldShowDetalhes, setShouldShowDetalhes] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  //STATES FILTROS
  const { listaLeiteReb } = useContext(AuthContext);
  const [lista, setLista] = useState(listaLeiteReb);
  const [lista1, setLista1] = useState([]);
  const [listaFiltrada, setListaFiltrada] = useState([]);
  const [startDate, setStartDate] = useState(""); //Filtro Intervalo entre datas
  const [textStartDate, setTextStartDate] = useState("Data Inicial"); //Filtro Intervalo entre datas
  const [endDate, setEndDate] = useState(""); //Filtro Intervalo entre datas
  const [textEndDate, setTextEndDate] = useState("Data Final"); //Filtro Intervalo entre datas
  const [isStartDatePickerVisible, setIsStartDatePickerVisible] =
    useState(false);
  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);
  const [tipoChipValue, setTipoChipValue] = useState(null);
  const [textTipoChipValue, setTextTipoChipValue] = useState("Tipo de receita");
  const [dataChipValue, setDataChipValue] = React.useState(1);
  const [textDataChipValue, setTextDataChipValue] = useState("Período");
  const [valorChipValue, setValorChipValue] = React.useState(null);
  const [textValorChipValue, setTextValorChipValue] = useState("Valores");
  const [modalFiltrosVisible, setModalFiltrosVisible] = useState(false);
  //FIM STATES FILTROS

  //INICIO FILTROS
  useEffect(() => {
    setListaFiltrada(lista);
    setLista1(lista);
  }, [lista]);

  useEffect(() => {
    setLista(listaLeiteReb);
  }, [listaLeiteReb]);

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

  //Filtro por tipo de despesas
  useEffect(() => {
    if (tipoChipValue === 1) {
      const listaTipoRemedio = listaLeiteReb.filter((item) => {
        return item.tipo === 1;
      });
      setListaFiltrada(listaTipoRemedio);
      setLista(listaTipoRemedio);
      setTextTipoChipValue("Leite");
    } else if (tipoChipValue === 2) {
      const listaTipoVenda = listaLeiteReb.filter((item) => {
        return item.tipo === 2;
      });
      setListaFiltrada(listaTipoVenda);
      setLista(listaTipoVenda);
      setTextTipoChipValue("Vendas");
    } else {
      setTextTipoChipValue("Tipo de receita");
      setListaFiltrada(listaLeiteReb);
      setLista(listaLeiteReb);
    }
  }, [tipoChipValue]);

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
          return a.precoL * a.prodL - b.precoL * b.prodL;
        });
        return sortedItems;
      };
      const crescente = filtrarPorValores(listaFiltrada);
      setListaFiltrada(crescente);
      setTextValorChipValue("Crescente");
    } else if (valorChipValue === 2) {
      const filtrarPorValores = (lista) => {
        const sortedItems = [...lista].sort((a, b) => {
          return b.precoL * b.prodL - a.precoL * a.prodL;
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

  const handleTipoChipPress = (value) => {
    setTipoChipValue(value === tipoChipValue ? null : value);
    setDataChipValue(null);
    setValorChipValue(null);
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
    if (tipo === "tipo") {
      const valorValoresValidos = [1, 2];
      teste = valorValoresValidos.includes(tipoChipValue);
    } else if (tipo === "data") {
      const dataValoresValidos = [1, 2, 3, 4, 5, 6];
      teste = dataValoresValidos.includes(dataChipValue);
    } else if (tipo === "valor") {
      const valorValoresValidos = [1, 2];
      teste = valorValoresValidos.includes(valorChipValue);
    }
    return teste;
  };

  //FIM FILTROS----------------------------------------------------------------

  function toggleModal() {
    setModalVisible(!isModalVisible);
  }
  const imgbg1 = "../../../../../assets/bg2.jpg";

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

  const formatarResultado = (valorRecebido, tipo) => {
    let formattedResult = "";
    if (tipo === "preco") {
      const result = valorRecebido.toFixed(2);
      formattedResult = `R$ ${result.replace(".", ",")}`;
    } else if (tipo == "litro") {
      const result = valorRecebido.toFixed(2);
      formattedResult = `${result.replace(".", ",")} L`;
    } else if (tipo === "peso") {
      const result = valorRecebido.toFixed(2);
      formattedResult = `${result.replace(".", ",")} Kg`;
    } else if (tipo === "data") {
      let valorAFormatar = new Date(valorRecebido);
      formattedResult = `${
        valorAFormatar.getDate().toString().padStart(2, 0) +
        "/" +
        (valorAFormatar.getMonth() + 1).toString().padStart(2, 0) +
        "/" +
        valorAFormatar.getFullYear().toString()
      }`;
    }
    return formattedResult;
  };

  const checkTipo = (item) => {
    if (item.tipo === 1) {
      return "Leite";
    } else {
      return "Venda";
    }
  };

  const renderItem = ({ item }) => {
    const tipo = checkTipo(item);
    const isItemSelected = item._id === selectedItemId;
    return (
      <>
        <TouchableOpacity
          style={styles.listaDet}
          onPress={() => handleItemPress(item._id)}
        >
          <View style={styles.containerTituloBotao}>
            <Text style={[styles.tituloBotao, { flex: 1 }]}>
              {formatarResultado(item.createdAt, "data")}
            </Text>
            <Text style={[styles.tituloBotao, { flex: 1 }]}>
              {formatarResultado(item.prodL * item.precoL, "preco")}
            </Text>
          </View>
        </TouchableOpacity>
        {shouldShowDetalhes && isItemSelected && (
          <View style={[styles.containerDetalhes]}>
            <View>
              <Text style={styles.tituloDetalhes}>
                Detalhes {checkTipo(item)}
              </Text>
            </View>
            <View style={styles.modalContainerText}>
              {tipo === "Venda" ? (
                <View style={styles.modalContent}>
                  <Text style={styles.textContent}>Nome do animal: </Text>
                  <Text style={styles.textContent}>{item.nomeProd}</Text>
                </View>
              ) : null}
              <View style={styles.modalContent}>
                <Text style={styles.textContent}>Data: </Text>
                <Text style={styles.textContent}>
                  {formatarResultado(item.createdAt, "data")}
                </Text>
              </View>
              <View style={styles.modalContent}>
                <Text style={styles.textContent}>Horário: </Text>
                <Text style={styles.textContent}>
                  {item.createdAt.toLocaleTimeString()}
                </Text>
              </View>
              {tipo === "Leite" ? (
                <>
                  <View style={styles.modalContent}>
                    <Text style={styles.textContent}>Produção: </Text>
                    <Text style={styles.textContent}>
                      {formatarResultado(item.prodL, "litro")}
                    </Text>
                  </View>
                  <View style={styles.modalContent}>
                    <Text style={styles.textContent}>Preço: </Text>
                    <Text style={styles.textContent}>
                      {formatarResultado(item.precoL, "preco")}
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.modalContent}>
                    <Text style={styles.textContent}>Peso: </Text>
                    <Text style={styles.textContent}>
                      {formatarResultado(item.prodL, "peso")}
                    </Text>
                  </View>
                  <View style={styles.modalContent}>
                    <Text style={styles.textContent}>Preço por arroba: </Text>
                    <Text style={styles.textContent}>
                      {formatarResultado(item.precoL, "preco")}
                    </Text>
                  </View>
                </>
              )}
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
  function getReceitas() {
    if (typeof precoLeiteReb !== "undefined") {
      return Number(precoLeiteReb);
    } else {
      return 0;
    }
  }
  const receitas = getReceitas().toFixed(2);
  const formattedReceitas = `R$ ${receitas.replace(".", ",")}`;
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgbg}
        // source={require(imgbg1)}
        imageStyle={{ opacity: 0.3 }}
      >
        <View style={styles.containergeral}>
          <View style={styles.BTN_detalhes}>
            <TouchableOpacity
              onPress={() => {
                toggleModal();
              }}
            >
              <Text style={styles.texto}>Total de receitas:</Text>
              <Text style={styles.textoValorPos}>{formattedReceitas}</Text>
              <View style={styles.lineStyle} />
              <Text style={styles.preGraf}>
                Clique no gráfico para mais detalhes.
              </Text>
              <View style={styles.containerChart}>
                <BezierChartFaturamentoReb />
              </View>
              <Modal
                isVisible={isModalVisible}
                coverScreen={true}
                statusBarTranslucent={true}
                backdropColor={Colors.black}
                deviceHeight={Dimensions.get("screen").height}
                backdropOpacity={0.5}
                animationIn="slideInUp"
                animationOut="slideOutDown"
              >
                <View style={styles.modalContainer}>
                  <Text style={styles.tituloModal}>Detalhes de receitas:</Text>
                  {/*filtros*/}
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
                        (tipoChipValue || dataChipValue || dataChipValue) &&
                          styles.chipSelected,
                      ]}
                      textColor={Colors.white}
                      labelStyle={{
                        fontSize: scale(14),
                        color: Colors.white,
                      }}
                      icon={() => (
                        <Icon name="filter" size={26} color="white" />
                      )}
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
                        handleChipPress("tipo") && styles.chipSelected,
                      ]}
                      textStyle={{
                        fontSize: scale(14),
                        color: Colors.white,
                      }}
                      icon={() => (
                        <Icon name="calendar" size={20} color="white" />
                      )}
                    >
                      <Text>{textTipoChipValue}</Text>
                    </Chip>
                    <Chip
                      style={[
                        styles.chipFiltroReceita,
                        handleChipPress("data") && styles.chipSelected,
                      ]}
                      textStyle={{
                        fontSize: scale(14),
                        color: Colors.white,
                      }}
                      icon={() => (
                        <Icon name="calendar" size={20} color="white" />
                      )}
                    >
                      <Text>{textDataChipValue}</Text>
                    </Chip>
                    <Chip
                      style={[
                        styles.chipFiltroReceita,
                        handleChipPress("valor") && styles.chipSelected,
                      ]}
                      textStyle={{
                        fontSize: scale(14),
                        color: Colors.white,
                      }}
                      icon={() => (
                        <FontAwesome5
                          name="dollar-sign"
                          size={20}
                          color="white"
                        />
                      )}
                    >
                      <Text>{textValorChipValue}</Text>
                    </Chip>
                  </ScrollView>
                  <Modal
                    coverScreen={true}
                    backdropColor={"#000"}
                    backdropOpacity={0.5}
                    onBackButtonPress={() => setModalFiltrosVisible(false)}
                    onBackdropPress={() => setModalFiltrosVisible(false)}
                    isVisible={modalFiltrosVisible}
                    animationIn="fadeInLeftBig"
                    animationInTiming={600}
                    animationOut={"fadeOutRightBig"}
                    animationOutTiming={600}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                    statusBarTranslucent
                  >
                    <SafeAreaView style={styles.containerFiltro}>
                      <View style={styles.modalContainerFiltro}>
                        <View style={styles.topFiltros}>
                          <TouchableOpacity
                            onPress={() => {
                              setTipoChipValue(null);
                              setDataChipValue(null);
                              setValorChipValue(null);
                              setListaFiltrada(listaLeiteReb);
                            }}
                          >
                            <Text style={styles.txtLimparFiltro}>Limpar</Text>
                          </TouchableOpacity>
                          <View style={styles.containerTituloModalFiltro}>
                            <Text style={styles.tituloinfo}>Filtros</Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => setModalFiltrosVisible(false)}
                          >
                            <AntDesign
                              name="close"
                              size={20}
                              color={Colors.white}
                            />
                          </TouchableOpacity>
                        </View>
                        <Divider
                          bold="true"
                          style={{ marginVertical: scale(4) }}
                        />
                        <Text style={styles.tituloinfo1}>Tipo de receita</Text>
                        <View style={styles.teste}>
                          <Chip
                            style={[
                              styles.chipsFiltro,
                              tipoChipValue === 1 && styles.chipSelected,
                            ]}
                            onPress={() => handleTipoChipPress(1)}
                            textStyle={styles.chipModalFiltro}
                          >
                            <Text> Leite </Text>
                          </Chip>
                          <Chip
                            style={[
                              styles.chipsFiltro,
                              tipoChipValue === 2 && styles.chipSelected,
                            ]}
                            onPress={() => handleTipoChipPress(2)}
                            textStyle={styles.chipModalFiltro}
                          >
                            <Text>Vendas</Text>
                          </Chip>
                        </View>
                        <Divider
                          bold="true"
                          style={{ marginVertical: scale(4) }}
                        />
                        <Text style={styles.tituloinfo1}>Período</Text>
                        <View style={styles.teste}>
                          <Chip
                            style={[
                              styles.chipsFiltro,
                              dataChipValue === 1 && styles.chipSelected,
                            ]}
                            onPress={() => handleDataChipPress(1)}
                            textStyle={styles.chipModalFiltro}
                          >
                            <Text>7 dias</Text>
                          </Chip>
                          <Chip
                            style={[
                              styles.chipsFiltro,
                              dataChipValue === 2 && styles.chipSelected,
                            ]}
                            onPress={() => handleDataChipPress(2)}
                            textStyle={styles.chipModalFiltro}
                          >
                            <Text>Último mês</Text>
                          </Chip>
                          <Chip
                            style={[
                              styles.chipsFiltro,
                              dataChipValue === 3 && styles.chipSelected,
                            ]}
                            onPress={() => handleDataChipPress(3)}
                            textStyle={styles.chipModalFiltro}
                          >
                            <Text>3 meses</Text>
                          </Chip>
                          <Chip
                            style={[
                              styles.chipsFiltro,
                              dataChipValue === 4 && styles.chipSelected,
                            ]}
                            onPress={() => handleDataChipPress(4)}
                            textStyle={styles.chipModalFiltro}
                          >
                            <Text>6 meses</Text>
                          </Chip>
                          <Chip
                            style={[
                              styles.chipsFiltro,
                              dataChipValue === 5 && styles.chipSelected,
                            ]}
                            onPress={() => handleDataChipPress(5)}
                            textStyle={styles.chipModalFiltro}
                          >
                            <Text>Todas as datas</Text>
                          </Chip>
                          <Chip
                            style={[
                              styles.chipsFiltro,
                              dataChipValue === 6 && styles.chipSelected,
                            ]}
                            onPress={() => handleDataChipPress(6)}
                            textStyle={styles.chipModalFiltro}
                          >
                            <Text>Customizado</Text>
                          </Chip>
                        </View>
                        {dataChipValue === 6 && (
                          <>
                            <View style={styles.containerBotoes}>
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
                                  <Text style={styles.textoFiltro}>
                                    {textEndDate}
                                  </Text>
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
                            <View style={styles.containerBotoes}>
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
                          style={{ marginVertical: scale(4) }}
                        />
                        <Text style={styles.tituloinfo1}>Valores</Text>
                        <View style={styles.teste}>
                          <Chip
                            style={[
                              styles.chipsFiltro,
                              valorChipValue === 1 && styles.chipSelected,
                            ]}
                            onPress={() => handleValorChipPress(1)}
                            textStyle={styles.chipModalFiltro}
                          >
                            <Text>Crescente</Text>
                          </Chip>
                          <Chip
                            style={[
                              styles.chipsFiltro,
                              valorChipValue === 2 && styles.chipSelected,
                            ]}
                            onPress={() => handleValorChipPress(2)}
                            textStyle={styles.chipModalFiltro}
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
                  <View style={{ marginBottom: verticalScale(10) }}>
                    <TouchableOpacity
                      style={styles.botaopressM}
                      onPress={() => {
                        toggleModal();
                      }}
                    >
                      <Text style={styles.tituloBotao}>{"Voltar"}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </TouchableOpacity>
          </View>
          <View style={styles.containervoltar}>
            <TouchableOpacity
              style={styles.botaopress}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.tituloBotao}>{"Voltar"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
export default FaturamentoReb;
