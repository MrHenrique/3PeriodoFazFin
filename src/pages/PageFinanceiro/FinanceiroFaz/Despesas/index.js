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
  ScrollView,
} from "react-native";
import styles from "../../styles";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import BezierChartDespesas from "../../../../components/Graficos/BezierChartDespesas";
import { Colors } from "../../../../styles";
import { TextInput, Chip, IconButton, Divider } from "react-native-paper";
import { AuthContext } from "../../../../contexts/auth";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { scale, verticalScale } from "react-native-size-matters";

function Despesas({ navigation }) {
  const { precoCF } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [shouldShowDetalhes, setShouldShowDetalhes] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  //STATES FILTROS
  const { listaAli } = useContext(AuthContext);
  const [lista, setLista] = useState(listaAli);
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
  const [valorChipValue, setValorChipValue] = useState(null);
  const [dataChipValue, setDataChipValue] = useState(1);
  const [textTipoChipValue, setTextTipoChipValue] = useState(
    "Categoria de gastos"
  );
  const [textDataChipValue, setTextDataChipValue] = useState("Período");
  const [textValorChipValue, setTextValorChipValue] = useState("Valores");
  const [modalFiltrosVisible, setModalFiltrosVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [contadorFiltros, setContadorFiltros] = useState(0);
  //FIM STATES FILTROS

  //INICIO FILTROS
  useEffect(() => {
    let count = 0;

    if (tipoChipValue != null) {
      count++;
    }
    if (dataChipValue != null) {
      count++;
    }
    if (valorChipValue != null) {
      count++;
    }

    setContadorFiltros(count);
  }, [tipoChipValue, dataChipValue, valorChipValue]);

  useEffect(() => {
    if (searchText === "") {
      setListaFiltrada(lista);
    } else {
      setValorChipValue(null);
      setListaFiltrada(
        listaFiltrada.filter(
          (item) =>
            item.nomeProd.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [searchText]);

  useEffect(() => {
    setListaFiltrada(lista);
    setLista1(lista);
  }, [lista]);

  useEffect(() => {
    setLista(listaAli);
  }, [listaAli]);

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

  //Filtro por Categoria de gastos
  useEffect(() => {
    if (tipoChipValue === 1) {
      const listaRemedios = listaAli.filter((item) => {
        return item.volumeProd > 0;
      });
      setListaFiltrada(listaRemedios);
      setLista(listaRemedios);
      setTextTipoChipValue("Remédios");
    } else if (tipoChipValue === 2) {
      const listaAlimento = listaAli.filter((item) => {
        return item.pesoProd > 0;
      });
      setListaFiltrada(listaAlimento);
      setLista(listaAlimento);
      setTextTipoChipValue("Alimento");
    } else if (tipoChipValue === 3) {
      const listaOutrasDespesas = listaAli.filter((item) => {
        return item.pesoProd === 0 && item.volumeProd === 0;
      });
      setListaFiltrada(listaOutrasDespesas);
      setLista(listaOutrasDespesas);
      setTextTipoChipValue("Outras Despesas");
    } else {
      setTextTipoChipValue("Categoria de gastos");
      setListaFiltrada(listaAli);
      setLista(listaAli);
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
          return a.valorProd - b.valorProd;
        });
        return sortedItems;
      };
      const crescente = filtrarPorValores(listaFiltrada);
      setListaFiltrada(crescente);
      setTextValorChipValue("Crescente");
    } else if (valorChipValue === 2) {
      const filtrarPorValores = (lista) => {
        const sortedItems = [...lista].sort((a, b) => {
          return b.valorProd - a.valorProd;
        });
        return sortedItems;
      };
      const decrescente = filtrarPorValores(lista1);
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
      const valorValoresValidos = [1, 2, 3];
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

  //recebe volume ou peso, e retorna a categoria do produto
  const TipoAfter = (item) => {
    if (item.volumeProd > 0) {
      const categoriaProd = "Remédios";
      return categoriaProd;
    } else if (item.pesoProd > 0) {
      const categoriaProd = "Alimento";
      return categoriaProd;
    } else {
      const categoriaProd = "Outras Despesas";
      return categoriaProd;
    }
  };

  const renderItem = ({ item }) => {
    const categoriaProd = TipoAfter(item);
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
              {" "}
              {item.nomeProd.length < 10
                ? `${item.nomeProd}`
                : `${item.nomeProd.substring(0, scale(9))}...`}{" "}
            </Text>
            <Text style={[styles.tituloBotao, { flex: 1 }]}>
              {" "}
              {formatarResultado(item.valorProd * item.qtdProd, "preco")}
            </Text>
          </View>
        </TouchableOpacity>
        {shouldShowDetalhes && isItemSelected && (
          <View style={[styles.containerDetalhes]}>
            <View>
              <Text style={styles.tituloDetalhes}>Detalhes</Text>
            </View>
            <View>
              <Text style={styles.tituloDetalhes}>{TipoAfter(item)}</Text>
            </View>
            <View style={styles.modalContainerText}>
              <View style={styles.modalContent}>
                <Text style={styles.textContent}>Nome: </Text>
                <Text style={styles.textContent}>
                  {item.nomeProd.length < verticalScale(22)
                    ? `${item.nomeProd}`
                    : `${item.nomeProd.substring(0, verticalScale(22))}...`}
                </Text>
              </View>
              <View style={styles.modalContent}>
                <Text style={styles.textContent}>Data: </Text>
                <Text style={styles.textContent}>
                  {formatarResultado(item.createdAt, "data")}
                </Text>
              </View>
              <View style={styles.modalContent}>
                <Text style={styles.textContent}>Horario: </Text>
                <Text style={styles.textContent}>
                  {item.createdAt.toLocaleTimeString()}
                </Text>
              </View>
              {categoriaProd === "Alimento" ? (
                <>
                  <View style={styles.modalContent}>
                    <Text style={styles.textContent}>Preço Unitário: </Text>
                    <Text style={styles.textContent}>
                      {formatarResultado(
                        item.valorProd / item.pesoProd,
                        "preco"
                      )}
                    </Text>
                  </View>
                  <View style={styles.modalContent}>
                    <Text style={styles.textContent}>Peso Utilizado: </Text>
                    <Text style={styles.textContent}>
                      {formatarResultado(item.pesoProd, "peso")}
                    </Text>
                  </View>
                  <View style={styles.modalContent}>
                    <Text style={styles.textContent}>Valor Total: </Text>
                    <Text style={styles.textContent}>
                      {formatarResultado(item.valorProd, "preco")}
                    </Text>
                  </View>
                  <Text style={styles.textContent}>
                    Descrição: {item.obserProd}
                  </Text>
                </>
              ) : categoriaProd === "Remédios" ? (
                <>
                  <View style={styles.modalContent}>
                    <Text style={styles.textContent}>Preço Unitário: </Text>
                    <Text style={styles.textContent}>
                      {formatarResultado(
                        item.valorProd / item.volumeProd,
                        "preco"
                      )}
                    </Text>
                  </View>
                  <View style={styles.modalContent}>
                    <Text style={styles.textContent}>Volume Usado: </Text>
                    <Text style={styles.textContent}>
                      {formatarResultado(item.volumeProd, "litro")}
                    </Text>
                  </View>
                  <View style={styles.modalContent}>
                    <Text style={styles.textContent}>Valor Total: </Text>
                    <Text style={styles.textContent}>
                      {formatarResultado(item.valorProd, "preco")}
                    </Text>
                  </View>
                  <Text style={styles.textContent}>
                    Descrição: {item.obserProd}
                  </Text>
                </>
              ) : categoriaProd === "Outras Despesas" ? (
                <>
                  <View style={styles.modalContent}>
                    <Text style={styles.textContent}>Valor Total: </Text>
                    <Text style={styles.textContent}>
                      {formatarResultado(item.valorProd, "preco")}
                    </Text>
                  </View>
                  <Text style={styles.textContent}>
                    Descrição: {item.obserProd}
                  </Text>
                </>
              ) : null}
            </View>
          </View>
        )}
      </>
    );
  };
  function getDespesas() {
    if (typeof precoCF !== "undefined") {
      return Number(precoCF);
    } else {
      return 0;
    }
  }
  const despesas = getDespesas().toFixed(2);
  const formattedDespesas = `R$ ${despesas.replace(".", ",")}`;
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
              <Text style={styles.texto}>Total de despesas:</Text>
              <Text style={styles.textoValorNeg}>{formattedDespesas}</Text>
              <View style={styles.lineStyle} />
              <Text style={styles.preGraf}>
                Clique no gráfico para mais detalhes.
              </Text>
              <View style={styles.containerChart}>
                <BezierChartDespesas />
              </View>
              {/* modal detalhes despesas*/}
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
                  <Text style={styles.tituloModal}>Detalhes de Despesas:</Text>
                  {/*FILTROS*/}
                  <View
                    style={{
                      flexDirection: "row",
                      margin: scale(10),
                    }}
                  >
                    <TextInput
                      mode="flat"
                      style={styles.search}
                      textColor={Colors.black}
                      activeUnderlineColor={Colors.green}
                      underlineColor={Colors.blue}
                      underlineStyle={{ paddingBottom: 3 }}
                      label="Buscar por Nome"
                      value={searchText}
                      onChangeText={(t) => setSearchText(t)}
                    />
                    <Chip
                      style={[
                        styles.chipFiltro,
                        (tipoChipValue || dataChipValue || dataChipValue) &&
                          styles.chipSelected,
                      ]}
                      textStyle={{ fontSize: scale(13.5), color: Colors.white }}
                      icon={() => (
                        <Icon name="filter" size={22} color="white" />
                      )}
                      onPress={() => {
                        setModalFiltrosVisible(true);
                      }}
                    >
                      Filtros
                    </Chip>
                  </View>
                  <ScrollView
                    style={{ minHeight: verticalScale(34) }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    fadingEdgeLength={100}
                  >
                    <Chip
                      style={[
                        styles.chip,
                        handleChipPress("tipo") && styles.chipSelected,
                      ]}
                      textStyle={{ fontSize: scale(14), color: Colors.white }}
                      icon={() => (
                        <AntDesign name="tag" size={20} color="white" />
                      )}
                    >
                      {textTipoChipValue}
                    </Chip>
                    <Chip
                      style={[
                        styles.chip,
                        handleChipPress("data") && styles.chipSelected,
                      ]}
                      textStyle={{ fontSize: scale(14), color: Colors.white }}
                      icon={() => (
                        <Icon name="calendar" size={20} color="white" />
                      )}
                    >
                      {textDataChipValue}
                    </Chip>
                    <Chip
                      style={[
                        styles.chip,
                        handleChipPress("valor") && styles.chipSelected,
                      ]}
                      textStyle={{ fontSize: scale(14), color: Colors.white }}
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
                    onBackButtonPress={() => setModalFiltrosVisible(false)}
                    onBackdropPress={() => setModalFiltrosVisible(false)}
                    isVisible={modalFiltrosVisible}
                    coverScreen={true}
                    animationIn="fadeInLeftBig"
                    animationInTiming={600}
                    animationOut={"fadeOutRightBig"}
                    animationOutTiming={600}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                    backdropColor={"#000"}
                    statusBarTranslucent
                  >
                    <SafeAreaView style={styles.containerFiltro}>
                      <View style={styles.modalContainerFiltro}>
                        <TouchableOpacity
                          style={styles.BotaoLimparFiltro}
                          onPress={() => {
                            setTipoChipValue(null);
                            setDataChipValue(null);
                            setValorChipValue(null);
                            setListaFiltrada(listaAli);
                          }}
                        >
                          {tipoChipValue || dataChipValue || valorChipValue ? (
                            <Text style={styles.txtLimparFiltro}>
                              Limpar ({contadorFiltros})
                            </Text>
                          ) : null}
                        </TouchableOpacity>
                        <View style={styles.topFiltros}>
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
                          style={{
                            backgroundColor: "white",
                            marginVertical: scale(4),
                          }}
                        />
                        <Text style={styles.tituloinfo1}>
                          Categoria de gastos
                        </Text>
                        <View style={styles.teste}>
                          <Chip
                            style={[
                              styles.chipsFiltro,
                              tipoChipValue === 1 && styles.chipSelected,
                            ]}
                            onPress={() => handleTipoChipPress(1)}
                            textStyle={[
                              styles.chipModalFiltro,
                              tipoChipValue === 1 && { color: "white" },
                            ]}
                          >
                            <Text>Remédios</Text>
                          </Chip>
                          <Chip
                            style={[
                              styles.chipsFiltro,
                              tipoChipValue === 2 && styles.chipSelected,
                            ]}
                            onPress={() => handleTipoChipPress(2)}
                            textStyle={[
                              styles.chipModalFiltro,
                              tipoChipValue === 2 && { color: "white" },
                            ]}
                          >
                            <Text>Alimento</Text>
                          </Chip>
                          <Chip
                            style={[
                              styles.chipsFiltro,
                              tipoChipValue === 3 && styles.chipSelected,
                            ]}
                            onPress={() => handleTipoChipPress(3)}
                            textStyle={[
                              styles.chipModalFiltro,
                              tipoChipValue === 3 && { color: "white" },
                            ]}
                          >
                            <Text>Outras Despesas</Text>
                          </Chip>
                        </View>
                        <Divider
                          bold="true"
                          style={{
                            backgroundColor: "white",
                            marginVertical: scale(4),
                          }}
                        />
                        <Text style={styles.tituloinfo1}>Período</Text>
                        <View style={styles.teste}>
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
                                  style={{ flex: 1, justifyContent: "center" }}
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
                                <View
                                  style={{ flex: 1, justifyContent: "center" }}
                                >
                                  <Text style={styles.textoFiltro}>
                                    Filtrar
                                  </Text>
                                </View>
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
                                <View
                                  style={{ flex: 1, justifyContent: "center" }}
                                >
                                  <Text style={styles.textoFiltro}>Limpar</Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </>
                        )}
                        <Divider
                          bold="true"
                          style={{
                            backgroundColor: "white",
                            marginVertical: scale(4),
                          }}
                        />
                        <Text style={styles.tituloinfo1}>Valores</Text>
                        <View style={styles.teste}>
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
                    style={styles.scroll}
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
export default Despesas;
