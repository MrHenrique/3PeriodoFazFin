import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import getRebVacas from "../../Realm/getRebVacas";
import Graficodetalhesvacas from "../Graficos/Graficodetalhesvacas";
import Modal from "react-native-modal";
import { scale, verticalScale } from "react-native-size-matters";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import writeUpdVaca from "../../Realm/writeUpdVaca";
import { AuthContext } from "../../contexts/auth";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("screen").width;
const ScreenHeight = Dimensions.get("screen").height;

function Lista_vacas({ textobarrapesquisa, idrebanho }) {
  const { precoCFReb, GrafVaca } = useContext(AuthContext);
  async function fetchVaca() {
    try {
      const datavacas = await getRebVacas(idrebanho);
      //console.log(datavacas, "DATVASs")
      setList(datavacas);
      setdata(datavacas);
      setisInfoeditable(false);
      var gasto = precoCFReb / datavacas.length;
      setGastoReb(gasto);
    } catch (e) {}
  }

  useFocusEffect(
    useCallback(() => {
      fetchVaca();
    }, [])
  );
  const [gastoReb, setGastoReb] = useState(0);
  const [List, setList] = useState();
  const [data, setdata] = useState();
  const [Searchtext, setSearchtext] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isInfoeditable, setisInfoeditable] = useState(false);
  const [Details, setDetails] = useState([]);
  const [macho, setmacho] = useState("");
  const [femea, setfemea] = useState("");

  const [nomeVaca, setnomeVaca] = useState("");
  const [genero, setgenero] = useState();
  const [nascimentoVaca, setnascimentoVaca] = useState("");
  const [brincoVaca, setbrincoVaca] = useState("");
  const [IdVaca, setIdVaca] = useState("");
  const [descVaca, setdescVaca] = useState("");
  const [resultL, setResultL] = useState(0);
  var infoedited = false;
  function getResultL(item) {
    var resultLeite = 0;
    for (var i in item.receitas) {
      resultLeite += item.receitas[i].prodL * item.receitas[i].precoL;
    }
    return resultLeite;
  }

  function setInputs(item) {
    verificagenero();
    setnomeVaca(item.nomeVaca);
    setgenero(item.genero);
    setnascimentoVaca(item.nascimentoVaca);
    setbrincoVaca(item.brincoVaca);
    setdescVaca(item.descVaca);
    var idvaca = item._id;
    setIdVaca(idvaca);
    const resultLeite = getResultL(item);
    setResultL(resultLeite);
    GrafVaca(resultLeite - gastoReb);
    console.log(IdVaca, "IDVACA");
    console.log(item._id, "IDVACA");
    //console.log(genero, "Initialized info 2")
  }
  function UpdateinfoVaca() {
    const data2mod = {
      _id: IdVaca,
      nomeVaca: nomeVaca,
      nascimentoVaca: nascimentoVaca,
      brincoVaca: brincoVaca,
      descVaca: descVaca,
      genero: genero,
    };
    writeUpdVaca(data2mod);
    fetchVaca();
    toggleModal();
    console.log(genero, "Update info");
  }

  //console.log(List);
  {
    /*Verifica a barra de pesquisa e salva na state*/
  }
  useEffect(() => {
    setSearchtext(textobarrapesquisa);
  }, [textobarrapesquisa]);
  {
    /*Verifica o state da barra de pesquisa, se ouver mudanca atualiza a lista*/
  }
  useEffect(() => {
    setSearchtext(textobarrapesquisa);
    if (Searchtext === "") {
      setList(data);
    } else {
      setList(
        data.filter((item) => {
          if (
            item.nomeVaca.toLowerCase().indexOf(Searchtext.toLowerCase()) > -1
          ) {
            return true;
          } else {
            return false;
          }
        })
      );
    }
  }, [Searchtext]);

  function toggleModal() {
    if (isModalVisible === false) {
      setisInfoeditable(false);
    }
    setModalVisible(!isModalVisible);
  }
  function CanContinue() {
    if (isInfoeditable === true) {
      return true;
    } else {
      return false;
    }
  }
  function editarinfos() {
    setisInfoeditable(!isInfoeditable);
    Alert.alert(
      "Editar Informações da Vaca",
      "logo apos confirme no botao confirmar alterações"
    );
  }

  function verificagenero() {
    if (Details.genero === 1) {
      setgenero(1);
      setmacho("check-square");
      setfemea("square");
    } else {
      () => setgenero(0);
      setmacho("square");
      setfemea("check-square");
    }
  }

  function Contasvaca(a) {
    if (a == 1) return Details.lucro;
    else if (a == 2) return Details.gasto;
    else if (a == 3) return Details.media;
  }
  function getResultNumber(item) {
    const result = (getResultL(item) - gastoReb).toFixed(2);
    return result;
  }
  return (
    <View style={styles.Tudocont}>
      <View>
        <Modal
          isVisible={isModalVisible}
          coverScreen={true}
          backdropColor={"#00290C"}
          deviceHeight={ScreenHeight}
          deviceWidth={ScreenWidth}
          onBackButtonPress={() => {
            toggleModal();
          }}
          Style={{ margin: 0 }}
          statusBarTranslucent
        >
          <ScrollView>
            <View style={{ paddingBottom: verticalScale(70) }}>
              <View style={styles.containermodal}>
                {/*NOME DA VACA E IMAGEM*/}
                <View style={styles.Vacaavatar}>
                  <TextInput
                    style={styles.textavatar}
                    value={nomeVaca}
                    editable={isInfoeditable}
                    onChangeText={setnomeVaca}
                  />
                  <MaterialCommunityIcons
                    name="cow"
                    size={verticalScale(60)}
                    color="white"
                  />
                </View>
                {/*Sexo*/}
                <View
                  style={[
                    styles.containerinfos,
                    { flexDirection: "row", justifyContent: "space-around" },
                  ]}
                >
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setgenero(1),
                          setmacho("check-square"),
                          setfemea("square");
                      }}
                      disabled={!isInfoeditable}
                    >
                      <Text style={styles.tituloinfo}>Macho</Text>
                      <Feather name={macho} size={scale(25)} color="white" />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setgenero(0),
                        setfemea("check-square"),
                        setmacho("square");
                    }}
                    disabled={!isInfoeditable}
                  >
                    <View>
                      <Text style={styles.tituloinfo}>Fêmea</Text>
                      <Feather name={femea} size={scale(25)} color="white" />
                    </View>
                  </TouchableOpacity>
                </View>
                {/*Data de Nascimento*/}
                <View style={styles.containerinfos}>
                  <Text style={styles.tituloinfo}>Data de Nascimento:</Text>
                  <TextInput
                    style={styles.detalhe}
                    value={nascimentoVaca}
                    editable={isInfoeditable}
                    onChangeText={setnascimentoVaca}
                    keyboardType="number-pad"
                  />
                </View>
                {/*Indentificação*/}
                <View style={styles.containerinfos}>
                  <Text style={styles.tituloinfo}>Indentificação(brinco):</Text>
                  <TextInput
                    style={styles.detalhe}
                    value={brincoVaca}
                    editable={isInfoeditable}
                    onChangeText={setbrincoVaca}
                    keyboardType="number-pad"
                  />
                </View>
                {/*Descrição*/}
                <View style={styles.containerinfos}>
                  <Text style={styles.tituloinfo}>Descrição:</Text>
                  <TextInput
                    style={styles.detalhe}
                    value={descVaca}
                    editable={isInfoeditable}
                    onChangeText={setdescVaca}
                    multiline={true}
                  />
                </View>
                <View style={styles.containerinfos}>
                  <Text style={styles.tituloinfo}>Resultado:</Text>
                  <Text style={styles.detalhe}>
                    R${(resultL - gastoReb).toFixed(2)}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: "rgba(15, 109, 0, 0.7)",
                    marginTop: verticalScale(10),
                  }}
                >
                  <Graficodetalhesvacas />
                </View>

                <TouchableOpacity
                  style={styles.botaoeditar}
                  onPress={() => {
                    editarinfos();
                  }}
                >
                  <Text style={styles.texteditar}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.botaoeditar,
                    {
                      backgroundColor:
                        CanContinue() === true ? "#004513" : "#0f6d00b3",
                    },
                  ]}
                  onPress={() => {
                    UpdateinfoVaca();
                  }}
                  disabled={!CanContinue()}
                >
                  <Text style={styles.texteditar}>Confirmar modificações</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            style={styles.botaovoltar}
            onPress={() => {
              toggleModal();
            }}
          >
            <Text style={styles.textovoltar}>Voltar</Text>
          </TouchableOpacity>
        </Modal>
      </View>
      <FlatList
        data={List}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <View style={styles.containerVacas}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[
                styles.cardVacas,
                { backgroundColor: index % 2 === 0 ? "#0F6D00" : "#004513" },
              ]}
              onPress={() => {
                setDetails(item);
                setInputs(item);
                toggleModal();
              }}
            >
              <Text style={styles.textVacas}>{item.nomeVaca}</Text>
              <View style={styles.containerRendimento}>
                <Text style={{ color: "#fff", fontSize: scale(14) }}>
                  Rendimento:
                </Text>
                <Text
                  style={{
                    color: getResultNumber(item) >= 0 ? "#0FFF50" : "#FF3131",
                    fontWeight: "bold",
                    fontSize: scale(15),
                  }}
                >
                  R${getResultNumber(item)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerVacas: {
    flex: 1,
    margin: 5,
    alignItems: "center",
  },
  cardVacas: {
    padding: 15,
    alignItems: "center",
    borderRadius: windowHeight * 0.015,
    width: "90%",
  },
  textVacas: {
    color: "#f2f2f2",
    fontSize: windowWidth * 0.06,
    fontWeight: "bold",
  },
  Tudocont: {
    flex: 1,
    paddingTop: "5%",
    paddingBottom: "1%",
    width: windowWidth,
    paddingBottom:
      ScreenHeight >= 800 ? verticalScale(135) : verticalScale(110),
  },
  containermodal: {
    backgroundColor: "#005f1d",
    borderRadius: 5,
    height: "100%",
    padding: 20,
    marginBottom: 11,
  },
  Vacaavatar: {
    backgroundColor: "#00290C",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(15),
  },
  textavatar: {
    fontSize: 24,
    paddingLeft: scale(10),
    color: "white",
  },
  tituloinfo: {
    color: "#c4c4c4ff",
    fontSize: scale(15),
  },
  detalhe: {
    fontSize: scale(20),
    color: "white",
  },
  containerinfos: {
    marginTop: verticalScale(10),
    padding: scale(10),
    backgroundColor: "rgba(15, 109, 0, 0.7)",
    borderRadius: scale(8),
  },

  botaovoltar: {
    backgroundColor: "#00641c",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#111",
    borderWidth: scale(2),
    borderRadius: 18,
    position: "absolute",
    top: ScreenHeight >= 800 ? verticalScale(633) : verticalScale(605),
    left: scale(8),
  },
  textovoltar: {
    fontSize: verticalScale(14),
    fontWeight: "bold",
    color: "#fff",
  },
  botaoeditar: {
    backgroundColor: "rgba(255, 30, 0, 1)",
    marginTop: verticalScale(10),
    width: scale(280),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  texteditar: {
    fontSize: verticalScale(16),
    color: "white",
  },
  contasvaca: {
    width: "100%",
    padding: verticalScale(10),
  },
  text: {
    fontSize: verticalScale(18),
    textAlign: "center",
    backgroundColor: "#f2f2f2",
  },
  rendimento: {
    fontSize: verticalScale(25),
    textAlign: "center",
  },
  rendimentototal: {
    fontSize: verticalScale(25),
    textAlign: "center",
    color: "#080",
  },
  containerRendimento: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});

export default Lista_vacas;
