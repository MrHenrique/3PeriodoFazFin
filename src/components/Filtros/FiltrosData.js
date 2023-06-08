import * as React from "react";
import { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Modal from "react-native-modal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AuthContext } from "../../contexts/auth";
import { Chip, RadioButton } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../styles";
import { scale, verticalScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function FiltrosData(props) {
  const { listaRecebida } = props; // Recebe a lista que vai ser filtrada
  const { ListaFiltrada } = useContext(AuthContext);
  const [resetDropdown, setResetDropdown] = useState(false);
  const [lista, setLista] = useState(listaRecebida);
  const [startDate, setStartDate] = useState(""); //Filtro Intervalo entre datas
  const [textStartDate, setTextStartDate] = useState("Data Inicial"); //Filtro Intervalo entre datas
  const [endDate, setEndDate] = useState(""); //Filtro Intervalo entre datas
  const [textEndDate, setTextEndDate] = useState("Data Final"); //Filtro Intervalo entre datas
  const [isStartDatePickerVisible, setIsStartDatePickerVisible] =
    useState(false);
  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);
  const [dataRadioValue, setDataRadioValue] = React.useState(null);
  const [textDataRadioValue, setTextDataRadioValue] = useState("Período");
  const [modalFiltroDataVisible, setModalFiltroDataVisible] = useState(false);
  const [valorRadioValue, setValorRadioValue] = React.useState(null);
  const [textValorRadioValue, setTextValorRadioValue] = useState("Valores");
  const [modalFiltroValorVisible, setModalFiltroValorVisible] = useState(false);

  useEffect(() => {
    ListaFiltrada(lista);
  }, [lista]);

  const handleResetDropdown = () => {
    setResetDropdown(true);
  };

  useEffect(() => {
    if (resetDropdown) {
      setResetDropdown(false); // Redefine o valor de resetDropdown para false após ser utilizado
    }
  }, [resetDropdown]);

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
    if (valorRadioValue === 1) {
      const filtrarPorValores = (lista) => {
        const sortedItems = [...lista].sort((a, b) => a.prodL - b.prodL);
        return sortedItems;
      };
      const crescente = filtrarPorValores(lista);
      setLista(crescente);
      setTextValorRadioValue("Crescente");
    } else if (valorRadioValue === 2) {
      const filtrarPorValores = (lista) => {
        const sortedItems = [...lista].sort((a, b) => b.prodL - a.prodL);
        return sortedItems;
      };
      const decrescente = filtrarPorValores(lista);
      setLista(decrescente);
      setTextValorRadioValue("Decrescente");
    }
  }, [valorRadioValue]);

  // Filtro por Datas
  useEffect(() => {
    const filtrarPorData = (lista, dataInicio, dataFim) => {
      return lista.filter((item) => {
        const itemDataDeCriacao = new Date(item.createdAt);
        itemDataDeCriacao.setHours(0, 0, 0, 0);
        return itemDataDeCriacao >= dataInicio && itemDataDeCriacao <= dataFim;
      });
    };
    if (dataRadioValue === 1) {
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
      setTextDataRadioValue("Últimos 7 dias");
    } else if (dataRadioValue === 2) {
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
      setTextDataRadioValue("Último mês");
    } else if (dataRadioValue === 3) {
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
      setTextDataRadioValue("Últimos 3 meses");
    } else if (dataRadioValue === 4) {
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
      setTextDataRadioValue("Últimos 6 meses");
    } else if (dataRadioValue === 5) {
      //todas as datas
      setLista(listaRecebida);
      setTextDataRadioValue("Todas as datas");
    } else if (dataRadioValue === 6) {
      setTextDataRadioValue("Período customizado");
    }
  }, [dataRadioValue]);

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
    setModalFiltroDataVisible(false);
  };

  return (
    <>
      <View style={styles.containerChip}>
        <Chip
          style={styles.chip}
          textStyle={{ fontSize: scale(14), color: Colors.white }}
          icon={() => <Icon name="information" size={20} color="white" />}
        >
          Filtros
        </Chip>
        <Chip
          style={styles.chip}
          textStyle={{ fontSize: scale(14), color: Colors.white }}
          icon={() => <Icon name="calendar" size={20} color="white" />}
          onPress={() => setModalFiltroDataVisible(true)}
        >
          <Text>{textDataRadioValue}</Text>
          <AntDesign name="down" size={20} color="black" />
        </Chip>
        <Chip
          textStyle={{ fontSize: scale(14), color: Colors.white }}
          icon={() => <Icon name="information" size={20} color="white" />}
          style={styles.chip}
        >
          {textValorRadioValue}
        </Chip>
      </View>
      <Modal
        coverScreen={true}
        backdropColor={"#000"}
        onBackButtonPress={() => setModalFiltroDataVisible(false)}
        onBackdropPress={() => setModalFiltroDataVisible(false)}
        visible={modalFiltroDataVisible}
        animationType="slide"
        statusBarTranslucent
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.modalContainer}>
            <Text style={styles.tituloinfo}>Período</Text>
            <View style={styles.radioButtons}>
              <Text style={styles.txtradiobtn}>Últimos 7 dias</Text>
              <RadioButton
                uncheckedColor={Colors.white}
                color={Colors.white}
                value={1}
                status={dataRadioValue === 1 ? "checked" : "unchecked"}
                onPress={() => {
                  setDataRadioValue(1);
                  setModalFiltroDataVisible(false);
                }}
              />
            </View>
            <View style={styles.radioButtons}>
              <Text style={styles.txtradiobtn}>Último mês</Text>
              <RadioButton
                uncheckedColor={Colors.white}
                color={Colors.white}
                value={2}
                status={dataRadioValue === 2 ? "checked" : "unchecked"}
                onPress={() => {
                  setDataRadioValue(2);
                  setModalFiltroDataVisible(false);
                }}
              />
            </View>
            <View style={styles.radioButtons}>
              <Text style={styles.txtradiobtn}>Últimos 3 meses</Text>
              <RadioButton
                uncheckedColor={Colors.white}
                color={Colors.white}
                value={3}
                status={dataRadioValue === 3 ? "checked" : "unchecked"}
                onPress={() => {
                  setDataRadioValue(3);
                  setModalFiltroDataVisible(false);
                }}
              />
            </View>
            <View style={styles.radioButtons}>
              <Text style={styles.txtradiobtn}>Últimos 6 meses</Text>
              <RadioButton
                uncheckedColor={Colors.white}
                color={Colors.white}
                value={4}
                status={dataRadioValue === 4 ? "checked" : "unchecked"}
                onPress={() => {
                  setDataRadioValue(4);
                  setModalFiltroDataVisible(false);
                }}
              />
            </View>
            <View style={styles.radioButtons}>
              <Text style={styles.txtradiobtn}>Todas as datas</Text>
              <RadioButton
                uncheckedColor={Colors.white}
                color={Colors.white}
                value={5}
                status={dataRadioValue === 5 ? "checked" : "unchecked"}
                onPress={() => {
                  setDataRadioValue(5);
                  setModalFiltroDataVisible(false);
                }}
              />
            </View>
            <View style={styles.radioButtons}>
              <Text style={styles.txtradiobtn}>Período customizado</Text>
              <RadioButton
                value={6}
                status={dataRadioValue === 6 ? "checked" : "unchecked"}
                onPress={() => {
                  setDataRadioValue(6);
                }}
              />
            </View>
            {/*Filtro intervalo entre datas*/}
            {/*<TouchableOpacity
              onPress={() => setShouldShowDataRange(!shouldShowDataRange)}
              style={styles.filtrosBotao}
            >
              <Text style={styles.tituloBotao}>Filtrar Por Data</Text>
              <AntDesign name="down" size={scale(25)} color="white" />
            </TouchableOpacity>
            */}
            <View
              style={[
                styles.filtros,
                { display: dataRadioValue ? "flex" : "none" },
              ]}
            >
              {dataRadioValue === 6 && (
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
              )}
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
                    handleResetDropdown();
                    setStartDate("");
                    setEndDate("");
                    setTextStartDate("Data Inicial");
                    setTextEndDate("Data Final");
                    setModalFiltroDataVisible(false);
                    setDataRadioValue(1);
                  }}
                >
                  <Text style={styles.texto}>Limpar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {/*  FILTRO VALOR  */}
      <Modal
        visible={modalFiltroValorVisible}
        animationType="slide"
        transparent={true}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.modalContainer}>
            <Text style={styles.tituloinfo}>Valores</Text>
            <View style={styles.radioButtons}>
              <Text>Crescente</Text>
              <RadioButton
                value={1}
                status={valorRadioValue === 1 ? "checked" : "unchecked"}
                onPress={() => {
                  setValorRadioValue(1);
                  setModalFiltroValorVisible(false);
                }}
              />
            </View>
            <View style={styles.radioButtons}>
              <Text>Decrescente</Text>
              <RadioButton
                value={2}
                status={valorRadioValue === 2 ? "checked" : "unchecked"}
                onPress={() => {
                  setValorRadioValue(2);
                  setModalFiltroValorVisible(false);
                }}
              />
            </View>
            <View style={styles.containerBotoes}>
              <TouchableOpacity style={styles.botoes} onPress={() => {}}>
                <Text style={styles.texto}>Filtrar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botoes}
                onPress={() => {
                  setLista(listaRecebida);
                  setModalFiltroValorVisible(false);
                  setValorRadioValue(null);
                  setTextValorRadioValue("Valores");
                }}
              >
                <Text style={styles.texto}>Limpar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  tituloBotao: {
    fontSize: scale(14),
    color: Colors.white,
  },
  txtradiobtn: {
    fontSize: scale(15),
    color: Colors.white,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    flex: 0.5,
    backgroundColor: Colors.darkgreen,
  },
  containerBotoes: {
    flexDirection: "row",
    padding: 3,
  },
  radioButtons: {
    padding: scale(10),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(1),
    borderWidth: scale(1),
    backgroundColor: Colors.green,
  },
  botoes: {
    flex: 1,
    backgroundColor: Colors.green,
    borderRadius: 30,
    width: "50%",
    height: verticalScale(30),
    borderWidth: scale(1),
    justifyContent: "center",
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
    maxWidth: scale(130),
    backgroundColor: Colors.green,
    padding: scale(5),
  },
  filtrosBotao: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    borderRadius: 10,
    padding: 10,
    marginTop: 3,
  },
  tituloinfo: {
    color: "white",
    fontSize: verticalScale(20),
    marginBottom: verticalScale(10),
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default FiltrosData;
