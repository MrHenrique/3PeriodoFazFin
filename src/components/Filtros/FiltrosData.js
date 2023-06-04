import * as React from "react";
import { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AuthContext } from "../../contexts/auth";
import { Chip, RadioButton } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

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

  const [modalVisible, setModalVisible] = useState(false);
  const [radioValue, setRadioValue] = React.useState(1);
  const [shouldShowDataRange, setShouldShowDataRange] = useState(false);

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

  useEffect(() => {
    const filtrarPorData = (lista, dataInicio, dataFim) => {
      return lista.filter((item) => {
        const itemDataDeCriacao = new Date(item.createdAt);
        itemDataDeCriacao.setHours(0, 0, 0, 0);
        return itemDataDeCriacao >= dataInicio && itemDataDeCriacao <= dataFim;
      });
    };
    if (radioValue === 1) {
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
    } else if (radioValue === 2) {
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
    } else if (radioValue === 3) {
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
    } else if (radioValue === 4) {
      //Ultimos 6 meses
      const dataHoje = new Date();
      dataHoje.setHours(0, 0, 0, 0);
      const dataUltimosSeisMeses = new Date(dataHoje);
      dataUltimosSeisMeses.setDate(dataHoje.getDate() - 90);
      const listaUltimosSeisMeses = filtrarPorData(
        listaRecebida,
        dataUltimosSeisMeses,
        dataHoje
      );
      setLista(listaUltimosSeisMeses);
    } else if (radioValue === 5) {
      //todas as datas
      setLista(listaRecebida);
    }
  }, [radioValue]);

  const pegarNome = () => {
    if (radioValue === 1) {
      return "Últimos 7 dias";
    } else if (radioValue === 2) {
      return "Último mês";
    } else if (radioValue === 3) {
      return "Últimos 3 meses";
    } else if (radioValue === 4) {
      return "Últimos 6 meses";
    } else if (radioValue === 5) {
      return "Todas as datas";
    }
  };
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

  return (
    <>
      <View style={styles.containerChip}>
        <Chip style={styles.chip} icon="information">
          Filtros
        </Chip>
        <Chip
          style={styles.chip}
          icon="calendar"
          onPress={() => setModalVisible(true)}
        >
          {pegarNome()}
        </Chip>
        <Chip style={styles.chip} icon="information">
          Valores
        </Chip>
      </View>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <SafeAreaView style={styles.container}>
          <View style={styles.modalContainer}>
            <View style={styles.radioButtons}>
              <Text>Últimos 7 dias</Text>
              <RadioButton
                value={1}
                status={radioValue === 1 ? "checked" : "unchecked"}
                onPress={() => setRadioValue(1)}
              />
            </View>
            <View style={styles.radioButtons}>
              <Text>Último mês</Text>
              <RadioButton
                value={2}
                status={radioValue === 2 ? "checked" : "unchecked"}
                onPress={() => setRadioValue(2)}
              />
            </View>
            <View style={styles.radioButtons}>
              <Text>Últimos 3 meses</Text>
              <RadioButton
                value={3}
                status={radioValue === 3 ? "checked" : "unchecked"}
                onPress={() => setRadioValue(3)}
              />
            </View>
            <View style={styles.radioButtons}>
              <Text>Últimos 6 meses</Text>
              <RadioButton
                value={4}
                status={radioValue === 4 ? "checked" : "unchecked"}
                onPress={() => setRadioValue(4)}
              />
            </View>
            <View style={styles.radioButtons}>
              <Text>Todas as datas</Text>
              <RadioButton
                value={5}
                status={radioValue === 5 ? "checked" : "unchecked"}
                onPress={() => setRadioValue(5)}
              />
            </View>
            {/*Filtro intervalo entre datas*/}
            <TouchableOpacity
              onPress={() => setShouldShowDataRange(!shouldShowDataRange)}
              style={styles.filtrosBotao}
            >
              <Text style={styles.tituloBotao}>Data Range</Text>
              <AntDesign name="down" size={24} color="black" />
            </TouchableOpacity>
            <View
              style={[
                styles.filtros,
                { display: shouldShowDataRange ? "flex" : "none" },
              ]}
            >
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
                  handleResetDropdown();
                  setStartDate("");
                  setEndDate("");
                  setTextStartDate("Data Inicial");
                  setTextEndDate("Data Final");
                  setLista(listaRecebida);
                  setModalVisible(false);
                  setRadioValue(1);
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
  container: {
    flex: 1,
  },
  modalContainer: {
    height: "60%",
    backgroundColor: "#fea",
    top: "40%",
  },
  containerBotoes: {
    flexDirection: "row",
    padding: 3,
  },
  radioButtons: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 1,
    borderWidth: 2,
    borderColor: "black",
  },
  botoes: {
    flex: 1,
    backgroundColor: "gray",
    borderRadius: 30,
    width: "50%",
    height: 30,
    justifyContent: "center",
  },
  texto: {
    textAlign: "center",
  },
  containerChip: {
    flexDirection: "row",
    alignItems: "center",
  },
  chip: {
    marginRight: 5,
  },
  filtrosBotao: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    borderRadius: 10,
    padding: 10,
    marginTop: 3,
  },
});

export default FiltrosData;
