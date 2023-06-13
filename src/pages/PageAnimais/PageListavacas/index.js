import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Alert,
  Keyboard,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { scale } from "react-native-size-matters";
import { TextInput } from "react-native-paper";
import styles from "./styles";
import { AuthContext } from "../../../contexts/auth";
import { useMainContext } from "../../../contexts/RealmContext";
import { Colors } from "../../../styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import uuid from "react-native-uuid";

const imgbg1 = "../../../../assets/fazfinwhiteletter.png";

function PageListavacas({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const { rebID, IdVaca } = useContext(AuthContext);
  const [listaVaca, setListaVaca] = useState([]);
  const [lista, setLista] = useState(listaVaca);
  const [keyboardStatus, setkeyboardStatus] = useState(false);
  const realm = useMainContext();
  useEffect(() => {
    Date.prototype.addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    if (realm) {
      let rebanho = realm.objectForPrimaryKey("RebanhoSchema", rebID);
      let vacas = rebanho.vacas;
      let notificacaoArray = [];
      vacas.forEach((vaca) => {
        if (vaca.reproducao.length > 0) {
          let notificacao = vaca.reproducao[0].notificacao;
          let idVaca = vaca._id;
          let cio = vaca.reproducao[0].cio;
          let cobertura = vaca.reproducao[0].cobertura;
          let prenhez = vaca.reproducao[0].prenhez;
          let ultimoCio = vaca.reproducao[0].dataCio;
          let ultimaCobertura = vaca.reproducao[0].dataCobertura;
          let dataUltimoParto = vaca.reproducao[0].dataParto;

          if (!cio && !prenhez && notificacao === true) {
            if (ultimoCio) {
              if (
                ultimoCio.addDays(21) > new Date().addDays(-1) &&
                ultimoCio.addDays(21) < new Date().addDays(+1)
              ) {
                notificacaoArray.push({
                  CioPartoHoje: vaca.nomeVaca,
                });
              }
            }
          }
          if (prenhez && notificacao === true) {
            if (
              ultimaCobertura.addDays(285) > new Date().addDays(-1) &&
              ultimaCobertura.addDays(285) < new Date().addDays(+1)
            ) {
              notificacaoArray.push({
                CioPartoHoje: vaca.nomeVaca,
              });
            }
          }
          endCio(
            idVaca,
            cio,
            cobertura,
            prenhez,
            ultimoCio,
            ultimaCobertura,
            dataUltimoParto
          );
          possivelPrenhez(
            idVaca,
            cio,
            cobertura,
            prenhez,
            ultimoCio,
            ultimaCobertura,
            dataUltimoParto
          );
        }
        function possivelPrenhez(
          idVaca,
          cio,
          cobertura,
          prenhez,
          ultimoCio,
          ultimaCobertura,
          dataUltimoParto
        ) {
          if (!cio && cobertura && !prenhez) {
            if (ultimoCio.addDays(21) < new Date()) {
              let prenhez = true;
              let dataCio = ultimoCio;
              let dataParto = dataUltimoParto;
              let dataCobertura = ultimaCobertura;
              UpdateInfoVaca(
                idVaca,
                cio,
                cobertura,
                prenhez,
                dataCio,
                dataParto,
                dataCobertura
              );
            }
          }
        }

        function endCio(
          idVaca,
          cio,
          cobertura,
          prenhez,
          ultimoCio,
          ultimaCobertura,
          dataUltimoParto
        ) {
          if (cio && ultimoCio.addDays(1) < new Date()) {
            let cio = false;
            let dataCio = ultimoCio;
            let dataParto = dataUltimoParto;
            let dataCobertura = ultimaCobertura;
            UpdateInfoVaca(
              idVaca,
              cio,
              cobertura,
              prenhez,
              dataCio,
              dataParto,
              dataCobertura
            );
            possivelPrenhez(
              idVaca,
              cio,
              cobertura,
              prenhez,
              ultimoCio,
              ultimaCobertura,
              dataUltimoParto
            );
          }
        }

        async function UpdateInfoVaca(
          idVaca,
          cio,
          cobertura,
          prenhez,
          dataCio,
          dataParto,
          dataCobertura
        ) {
          if (realm) {
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
                },
              ];
            });
          }
        }
      });
      const nameListCioParto = notificacaoArray.map(
        (item) => item.CioPartoHoje
      );
      const nameStringCioParto = nameListCioParto.join(",");
      if (nameStringCioParto.length > 0) {
        Alert.alert(
          "Reprodução",
          `Vacas com provável cio ou parto hoje:\n${nameStringCioParto}`
        );
      }
    }
  }, [realm]);
  //buscar banco
  useEffect(() => {
    if (realm) {
      let dataVacas = realm.objectForPrimaryKey("RebanhoSchema", rebID);
      setLista(dataVacas.vacas);
      dataVacas.vacas.addListener((values) => {
        setLista([...values]);
        setListaVaca([...values]);
      });
      setListaVaca(dataVacas.vacas);
    }
  }, [realm]);
  //Search Bar
  useEffect(() => {
    if (searchText === "") {
      setLista(listaVaca);
    } else {
      setLista(
        listaVaca.filter(
          (item) =>
            item.nomeVaca.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [searchText]);
  // LISTENER DO TECLADO(ATIVADO OU NAO)
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setkeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setkeyboardStatus(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  //Resultado por vaca
  function getResultL(item) {
    var resultLeite = 0;
    item.receitas.forEach((receitas) => {
      resultLeite += receitas.prodL * receitas.precoL;
    });
    return resultLeite;
  }
  function getResultD(item) {
    var resultDespesas = 0;
    item.despesas.forEach((receitas) => {
      resultDespesas += receitas.qtdProd * receitas.valorProd;
    });
    return resultDespesas;
  }
  function getResultNumber(item) {
    const result = (getResultL(item) - getResultD(item)).toFixed(2);
    const formattedResult = `R$ ${result.replace(".", ",")}`;
    return formattedResult;
  }
  function getResultNumberColor(item) {
    const result = (getResultL(item) - getResultD(item)).toFixed(2);
    return result;
  }

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        {/*Barra de pesquisa*/}
        <TextInput
          style={styles.statusbar}
          placeholderTextColor={Colors.grey}
          textColor={Colors.black}
          activeUnderlineColor={Colors.green}
          underlineStyle={{ paddingBottom: 3 }}
          mode="flat"
          placeholder="Pesquise pelo nome."
          cursorColor={Colors.black}
          onChangeText={(t) => setSearchText(t)}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: scale(5),
            justifyContent: "space-evenly",
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <TouchableOpacity
              style={styles.btnfiltro}
              rippleColor={Colors.grey}
              onPress={() => console.log("Pressed")}
            >
              <Text style={styles.fontBtnFiltro}>Filtros</Text>
              <MaterialCommunityIcons
                name="filter-outline"
                size={scale(20)}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={styles.btnfiltro}
              rippleColor={Colors.grey}
              onPress={() => navigation.navigate("CadastroVaca")}
            >
              <Text style={styles.fontBtnFiltro}>Cadastrar</Text>
              <MaterialCommunityIcons
                name="plus"
                size={scale(20)}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ImageBackground
        resizeMode="repeat"
        style={styles.containergeral}
        source={require(imgbg1)}
        imageStyle={{ opacity: 0.02 }}
      >
        <View style={styles.containerLista}>
          <FlatList
            fadingEdgeLength={70}
            data={lista}
            keyExtractor={(item) => item._id}
            maxToRenderPerBatch={7}
            initialNumToRender={7}
            renderItem={({ item, index }) => (
              <View style={styles.containerVacas}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={[
                    styles.cardVacas,
                    {
                      backgroundColor: index % 2 === 0 ? "#1B5E20" : "#154c21",
                    },
                  ]}
                  onPress={() => {
                    IdVaca(item._id);
                    navigation.navigate("PageDetalheVaca");
                  }}
                >
                  <Text style={styles.textVacas}>{item.nomeVaca}</Text>
                  <View style={styles.containerRendimento}>
                    <Text style={{ color: "#fff", fontSize: scale(14) }}>
                      Rendimento:
                    </Text>
                    <Text
                      style={{
                        color:
                          getResultNumberColor(item) >= 0
                            ? "#00C853"
                            : "#DD2C00",
                        fontWeight: "bold",
                        fontSize: scale(15),
                      }}
                    >
                      {getResultNumber(item)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <View
          style={keyboardStatus ? { display: "none" } : styles.containervoltar}
        >
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
      </ImageBackground>
    </View>
  );
}

export default PageListavacas;
