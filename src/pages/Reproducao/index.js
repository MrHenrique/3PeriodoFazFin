import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { scale, verticalScale } from "react-native-size-matters";
import uuid from "react-native-uuid";
import styles from "./styles";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../../contexts/auth";
import { useMainContext } from "../../contexts/RealmContext";
import { Button, Divider, IconButton, MD3Colors } from "react-native-paper";
import { Colors } from "../../styles";
const Reproducao = ({ navigation }) => {
  const { idVaca } = useContext(AuthContext);
  const realm = useMainContext();
  const [cobertura, setCobertura] = useState(false);
  const [dataCobertura, setDataCobertura] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [ultimaCobertura, setDataUltimaCobertura] = useState();
  const [prenhez, setPrenhez] = useState(false);
  const [dataParto, setDataParto] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [dataUltimoParto, setDataUltimoParto] = useState();
  const [cio, setCio] = useState(false);
  const [dataCio, setDataCio] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [ultimoCio, setUltimoCio] = useState();
  const [partos, setPartos] = useState([]);
  const [callFunction, setCallFunction] = useState(0);
  const [notificacao, setNotificacao] = useState(false);
  const [nCrias, setNcrias] = useState(0);
  const [idRepr, setIdRepr] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [click, setClick] = useState(false);
  const [isDatePickerCioVisible, setIsDatePickerCioVisible] = useState(false);
  const [isDatePickerPartoVisible, setIsDatePickerPartoVisible] =
    useState(false);
  const [isDatePickerCoberturaVisible, setIsDatePickerCoberturaVisible] =
    useState(false);
  useEffect(() => {
    if (realm) {
      let dataVaca = realm.objectForPrimaryKey("VacasSchema", idVaca);
      if (dataVaca.reproducao.length > 0) {
        console.log(dataVaca.reproducao[0].partos);
        setIdRepr(dataVaca.reproducao[0]._id);
        setCio(dataVaca.reproducao[0].cio);
        setCobertura(dataVaca.reproducao[0].cobertura);
        setPrenhez(dataVaca.reproducao[0].prenhez);
        setUltimoCio(dataVaca.reproducao[0].dataCio);
        setDataUltimaCobertura(dataVaca.reproducao[0].dataCobertura);
        setDataUltimoParto(dataVaca.reproducao[0].dataParto);
        setPartos(dataVaca.reproducao[0].partos);
        if (dataVaca.reproducao[0].partos.length > 0) {
          setNcrias(dataVaca.reproducao[0].partos.length);
        }
        if (
          dataVaca.reproducao[0].notificacao === true ||
          dataVaca.reproducao[0].notificacao === false
        ) {
          setNotificacao(dataVaca.reproducao[0].notificacao);
        }
      }
      dataVaca.addListener((values) => {
        if (values.reproducao.length > 0) {
          setIdRepr(dataVaca.reproducao[0]._id);
          setCio(values.reproducao[0].cio);
          setCobertura(values.reproducao[0].cobertura);
          setPrenhez(values.reproducao[0].prenhez);
          setUltimoCio(values.reproducao[0].dataCio);
          setDataUltimaCobertura(values.reproducao[0].dataCobertura);
          setDataUltimoParto(values.reproducao[0].dataParto);
          setPartos(dataVaca.reproducao[0].partos);
          if (dataVaca.reproducao[0].partos.length > 0) {
            setNcrias(dataVaca.reproducao[0].partos.length);
          }
          if (
            dataVaca.reproducao[0].notificacao === true ||
            dataVaca.reproducao[0].notificacao === false
          ) {
            setNotificacao(dataVaca.reproducao[0].notificacao);
          }
        }
      });
      if (refresh === true) {
        setRefresh(false);
      }
    }
  }, [realm, refresh]);
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
      return dateOrHifen(ultimoCio.addDays(21).toISOString().substring(0, 10));
    } else if (dataUltimoParto) {
      return dateOrHifen(
        dataUltimoParto.addDays(50).toISOString().substring(0, 10)
      );
    } else {
      return "-";
    }
  }
  function nextParto() {
    if (prenhez) {
      return dateOrHifen(
        ultimaCobertura.addDays(285).toISOString().substring(0, 10)
      );
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
    if ((cio || !cobertura || !prenhez) && !click) {
      Alert.alert(
        "Tem certeza que deseja confirmar parto?",
        "Se sim, clique novamente em vaca pariu."
      );
      setClick(true);
    } else {
      setCio(false);
      setCobertura(false);
      setPrenhez(false);
      setDataCio(null);
      setDataCobertura(null);
      setClick(false);
      setCallFunction(callFunction + 1);
    }
  }
  useEffect(() => {
    if (callFunction > 0) {
      UpdateInfoVaca();
    }
  }, [callFunction]);
  function partoNull() {
    if (dataParto != null) {
      let newParto = { _id: uuid.v4(), dataParto: dataParto };
      let finalParto = [...partos, newParto];
      return finalParto;
    } else {
      return partos;
    }
  }
  async function UpdateInfoVaca() {
    if (realm) {
      try {
        if (dataParto != null) {
          let newParto = { _id: uuid.v4(), dataParto: dataParto };
          let finalParto = [...partos, newParto];
        }
        realm.write(() => {
          let updateVaca = realm.objectForPrimaryKey("VacasSchema", idVaca);
          updateVaca.reproducao = [
            {
              _id: idRepr,
              cio: cio,
              cobertura: cobertura,
              prenhez: prenhez,
              dataCio: dataCio,
              dataCobertura: dataCobertura,
              dataParto: dataParto,
              partos: partoNull(),
              notificacao: notificacao,
            },
          ];
          setDataCio(new Date().toISOString().substring(0, 10));
          setDataCobertura(new Date().toISOString().substring(0, 10));
          setDataParto(new Date().toISOString().substring(0, 10));
          setCallFunction(0);
        });
      } catch (e) {
        Alert.alert("Não foi possível modificar!", e.message);
      }
    }
  }
  function createAlert(notificacao) {
    if (realm) {
      try {
        realm.write(() => {
          let updateVaca = realm.create(
            "ReproducaoSchema",
            {
              _id: idRepr,
              notificacao: notificacao,
            },
            "modified"
          );
        });
      } catch (e) {
        Alert.alert("Não foi possível modificar!", e.message);
      }
      setRefresh(true);
    }
  }
  function alertButtonAction() {
    if (notificacao === false) {
      let notificacao = true;
      createAlert(notificacao);
    } else if (notificacao === true) {
      let notificacao = false;
      createAlert(notificacao);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.containergeral}>
        <Button
          mode="elevated"
          textColor="black"
          labelStyle={{ fontSize: scale(13) }}
          buttonColor={
            !notificacao === true ? Colors.neongreen : MD3Colors.error60
          }
          icon={
            !notificacao === true ? "bell-check-outline" : "bell-cancel-outline"
          }
          style={{ zindex: 10, margin: scale(5), marginHorizontal: scale(25) }}
          onPress={() => alertButtonAction()}
        >
          {!notificacao === true ? "Criar Alerta" : "Desligar Alerta"}
        </Button>
        {/* CATEGORIA DE REPRODUÇÃO */}
        {/* CIO */}
        <ScrollView style={styles.containerScrollView} fadingEdgeLength={100}>
          <View style={styles.containerCategoria}>
            <View style={styles.containerTituloCategoria}>
              <Text style={styles.txtCobertura}>Cio</Text>
              {cio ? (
                <AntDesign
                  name="check"
                  size={scale(25)}
                  color={Colors.neongreen}
                />
              ) : (
                <AntDesign
                  name="close"
                  size={scale(25)}
                  color={MD3Colors.error60}
                />
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
                <Divider bold="true" style={{ marginVertical: scale(4) }} />
                <Text style={styles.txtInfoCategoria}>Data selecionada</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    backgroundColor: Colors.darkgreen,
                    marginHorizontal: scale(60),
                    borderRadius: 15,
                    padding: verticalScale(3),
                  }}
                >
                  <Text style={styles.txtInfoCategoria}>
                    {dateOrHifen(dataCio)}
                  </Text>
                  <IconButton
                    onPress={() => datePickerCio()}
                    icon="calendar"
                    iconColor="white"
                    containerColor={Colors.green}
                    size={scale(16)}
                  />
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
                <AntDesign
                  name="check"
                  size={scale(25)}
                  color={Colors.neongreen}
                />
              ) : (
                <AntDesign
                  name="close"
                  size={scale(25)}
                  color={MD3Colors.error60}
                />
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
                <Divider bold="true" style={{ marginVertical: scale(4) }} />
                <Text style={styles.txtInfoCategoria}>Data selecionada</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    backgroundColor: Colors.darkgreen,
                    marginHorizontal: scale(60),
                    borderRadius: 15,
                    padding: verticalScale(3),
                  }}
                >
                  <Text style={styles.txtInfoCategoria}>
                    {dateOrHifen(dataCobertura)}
                  </Text>
                  <IconButton
                    onPress={() => datePickerCobertura()}
                    icon="calendar"
                    iconColor="white"
                    containerColor={Colors.green}
                    size={scale(16)}
                  />
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
              <Text style={styles.txtCobertura}>Possível Prenhez</Text>
              {prenhez ? (
                <AntDesign
                  name="check"
                  size={scale(25)}
                  color={Colors.neongreen}
                />
              ) : (
                <AntDesign
                  name="close"
                  size={scale(25)}
                  color={MD3Colors.error60}
                />
              )}
            </View>
            <View>
              <View style={styles.containerRow}>
                <Text style={styles.txtInfoCategoria}>Número de crias:</Text>
                <Text style={styles.txtInfoCategoria}>{nCrias}</Text>
              </View>
              <View style={styles.containerRow}>
                <Text style={styles.txtInfoCategoria}>Último parto:</Text>
                <Text style={styles.txtInfoCategoria}>
                  {dateOrHifen(dataUltimoParto)}
                </Text>
              </View>
              <View style={styles.containerRow}>
                <Text style={styles.txtInfoCategoria}>
                  Data de possível parto:
                </Text>
                <Text style={styles.txtInfoCategoria}>{nextParto()}</Text>
              </View>
              <View>
                <Divider bold="true" style={{ marginVertical: scale(4) }} />
                <Text style={styles.txtInfoCategoria}>Data selecionada</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    backgroundColor: Colors.darkgreen,
                    marginHorizontal: scale(60),
                    borderRadius: 15,
                    padding: verticalScale(3),
                  }}
                >
                  <Text style={styles.txtInfoCategoria}>
                    {dateOrHifen(dataParto)}
                  </Text>
                  <IconButton
                    onPress={() => datePickerParto()}
                    icon="calendar"
                    iconColor="white"
                    containerColor={Colors.green}
                    size={scale(16)}
                  />
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
