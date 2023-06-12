import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { scale } from "react-native-size-matters";
import uuid from "react-native-uuid";
import styles from "./styles";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../../contexts/auth";
import { useMainContext } from "../../contexts/RealmContext";
const Reproducao = ({ navigation }) => {
  const { idVaca } = useContext(AuthContext);
  const realm = useMainContext();
  const [cobertura, setCobertura] = useState(false);
  const [dataCobertura, setDataCobertura] = useState(new Date());
  const [ultimaCobertura, setDataUltimaCobertura] = useState();
  const [prenhez, setPrenhez] = useState(false);
  const [dataParto, setDataParto] = useState(new Date());
  const [dataUltimoParto, setDataUltimoParto] = useState();
  const [cio, setCio] = useState(false);
  const [dataCio, setDataCio] = useState(new Date());
  const [ultimoCio, setUltimoCio] = useState();
  const [partos, setPartos] = useState([]);
  const [callFunction, setCallFunction] = useState(0);
  const [callFunction2, setCallFunction2] = useState(0);
  const [isDatePickerCioVisible, setIsDatePickerCioVisible] = useState(false);
  const [isDatePickerPartoVisible, setIsDatePickerPartoVisible] =
    useState(false);
  const [isDatePickerCoberturaVisible, setIsDatePickerCoberturaVisible] =
    useState(false);
  useEffect(() => {
    if (realm) {
      let dataVaca = realm.objectForPrimaryKey("VacasSchema", idVaca);
      console.log(dataVaca.reproducao[0].partos);
      if (dataVaca.reproducao.length > 0) {
        setCio(dataVaca.reproducao[0].cio);
        setCobertura(dataVaca.reproducao[0].cobertura);
        setPrenhez(dataVaca.reproducao[0].prenhez);
        setUltimoCio(dataVaca.reproducao[0].dataCio);
        setDataUltimaCobertura(dataVaca.reproducao[0].dataCobertura);
        setDataUltimoParto(dataVaca.reproducao[0].dataParto);
        setPartos(dataVaca.reproducao[0].partos);
        setCallFunction2(callFunction2 + 1);
      }
      dataVaca.addListener((values) => {
        if (values.reproducao.length > 0) {
          setCio(values.reproducao[0].cio);
          setCobertura(values.reproducao[0].cobertura);
          setPrenhez(values.reproducao[0].prenhez);
          setUltimoCio(values.reproducao[0].dataCio);
          setDataUltimaCobertura(values.reproducao[0].dataCobertura);
          setDataUltimoParto(values.reproducao[0].dataParto);
        }
      });
    }
  }, [realm]);
  function dateOrHifen(date) {
    if (date) {
      return dateToText(date);
    } else {
      return "-";
    }
  }
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  function nextCio() {
    if (ultimoCio) {
      return dateOrHifen(ultimoCio.addDays(21));
    } else if (dataUltimoParto) {
      return dateOrHifen(dataUltimoParto.addDays(65));
    } else {
      return "-";
    }
  }
  function nextParto() {
    if (prenhez) {
      return dateOrHifen(ultimaCobertura.addDays(285));
    } else {
      return "-";
    }
  }
  function dateToText(date) {
    let tempDate = new Date(date);
    let fDate =
      tempDate.getDate().toString().padStart(2, "0") +
      "/" +
      (tempDate.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      tempDate.getFullYear().toString().padStart(2, "0");
    return fDate;
  }
  const datePickerCio = () => {
    setIsDatePickerCioVisible(true);
  };
  const handleDateCio = (selectedDate) => {
    setDataCio(selectedDate);
    setIsDatePickerCioVisible(false);
  };
  const datePickerCobertura = () => {
    setIsDatePickerCoberturaVisible(true);
  };
  const handleDateCobertura = (selectedDate) => {
    setDataCobertura(selectedDate);
    setIsDatePickerCoberturaVisible(false);
  };
  const datePickerParto = () => {
    setIsDatePickerPartoVisible(true);
  };
  const handleDateParto = (selectedDate) => {
    setDataParto(selectedDate);
    setIsDatePickerPartoVisible(false);
  };
  function handleCio() {
    setCio(true);
    setCobertura(false);
    setPrenhez(false);
    setDataCobertura(ultimaCobertura);
    setDataParto(dataUltimoParto);
    setCallFunction(callFunction + 1);
  }
  function handleCobertura() {
    setCio(true);
    setCobertura(true);
    setPrenhez(false);
    setDataCio(dataCobertura);
    setDataParto(dataUltimoParto);
    setCallFunction(callFunction + 1);
  }
  function handleParto() {
    setCio(false);
    setCobertura(false);
    setPrenhez(false);
    setDataCio(null);
    setDataCobertura(null);
    setCallFunction(callFunction + 1);
  }
  useEffect(() => {
    if (callFunction > 0) {
      UpdateInfoVaca();
    }
  }, [callFunction]);
  async function UpdateInfoVaca() {
    if (realm) {
      try {
        let newParto = { _id: uuid.v4(), dataParto: dataParto };
        let finalParto = [...partos, newParto];
        realm.write(() => {
          let updateVaca = realm.objectForPrimaryKey("VacasSchema", idVaca);
          updateVaca.reproducao = [
            {
              _id: uuid.v4(),
              cio: cio,
              cobertura: cobertura,
              prenhez: prenhez,
              dataCio: dataCio,
              dataCobertura: dataCobertura,
              dataParto: dataParto,
              partos: finalParto,
            },
          ];
          setDataCio(new Date());
          setDataCobertura(new Date());
          setDataParto(new Date());
          setCallFunction(0);
        });
      } catch (e) {
        Alert.alert("Não foi possível modificar!", e.message);
      }
    }
  }
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
              {cio ? (
                <AntDesign name="check" size={scale(25)} color="white" />
              ) : (
                <AntDesign name="close" size={scale(25)} color="white" />
              )}
            </View>
            <View>
              <View style={styles.containerRow}>
                <Text style={styles.txtInfoCategoria}>Último cio:</Text>
                <Text style={styles.txtInfoCategoria}>
                  {dateOrHifen(ultimoCio)}
                </Text>
              </View>
              <View style={styles.containerRow}>
                <Text style={styles.txtInfoCategoria}>Próximo cio:</Text>
                <Text style={styles.txtInfoCategoria}>{nextCio()}</Text>
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
                    {dateOrHifen(dataCio)}
                  </Text>
                  <TouchableOpacity onPress={() => datePickerCio()}>
                    <AntDesign name="calendar" size={scale(16)} color="white" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.botaoData}
                  onPress={() => handleCio()}
                >
                  <Text style={styles.tituloinfo}>Vaca no cio</Text>
                </TouchableOpacity>
              </View>
              <DateTimePickerModal
                isVisible={isDatePickerCioVisible}
                mode="date"
                onConfirm={handleDateCio}
                onCancel={() => setIsDatePickerCioVisible(false)}
                maximumDate={new Date()}
              />
            </View>
          </View>
          {/* COBERTURA  */}
          <View style={styles.containerCategoria}>
            <View style={styles.containerTituloCategoria}>
              <Text style={styles.txtCobertura}>Cobertura</Text>
              {cobertura ? (
                <AntDesign name="check" size={scale(25)} color="white" />
              ) : (
                <AntDesign name="close" size={scale(25)} color="white" />
              )}
            </View>
            <View>
              <View style={styles.containerRow}>
                <Text style={styles.txtInfoCategoria}>Data de Cobertura:</Text>
                <Text style={styles.txtInfoCategoria}>
                  {dateOrHifen(ultimaCobertura)}
                </Text>
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
                    {dateOrHifen(dataCobertura)}
                  </Text>
                  <TouchableOpacity onPress={() => datePickerCobertura()}>
                    <AntDesign name="calendar" size={scale(16)} color="white" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.botaoData}
                  onPress={() => handleCobertura()}
                >
                  <Text style={styles.tituloinfo}>Vaca foi coberta</Text>
                </TouchableOpacity>
              </View>
              <DateTimePickerModal
                isVisible={isDatePickerCoberturaVisible}
                mode="date"
                onConfirm={handleDateCobertura}
                onCancel={() => setIsDatePickerCoberturaVisible(false)}
                maximumDate={new Date()}
              />
            </View>
          </View>
          <View style={styles.containerCategoria}>
            <View style={styles.containerTituloCategoria}>
              <Text style={styles.txtCobertura}>Prenhez</Text>
              {prenhez ? (
                <AntDesign name="check" size={scale(25)} color="white" />
              ) : (
                <AntDesign name="close" size={scale(25)} color="white" />
              )}
            </View>
            <View>
              <View style={styles.containerRow}>
                <Text style={styles.txtInfoCategoria}>Último parto:</Text>
                <Text style={styles.txtInfoCategoria}>
                  {dateOrHifen(dataUltimoParto)}
                </Text>
              </View>
              <View style={styles.containerRow}>
                <Text style={styles.txtInfoCategoria}>Possível de parto:</Text>
                <Text style={styles.txtInfoCategoria}>{nextParto()}</Text>
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
                    {dateOrHifen(dataParto)}
                  </Text>
                  <TouchableOpacity onPress={() => datePickerParto()}>
                    <AntDesign name="calendar" size={scale(16)} color="white" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.botaoData}
                  onPress={() => handleParto()}
                >
                  <Text style={styles.tituloinfo}>Vaca pariu</Text>
                </TouchableOpacity>
              </View>

              <DateTimePickerModal
                isVisible={isDatePickerPartoVisible}
                mode="date"
                onConfirm={handleDateParto}
                onCancel={() => setIsDatePickerPartoVisible(false)}
                maximumDate={new Date()}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.containervoltar}>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate("Home")}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={styles.textovoltar}>Voltar</Text>
            </View>
            <MaterialIcons name="arrow-back" size={scale(24)} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Reproducao;
