import * as React from "react";
import { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AuthContext } from "../../contexts/auth";
import { Chip } from "react-native-paper";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "../../styles";
import { scale, verticalScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput } from "react-native-paper";

function FiltrosDespesas(props) {
  const { listaAFiltrar } = props; // Recebe a lista que vai ser filtrada e o tipo de ordenação
  const { ListaFiltrada, listaAliReb, listaAli } =
    useContext(AuthContext);
  const [listaRecebida, setlistaRecebida] = useState(() => {
    if (listaAFiltrar === "despesasFaz") {
      return listaAli;
    } else if (listaAFiltrar === "despesasReb") {
      return listaAliReb;
    } else {
      return [];
    }
  });
  const [lista, setLista] = useState(listaRecebida);
  const [lista1, setLista1] = useState([]);
  const [lista2, setLista2] = useState([]);
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
  const [textTipoChipValue, setTextTipoChipValue] = useState("Tipo de Despesa");
  const [textDataChipValue, setTextDataChipValue] = useState("Período");
  const [textValorChipValue, setTextValorChipValue] = useState("Valores");
  const [modalFiltrosVisible, setModalFiltrosVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (searchText === "") {
      ListaFiltrada(listaRecebida);
    } else {
      ListaFiltrada(
        lista.filter(
          (item) =>
            item.nomeProd.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [searchText]);

  useEffect(() => {
    ListaFiltrada(lista);
  }, [lista]);

  useEffect(() => {
    ListaFiltrada(lista1);
  }, [lista1]);

  useEffect(() => {
    ListaFiltrada(lista2);
  }, [lista2]);

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
      const listaRemedios = listaRecebida.filter((item) => {
        return item.volumeProd > 0;
      });
      //ListaFiltrada(listaRemedios);
      setLista(listaRemedios);
      setTextTipoChipValue("Remédios");
    } else if (tipoChipValue === 2) {
      const listaAlimento = listaRecebida.filter((item) => {
        return item.pesoProd > 0;
      });
      //ListaFiltrada(listaAlimento);
      setLista(listaAlimento);
      setTextTipoChipValue("Alimento");
    } else if (tipoChipValue === 3) {
      const listaOutrasDespesas = listaRecebida.filter((item) => {
        return item.pesoProd === 0 && item.volumeProd === 0;
      });
      //ListaFiltrada(listaOutrasDespesas);
      setLista(listaOutrasDespesas);
      setTextTipoChipValue("Outras Despesas");
    } else {
      setTextTipoChipValue("Tipo de Despesa");
      //ListaFiltrada(listaRecebida);
      setLista(listaRecebida);
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
      //ListaFiltrada(listaUltimosSete);
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
      //ListaFiltrada(listaUltimosTrinta);
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
      //ListaFiltrada(listaUltimosTresMeses);
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
      //ListaFiltrada(listaUltimosSeisMeses);
      setTextDataChipValue("6 meses");
    } else if (dataChipValue === 5) {
      //todas as datas
      setLista1(lista);
      //ListaFiltrada(lista);
      setTextDataChipValue("Todas as datas");
    } else if (dataChipValue === 6) {
      setTextDataChipValue("Customizado");
    } else {
      setTextDataChipValue("Período");
      setLista1(lista1);
      //ListaFiltrada(lista);
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
      const crescente = filtrarPorValores(lista1);
      setLista2(crescente);
      //ListaFiltrada(crescente);
      setTextValorChipValue("Crescente");
    } else if (valorChipValue === 2) {
      const filtrarPorValores = (lista) => {
        const sortedItems = [...lista].sort((a, b) => {
          return b.valorProd - a.valorProd;
        });
        return sortedItems;
      };
      const decrescente = filtrarPorValores(lista1);
      setLista2(decrescente);
      //ListaFiltrada(decrescente);
      setTextValorChipValue("Decrescente");
    } else if (lista1.length > 0) { // tive que fazer para dar certo (gambiarra).
      setLista2(lista1);
      //ListaFiltrada(lista);
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
      ListaFiltrada(listaFiltradaIntervalo);
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
    setValorChipValue(value === valorChipValue ? null : value);
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

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.search}
          placeholder="Buscar por nome"
          value={searchText}
          onChangeText={(t) => setSearchText(t)}
        />
        <Chip
          style={[
            styles.chip,
            (tipoChipValue || dataChipValue || dataChipValue) &&
              styles.chipSelected,
          ]}
          textStyle={{ fontSize: scale(14), color: Colors.white }}
          icon={() => <Icon name="filter" size={20} color="white" />}
          onPress={() => {
            setModalFiltrosVisible(true);
          }}
        >
          <Text>Filtros</Text>
        </Chip>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Chip
          style={[styles.chip, handleChipPress("tipo") && styles.chipSelected]}
          textStyle={{ fontSize: scale(14), color: Colors.white }}
          icon={() => <Icon name="square" size={20} color="white" />}
        >
          <Text>{textTipoChipValue}</Text>
        </Chip>
        <Chip
          style={[styles.chip, handleChipPress("data") && styles.chipSelected]}
          textStyle={{ fontSize: scale(14), color: Colors.white }}
          icon={() => <Icon name="calendar" size={20} color="white" />}
        >
          <Text>{textDataChipValue}</Text>
        </Chip>
        <Chip
          style={[styles.chip, handleChipPress("valor") && styles.chipSelected]}
          textStyle={{ fontSize: scale(14), color: Colors.white }}
          icon={() => (
            <FontAwesome5 name="dollar-sign" size={20} color="white" />
          )}
        >
          {textValorChipValue}
        </Chip>
      </ScrollView>

      <Modal
        coverScreen={true}
        backdropColor={"#000"}
        onBackButtonPress={() => setModalFiltrosVisible(false)}
        onBackdropPress={() => setModalFiltrosVisible(false)}
        isVisible={modalFiltrosVisible}
        animationType="slide"
        statusBarTranslucent
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.modalContainer}>
            <View style={styles.topFiltros}>
              <TouchableOpacity
                onPress={() => {
                  setTipoChipValue(null);
                  ListaFiltrada(listaRecebida);
                }}
              >
                <Text>Limpar</Text>
              </TouchableOpacity>
              <Text style={styles.tituloinfo}>Filtros</Text>
              <TouchableOpacity onPress={() => setModalFiltrosVisible(false)}>
                <AntDesign name="close" size={20} color={Colors.white} />
              </TouchableOpacity>
            </View>
            <Text style={styles.tituloinfo1}>Tipo de Despesa</Text>
            <View style={styles.teste}>
              <Chip
                style={[
                  styles.chipsFiltro,
                  tipoChipValue === 1 && styles.chipSelected,
                ]}
                onPress={() => handleTipoChipPress(1)}
              >
                <Text>Remédios</Text>
              </Chip>
              <Chip
                style={[
                  styles.chipsFiltro,
                  tipoChipValue === 2 && styles.chipSelected,
                ]}
                onPress={() => handleTipoChipPress(2)}
              >
                <Text>Alimento</Text>
              </Chip>
              <Chip
                style={[
                  styles.chipsFiltro,
                  tipoChipValue === 3 && styles.chipSelected,
                ]}
                onPress={() => handleTipoChipPress(3)}
              >
                <Text>Outras Despesas</Text>
              </Chip>
            </View>
            <Text style={styles.tituloinfo1}>Período</Text>
            <View style={styles.teste}>
              <Chip
                style={[
                  styles.chipsFiltro,
                  dataChipValue === 1 && styles.chipSelected,
                ]}
                onPress={() => handleDataChipPress(1)}
              >
                <Text>7 dias</Text>
              </Chip>
              <Chip
                style={[
                  styles.chipsFiltro,
                  dataChipValue === 2 && styles.chipSelected,
                ]}
                onPress={() => handleDataChipPress(2)}
              >
                <Text>Último mês</Text>
              </Chip>
              <Chip
                style={[
                  styles.chipsFiltro,
                  dataChipValue === 3 && styles.chipSelected,
                ]}
                onPress={() => handleDataChipPress(3)}
              >
                <Text>3 meses</Text>
              </Chip>
              <Chip
                style={[
                  styles.chipsFiltro,
                  dataChipValue === 4 && styles.chipSelected,
                ]}
                onPress={() => handleDataChipPress(4)}
              >
                <Text>6 meses</Text>
              </Chip>
              <Chip
                style={[
                  styles.chipsFiltro,
                  dataChipValue === 5 && styles.chipSelected,
                ]}
                onPress={() => handleDataChipPress(5)}
              >
                <Text>Todas as datas</Text>
              </Chip>
              <Chip
                style={[
                  styles.chipsFiltro,
                  dataChipValue === 6 && styles.chipSelected,
                ]}
                onPress={() => handleDataChipPress(6)}
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
                    <Text style={styles.texto}>{textStartDate}</Text>
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
                    <Text style={styles.texto}>{textEndDate}</Text>
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
                    onPress={filtrarIntervalo}
                  >
                    <Text style={styles.texto}>Filtrar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.botoes}
                    onPress={() => {
                      setStartDate("");
                      setEndDate("");
                      setTextStartDate("Data Inicial");
                      setTextEndDate("Data Final");
                    }}
                  >
                    <Text style={styles.texto}>Limpar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            <Text style={styles.tituloinfo1}>Valores</Text>
            <View style={styles.teste}>
              <Chip
                style={[
                  styles.chipsFiltro,
                  valorChipValue === 1 && styles.chipSelected,
                ]}
                onPress={() => handleValorChipPress(1)}
              >
                <Text>Crescente</Text>
              </Chip>
              <Chip
                style={[
                  styles.chipsFiltro,
                  valorChipValue === 2 && styles.chipSelected,
                ]}
                onPress={() => handleValorChipPress(2)}
              >
                <Text>Decrescente</Text>
              </Chip>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  modalContainerSearch: {
    flex: 1,
  },
  search: {
    backgroundColor: Colors.white,
    width: "70%",
    fontSize: scale(15),
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: verticalScale(5),
    marginHorizontal: verticalScale(5),
  },
  chipSelected: {
    backgroundColor: "green",
  },
  topFiltros: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chipsFiltro: {
    marginRight: 10,
    marginBottom: 10,
  },
  teste: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    //flex: 0.6,
    backgroundColor: Colors.Cyan,
  },
  containerBotoes: {
    flexDirection: "row",
    padding: 3,
  },
  botoes: {
    flex: 1,
    backgroundColor: Colors.green,
    borderRadius: 30,
    width: "50%",
    height: verticalScale(30),
    borderWidth: scale(1),
    justifyContent: "center",
    marginHorizontal: 3,
  },
  texto: {
    color: Colors.white,
    textAlign: "center",
    fontSize: scale(14),
  },
  containerChip: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chip: {
    backgroundColor: Colors.green,
    marginRight: scale(5),
    marginBottom: scale(5),
    padding: scale(1),
  },
  tituloinfo: {
    color: "white",
    fontSize: verticalScale(20),
    marginBottom: verticalScale(10),
    textAlign: "center",
    fontWeight: "bold",
  },
  tituloinfo1: {
    paddingHorizontal: verticalScale(10),
    color: "white",
    fontSize: verticalScale(20),
    marginBottom: verticalScale(10),
    textAlign: "left",
    fontWeight: "bold",
  },
});

export default FiltrosDespesas;
