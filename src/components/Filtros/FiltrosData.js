import * as React from "react";
import { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropdownComponentMes from "../Dropdown/DropdownMes";
import { AuthContext } from "../../contexts/auth";

function FiltrosData(props) {
  const { listaRecebida } = props; // Recebe a lista que vai ser filtrada
  const { ListaFiltrada, filtroMes } = useContext(AuthContext);
  const [lista, setLista] = useState(listaRecebida);
  const [startDate, setStartDate] = useState(""); //Filtro Intervalo entre datas
  const [textStartDate, setTextStartDate] = useState("Data Inicial"); //Filtro Intervalo entre datas
  const [endDate, setEndDate] = useState(""); //Filtro Intervalo entre datas
  const [textEndDate, setTextEndDate] = useState("Data Final"); //Filtro Intervalo entre datas
  const [specificDate, setSpecificDate] = useState(null);
  const [textSpecificDate, setTextSpecificDate] = useState("Data Especifica"); //Filtro data especifica
  const [isStartDatePickerVisible, setIsStartDatePickerVisible] =
    useState(false);
  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);
  const [isSpecificDatePickerVisible, setIsSpecificDatePickerVisible] =
    useState(false);

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

  /*
  //Data especifica
  const showSpecificDatePicker = () => {
    setIsSpecificDatePickerVisible(true);
  };
  const hideSpecificDatePicker = () => {
    setIsSpecificDatePickerVisible(false);
  };
  const handleSpecificDateConfirm = (selectedDate) => {
    let tempSpecificDate = new Date(selectedDate);
    let fSpecificDate =
      tempSpecificDate.getDate().toString().padStart(2, "0") +
      "/" +
      (tempSpecificDate.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      tempSpecificDate.getFullYear().toString().padStart(2, "0");
    setTextSpecificDate(fSpecificDate);
    setSpecificDate(selectedDate);
    hideSpecificDatePicker();
  };
  //FIM 
  */

  /*
  //Filtro por mês
  useEffect(() => {
    if (filtroMes === 13) {
      setLista(listaRecebida);
    } else {
      const listaFiltradaMes = listaRecebida.filter((item) => {
        //pega todos os itens da lista que foi puxada da (listaRecebida)
        const itemDataDeCriacao = new Date(item.createdAt); //cria uma nova data com a data do (createdAt do item) e atribui a variavel itemDataDeCriacao
        return itemDataDeCriacao.getMonth() === filtroMes - 1; // verifica se o mês do item é igual ao escolhido pelo usuário
      });
      setLista(listaFiltradaMes);
    }
  }, [filtroMes]);
  */

  //Código para retornar uma lista do intevalo selecionado pelo usuário (FILTRO INTERVALO ENTRE DATAS)
  const filtrarIntervalo = () => {
    if (startDate != "" && endDate != "") {
      const listaFiltradaIntervalo = listaRecebida.filter((item) => {
        //pega todos os itens da lista que foi puxada da (listaRecebida)
        const itemDataDeCriacao = new Date(item.createdAt); //cria uma nova data com a data do (createdAt do item) e atribui a variavel itemDataDeCriacao
        const dataInicio = new Date(startDate); //pega a data de inicio escolhida pelo usuario
        dataInicio.setHours(0, 0, 0); //ajusta o horario para 00:00:00 para garantir que a data de inicio seja no começo do dia.
        const dataFim = new Date(endDate); //pega a data final escolhida pelo usuario
        dataFim.setHours(23, 59, 59); //ajusta o horario para 23:59:59 para garantir que a data final sejá no final do dia.
        return (
          itemDataDeCriacao.getTime() >= dataInicio.getTime() &&
          itemDataDeCriacao.getTime() <= dataFim.getTime()
        );
      });
      setLista(listaFiltradaIntervalo);
    }
  };

  /*
  //Código para retornar uma lista com a data Especifica selecionada pelo usuario (FILTRO POR DATA ESPECIFICA)
  useEffect(() => {
    if (specificDate === null) {
      setLista(listaRecebida);
    } else {
      setLista(
        listaRecebida.filter((item) => {
          const itemDataDeCriacao = new Date(item.createdAt); // converte a string de data do item para um objeto Date
          const specificDateObj = new Date(specificDate); // converte a string de busca para um objeto Date
          return (
            itemDataDeCriacao.getDate() === specificDateObj.getDate() && // verifica se o dia é igual
            itemDataDeCriacao.getMonth() === specificDateObj.getMonth() && // verifica se o mês é igual
            itemDataDeCriacao.getFullYear() === specificDateObj.getFullYear()
          ); // verifica se o ano é igual
        })
      );
    }
  }, [specificDate]);
  //FIM
  */

  return (
    <SafeAreaView style={styles.container}>
      {/*<DropdownComponentMes />*/}
      {/*Filtro intervalo entre datas*/}
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
        />
      </View>

      {/*Filtro data especifica*/}
      <View style={styles.containerBotoes}>
        {/*
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "gray",
            borderRadius: 30,
            width: "50%",
            height: 30,
          }}
          onPress={showSpecificDatePicker}
        >
          <Text style={{ textAlign: "center" }}>{textSpecificDate}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isSpecificDatePickerVisible}
          mode="date"
          onConfirm={handleSpecificDateConfirm}
          onCancel={hideSpecificDatePicker}
        />*/}
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
            setLista(listaRecebida);
          }}
        >
          <Text style={styles.texto}>Limpar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBotoes: {
    flexDirection: "row",
    padding: 3,
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
});

export default FiltrosData;
