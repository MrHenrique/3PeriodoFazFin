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

function FiltrosData(props) {
  const { listaRecebida, ordenarPor } = props; // Recebe a lista que vai ser filtrada
  const { ListaFiltrada } = useContext(AuthContext);
  const [lista, setLista] = useState(listaRecebida);
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

  useEffect(() => {
    ListaFiltrada(lista);
  }, [lista]);

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

  // Filtro por Valores
  useEffect(() => {
    if (valorChipValue === 1) {
      const filtrarPorValores = (lista) => {
        const sortedItems = [...lista].sort((a, b) => {
          if (ordenarPor === "litro") {
            return a.prodL - b.prodL;
          } else if (ordenarPor === "valor") {
            return a.precoL * a.prodL - b.precoL * b.prodL;
          }
          return 0;
        });
        return sortedItems;
      };
      const crescente = filtrarPorValores(lista);
      setLista(crescente);
      setTextValorChipValue("Crescente");
    } else if (valorChipValue === 2) {
      const filtrarPorValores = (lista) => {
        const sortedItems = [...lista].sort((a, b) => {
          if (ordenarPor === "litro") {
            return b.prodL - a.prodL;
          } else if (ordenarPor === "valor") {
            return b.precoL * b.prodL - a.precoL * a.prodL;
          }
          return 0;
        });
        return sortedItems;
      };
      const decrescente = filtrarPorValores(lista);
      setLista(decrescente);
      setTextValorChipValue("Decrescente");
    } else {
      setTextValorChipValue("Valores");
    }
  }, [valorChipValue]);

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
        listaRecebida,
        dataSeteDiasAtras,
        dataHoje
      );
      setLista(listaUltimosSete);
      setTextDataChipValue("7 dias");
    } else if (dataChipValue === 2) {
      // Ultimos mês
      const dataHoje = new Date();
      dataHoje.setHours(0, 0, 0, 0);
      const dataTrintaDiasAtras = new Date(dataHoje);
      dataTrintaDiasAtras.setDate(dataHoje.getDate() - 30);
      const listaUltimosTrinta = filtrarPorData(
        listaRecebida,
        dataTrintaDiasAtras,
        dataHoje
      );
      setLista(listaUltimosTrinta);
      setTextDataChipValue("Último mês");
    } else if (dataChipValue === 3) {
      //Ultimos 3 meses
      const dataHoje = new Date();
      dataHoje.setHours(0, 0, 0, 0);
      const dataUltimosTresMeses = new Date(dataHoje);
      dataUltimosTresMeses.setDate(dataHoje.getDate() - 90);
      const listaUltimosTresMeses = filtrarPorData(
        listaRecebida,
        dataUltimosTresMeses,
        dataHoje
      );
      setLista(listaUltimosTresMeses);
      setTextDataChipValue("3 meses");
    } else if (dataChipValue === 4) {
      //Ultimos 6 meses
      const dataHoje = new Date();
      dataHoje.setHours(0, 0, 0, 0);
      const dataUltimosSeisMeses = new Date(dataHoje);
      dataUltimosSeisMeses.setDate(dataHoje.getDate() - 180);
      const listaUltimosSeisMeses = filtrarPorData(
        listaRecebida,
        dataUltimosSeisMeses,
        dataHoje
      );
      setLista(listaUltimosSeisMeses);
      setTextDataChipValue("6 meses");
    } else if (dataChipValue === 5) {
      //todas as datas
      setLista(listaRecebida);
      setTextDataChipValue("Todas as datas");
    } else if (dataChipValue === 6) {
      setTextDataChipValue("Período customizado");
    } else {
      setTextDataChipValue("Período");
      setLista(listaRecebida);
    }
  }, [dataChipValue]);

  //Código para retornar uma lista do intevalo selecionado pelo usuário (FILTRO INTERVALO ENTRE DATAS)
  const filtrarIntervalo = () => {
    if (startDate != "" && endDate != "") {
      const listaFiltradaIntervalo = listaRecebida.filter((item) => {
        //pega todos os itens da lista que foi puxada da (listaRecebida)
        const itemDataDeCriacao = new Date(item.createdAt); //cria uma nova data com a data do (createdAt do item) e atribui a variavel itemDataDeCriacao
        const dataInicio = new Date(startDate); //pega a data de inicio escolhida pelo usuario
        dataInicio.setHours(0, 0, 0, 0); //ajusta o horario para 00:00:00 para garantir que a data de inicio seja no começo do dia.
        const dataFim = new Date(endDate); //pega a data final escolhida pelo usuario
        dataFim.setHours(23, 59, 59, 999); //ajusta o horario para 23:59:59 para garantir que a data final sejá no final do dia.
        return itemDataDeCriacao >= dataInicio && itemDataDeCriacao <= dataFim;
      });
      setLista(listaFiltradaIntervalo);
    }
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
    if (tipo === "data") {
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
      <View style={styles.containerChip}>
        <ScrollView horizontal>
          <Chip
            style={[
              styles.chip,
              handleChipPress("data") && styles.chipSelected,
            ]}
            textStyle={{ fontSize: scale(14), color: Colors.white }}
            icon={() => <Icon name="calendar" size={20} color="white" />}
            onPress={() => {
              setModalFiltrosVisible(true);
            }}
          >
            <Text>{textDataChipValue}</Text>
          </Chip>
          <Chip
            style={[
              styles.chip,
              handleChipPress("valor") && styles.chipSelected,
            ]}
            textStyle={{ fontSize: scale(14), color: Colors.white }}
            icon={() => (
              <FontAwesome5 name="dollar-sign" size={20} color="white" />
            )}
            onPress={() => setModalFiltrosVisible(true)}
          >
            {textValorChipValue}
          </Chip>
        </ScrollView>
      </View>

      <Modal
        coverScreen={true}
        backdropColor={"#000"}
        onBackButtonPress={() => setModalFiltrosVisible(false)}
        onBackdropPress={() => setModalFiltrosVisible(false)}
        visible={modalFiltrosVisible}
        animationType="slide"
        statusBarTranslucent
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.modalContainer}>
            <View style={styles.topFiltros}>
              <TouchableOpacity
                onPress={() => {
                  setDataChipValue(null);
                  setValorChipValue(null);
                  setLista(listaRecebida);
                }}
              >
                <Text>Limpar</Text>
              </TouchableOpacity>
              <Text style={styles.tituloinfo}>Filtros</Text>
              <TouchableOpacity onPress={() => setModalFiltrosVisible(false)}>
                <AntDesign name="close" size={20} color={Colors.white} />
              </TouchableOpacity>
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
                <Text>Período customizado</Text>
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
    marginRight: scale(10),
    padding: scale(5),
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

export default FiltrosData;
