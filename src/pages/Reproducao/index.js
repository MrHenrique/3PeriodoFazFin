import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { scale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";

const Reproducao = () => {
  const navigation = useNavigation();
  const [coverageDate, setCoverageDate] = useState(new Date());
  const [creationDate, setCreationDate] = useState(new Date());
  const [heatDate, setHeatDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [text, setText] = useState(
    new Date().getDate().toString().padStart(2, "0") +
      "/" +
      (new Date().getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      new Date().getFullYear().toString().padStart(2, "0")
  );
  const [newsDate, setNewsDate] = useState(new Date());
  const [isNewsDatePickerVisible, setIsNewsDatePickerVisible] = useState(false);
  const [newsText, setNewsText] = useState(
    new Date().getDate().toString().padStart(2, "0") +
      "/" +
      (new Date().getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      new Date().getFullYear().toString().padStart(2, "0")
  );
  const [newDate, setNewDate] = useState(new Date());
  const [isNewDatePickerVisible, setIsNewDatePickerVisible] = useState(false);
  const [newText, setNewText] = useState(
    new Date().getDate().toString().padStart(2, "0") +
      "/" +
      (new Date().getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      new Date().getFullYear().toString().padStart(2, "0")
  );

  const newShowDatePicker = () => {
    setIsNewDatePickerVisible(true);
  };
  const newHideDatePicker = () => {
    setIsNewDatePickerVisible(false);
  };
  const handleNewDateConfirm = (selectedDate) => {
    let tempDate = new Date(selectedDate);
    let fDate =
      tempDate.getDate().toString().padStart(2, "0") +
      "/" +
      (tempDate.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      tempDate.getFullYear().toString().padStart(2, "0");
    setNewText(fDate);
    setNewDate(selectedDate);
    newHideDatePicker();
  };

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

  const newsShowDatePicker = () => {
    setIsNewsDatePickerVisibley(true);
  };
  const newsHideDatePicker = () => {
    setIsNewsDatePickerVisibley(false);
  };
  const newsHandleDateConfirm = (selectedDate) => {
    let tempDate = new Date(selectedDate);
    let fDate =
      tempDate.getDate().toString().padStart(2, "0") +
      "/" +
      (tempDate.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      tempDate.getFullYear().toString().padStart(2, "0");
    setNewsText(fDate);
    setNewsDate(selectedDate);
    newsHideDatePicker();
  };
  const handleCoverageDateChange = (selectedDate) => {
    setCoverageDate(selectedDate);
  };

  const handleCreationDateChange = (selectedDate) => {
    setCreationDate(selectedDate);
  };

  const handleHeatDateChange = (selectedDate) => {
    setHeatDate(selectedDate);
  };

  const registerEvents = () => {
    // Implementar a lógica para registrar os eventos aqui
    console.log("Evento de Cobertura:", date);
    console.log("Evento de Criação:", creationDate);
    console.log("Evento de Cio:", heatDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containergeral}>
        <Text style={styles.txtTitulo}>Registro de Eventos</Text>
        {/* CATEGORIA DE REPRODUÇÃO */}
        {/* CIO */}
        <ScrollView style={styles.containerScrollView}>
          <View style={styles.containerCategoria}>
            <View style={styles.containerTituloCategoria}>
              <Text style={styles.txtCobertura}>Cio</Text>
              <AntDesign name="check" size={scale(25)} color="white" />
              {/* <AntDesign name="close" size={scale(25)} color="white" /> */}
            </View>
            <View>
              <View style={styles.containerRow}>
                <Text style={styles.txtInfoCategoria}>Último cio:</Text>
                <Text style={styles.txtInfoCategoria}>02/02/2000</Text>
              </View>
              <View style={styles.containerRow}>
                <Text style={styles.txtInfoCategoria}>Próximo cio:</Text>
                <Text style={styles.txtInfoCategoria}>10/02/2000</Text>
              </View>
              <View>
                <Text style={styles.txtInfoCategoria}>Data selecionada</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Text style={styles.txtInfoCategoria}>
                    {date.toLocaleDateString("pt-BR")}
                  </Text>
                  <TouchableOpacity onPress={showDatePicker}>
                    <AntDesign name="calendar" size={scale(16)} color="white" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.botaoData}>
                  <Text style={styles.tituloinfo}>Marcar Cio:</Text>
                </TouchableOpacity>
              </View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
                maximumDate={new Date()}
              />
            </View>
          </View>
          {/* COBERTURA  */}
          <View style={styles.containerCategoria}>
            <View style={styles.containerTituloCategoria}>
              <Text style={styles.txtCobertura}>Cobertura</Text>
              <AntDesign name="check" size={scale(25)} color="white" />
              {/* <AntDesign name="close" size={scale(25)} color="white" /> */}
            </View>
            <View>
              <View style={styles.containerRow}>
                <Text style={styles.txtInfoCategoria}>Data de Cobertura:</Text>
                <Text style={styles.txtInfoCategoria}>02/02/2000</Text>
              </View>
              <TouchableOpacity
                style={styles.botaoData}
                onPress={showDatePicker}
              >
                <Text style={styles.tituloinfo}>Marcar Cobertura:</Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
                maximumDate={new Date()}
              />
            </View>
          </View>
          <View style={styles.containerCategoria}>
            <View style={styles.containerTituloCategoria}>
              <Text style={styles.txtCobertura}>Prenhez</Text>
              {/* <AntDesign name="check" size={scale(25)} color="white" /> */}
              <AntDesign name="close" size={scale(25)} color="white" />
            </View>
            <View>
              <View style={styles.containerRow}>
                <Text style={styles.txtInfoCategoria}>Último parto:</Text>
                <Text style={styles.txtInfoCategoria}>02/01/2000</Text>
              </View>
              <View style={styles.containerRow}>
                <Text style={styles.txtInfoCategoria}>Possível de parto:</Text>
                <Text style={styles.txtInfoCategoria}>02/02/2000</Text>
              </View>
              <TouchableOpacity
                style={styles.botaoData}
                onPress={showDatePicker}
              >
                <Text style={styles.tituloinfo}>Marcar Parto:</Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
                maximumDate={new Date()}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.containervoltar}>
          <TouchableOpacity style={styles.botao} onPress={registerEvents}>
            <Text style={styles.textovoltar}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.textovoltar}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Reproducao;
