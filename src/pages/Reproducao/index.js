import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { scale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
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
    <View>
      <Text>Registro de Eventos</Text>
      <Text>Data de Cobertura:</Text>
      <View style={styles.containerinfos}>
        <Text style={styles.tituloinfo}>{text}</Text>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: "grey",
              borderRadius: 20,
            }}
            onPress={showDatePicker}
          >
            <Text style={styles.tituloinfo}>Selecione a data :</Text>
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
      <TouchableOpacity style={styles.botaopress6} onPress={registerEvents}>
        <Text style={styles.textovoltar}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.botaopress}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.textovoltar}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
  const [newsdate, setNewsDate] = useState(new Date());
  const [isNewsDatePickerVisible, setIsNewsDatePickerVisible] = useState(false);
  const [newstext, setNewsText] = useState(
    new Date().getDate().toString().padStart(2, "0") +
      "/" +
      (new Date().getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      new Date().getFullYear().toString().padStart(2, "0")
  );

  const NewsshowDatePicker = () => {
    setIsNewsDatePickerVisibley(true);
  };
  const NewshideDatePicker = () => {
    setIsNewsDatePickerVisibley(false);
  };
  const newshandleDateConfirm = (selectedDate) => {
    let tempDate = new Date(selectedDate);
    let fDate =
      tempDate.getDate().toString().padStart(2, "0") +
      "/" +
      (tempDate.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      tempDate.getFullYear().toString().padStart(2, "0");
    setText(fDate);
    setDate(selectedDate);
    newhideDatePicker();
  };
  //Fim do código da data .....

return (
    <View>
      <Text>Registro de Eventos</Text>
      <Text>Data de Prenhez:</Text>
      <View style={styles.containerinfos}>
        <Text style={styles.tituloinfo}>{text}</Text>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: "grey",
              borderRadius: 20,
            }}
            onPress={newsshowDatePicker}
          >
            <Text style={styles.tituloinfo}>Selecione a data :</Text>
          </TouchableOpacity>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handlenewsDateConfirm}
          onCancel={newshideDatePicker}
          maximumDate={new Date()}
        />
      </View>
      <TouchableOpacity style={styles.botaopress6} onPress={registerEvents}>
        <Text style={styles.textovoltar}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.botaopress}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.textovoltar}>Voltar</Text>
      </TouchableOpacity>
    </View>
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

  const newshowDatePicker = () => {
    setIsNewDatePickerVisible(true);
  };
  const newhideDatePicker = () => {
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
    newhideDatePicker();
  };
  //Fim do código da data .....

return (
    <View>
      <Text>Registro de Eventos</Text>
      <Text>Data do cio:</Text>
      <View style={styles.containerinfos}>
        <Text style={styles.tituloinfo}>{newText}</Text>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: "grey",
              borderRadius: 20,
            }}
            onPress={newshowDatePicker}
          >
            <Text style={styles.tituloinfo}>Selecione a data :</Text>
          </TouchableOpacity>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleNewDateConfirm}
          onCancel={newhideDatePicker}
          maximumDate={new Date()}
        />
      </View>
      <TouchableOpacity style={styles.botaopress6} onPress={registerEvents}>
        <Text style={styles.textovoltar}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.botaopress}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.textovoltar}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );


};

const styles = StyleSheet.create({
  filtroNome: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    borderRadius: 20,
    width: scale(140),
    height: verticalScale(30),
    margin: verticalScale(5),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  search: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    fontSize: verticalScale(15),
    color: "white",
    textAlign: "center",
    alignSelf: "center",
    height: verticalScale(40),
    width: scale(300),
    margin: verticalScale(20),
    borderRadius: 20,
  },
  modalContainer: {
    backgroundColor: "rgba(234,242,215,1)",
    position: "absolute",
    top: verticalScale(10),
    alignSelf: "center",
    height: verticalScale(550),
    width: scale(330),
    borderRadius: 20,
  },
  cardVacas: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    marginVertical: verticalScale(4),
    position: "relative",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#004513",
  },
  contvoltar: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    color: "rgba(15, 109, 0, 0.9)",
    top: verticalScale(625),
  },
  botaovoltar: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    marginVertical: verticalScale(5),
    position: "relative",
    alignSelf: "center",
  },
  botaovoltar2: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    marginVertical: verticalScale(5),
    position: "relative",
    alignSelf: "center",
  },
  botaovoltar3: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    marginVertical: verticalScale(5),
    position: "relative",
    alignSelf: "center",
  },
  textovoltar: {
    fontSize: verticalScale(14),
    fontWeight: "bold",
    color: "#fff",
  },
  tituloinfo: {
    color: "white",
    fontSize: verticalScale(20),
    marginBottom: verticalScale(10),
    textAlign: "center",
    fontWeight: "bold",
  },
  detalhe: {
    fontSize: verticalScale(20),
    color: "black",
    backgroundColor: "white",
    borderRadius: verticalScale(5),
    marginBottom: verticalScale(20),
    textAlign: "center",
    width: scale(280),
  },
  containerinfos: {
    marginVertical: verticalScale(5),
    padding: verticalScale(5),
    width: scale(320),
    backgroundColor: "rgba(15, 109, 0, 0.7)",
    borderRadius: 20,
    alignSelf: "center",
  },
  botaoselecionaranimal: {
    backgroundColor: "#004513",
    width: scale(215),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 18,
    color: "white",
  },
  selecionaranimal: {
    color: "white",
    fontSize: verticalScale(20),
  },
  container2: {
    flex: 1,
    height: verticalScale(100),
    backgroundColor: "white",
  },
  lista2: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    alignSelf: "center",
    marginVertical: verticalScale(5),
    color: "white",
    textAlign: "center",
    fontSize: verticalScale(20),
    fontWeight: "bold",
  },
  container3: {
    height: verticalScale(300),
  },
  botaopressM: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(580),
    position: "absolute",
  },

  tituloBotao: {
    fontSize: verticalScale(14),
    fontWeight: "bold",
    color: "#fff",
  },
  botaopress: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(525),
    position: "absolute",
  },

  botaopress6: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(475),
    position: "absolute",
  },
  TituloM: {
    justifyContent: "center",
    alignSelf: "center",
    color: "#004513",
    fontSize: verticalScale(30),
    fontWeight: "bold",
  },
  botaoselecionaranimal: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    top: verticalScale(425),
    position: "absolute",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  botaopressdisabled: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.4)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(475),
    position: "absolute",
  },
  dateComponente: {
    width: 350,
  },
});

export default Reproducao;
