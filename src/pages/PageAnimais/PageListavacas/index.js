import React, { useState, useContext, useEffect } from "react";
import {
  Dimensions,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { AuthContext } from "../../contexts/auth";
import Graficodetalhesvacas from "../../components/Graficos/Graficodetalhesvacas";
import Modal from "react-native-modal";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useMainContext } from "../../contexts/RealmContext";
const imgbg1 = "../../../assets/listavacas-bg.jpg";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("screen").width;
const ScreenHeight = Dimensions.get("screen").height;
function PageListavacas({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const { rebID } = useContext(AuthContext);
  const { precoCFReb, GrafVaca, ListaReceitaVacas } = useContext(AuthContext);
  const [gastoReb, setGastoReb] = useState(0);
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
  const [listaVaca, setListaVaca] = useState([]);
  const [lista, setLista] = useState(listaVaca);
  const realm = useMainContext();

  //buscar banco
  useEffect(() => {
    if (realm) {
      let dataVacas = realm.objectForPrimaryKey("RebanhoSchema", rebID);
      setLista(dataVacas.vacas.sorted("nomeVaca"));
      dataVacas.vacas.sorted("nomeVaca").addListener((values) => {
        setLista([...values]);
      });
      setListaVaca(dataVacas.vacas.sorted("nomeVaca"));
      dataVacas.vacas.sorted("nomeVaca").addListener((values) => {
        setListaVaca([...values]);
      });
      setisInfoeditable(false);
      var gasto = precoCFReb / dataVacas.vacas.length;
      setGastoReb(gasto);
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
  //Resultado por vaca
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
    ListaReceitaVacas(item.receitas); //Usado para criar um array com as receitas das Vacas para usar no Graficodetalhesvacas
    var idvaca = item._id;
    setIdVaca(idvaca);
    const resultLeite = getResultL(item);
    setResultL(resultLeite);
    GrafVaca(resultLeite - gastoReb);
  }
  //modificar detalhes
  async function UpdateinfoVaca() {
    if (realm) {
      try {
        realm.write(() => {
          let updateVaca = realm.objectForPrimaryKey("VacasSchema", IdVaca);
          updateVaca.nomeVaca = nomeVaca;
          updateVaca.nascimentoVaca = nascimentoVaca;
          updateVaca.brincoVaca = brincoVaca;
          updateVaca.createdAt = new Date();
          updateVaca.descVaca = descVaca;
          updateVaca.genero = genero;
          Alert.alert("Dados modificados com sucesso!");
          toggleModal();
        });
      } catch (e) {
        Alert.alert("Não foi possível modificar!", e.message);
      }
    }
  }
  //modal
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

  function getResultNumber(item) {
    const result = (getResultL(item) - gastoReb).toFixed(2);
    return result;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imgbg}
        source={require(imgbg1)}
        imageStyle={{ opacity: 0.6 }}
      >
        <SafeAreaView style={styles.container2}>
          {/*Botao Drawer*/}
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.openDrawer()}
          >
            <Feather name="menu" size={verticalScale(30)} color="#FFF" />
          </TouchableOpacity>
          {/*Barra de pesquisa*/}
          <TextInput
            style={styles.statusbar}
            placeholder="Pesquise pelo nome."
            cursorColor="#fff"
            placeholderTextColor="#f2f2f2"
            value={searchText}
            onChangeText={(t) => setSearchText(t)}
          />
        </SafeAreaView>
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
                    {
                      flexDirection: "row",
                      justifyContent: "space-around",
                    },
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
        <FlatList
          data={lista}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => (
            <View style={styles.containerVacas}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={[
                  styles.cardVacas,
                  {
                    backgroundColor: index % 2 === 0 ? "#0F6D00" : "#004513",
                  },
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
        <View>
          <TouchableOpacity
            style={styles.botaovoltar}
            onPress={() => navigation.navigate("CadastroVaca")}
          >
            <Text style={styles.textovoltar}>Cadastrar Vaca</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botaovoltar}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.textovoltar}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 138, 161, 0.9)",
  },
  botaovoltar: {
    backgroundColor: "rgba(36, 105, 25, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  textovoltar: {
    fontSize: verticalScale(14),
    fontWeight: "bold",
    color: "#fff",
  },
  container2: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: windowWidth,
    height: verticalScale(50),
    paddingLeft: scale(10),
  },
  menuButton: {
    height: verticalScale(30),
    justifyContent: "center",
    paddingLeft: scale(15),
  },
  statusbar: {
    backgroundColor: "#f2f2f2",
    width: scale(250),
    height: verticalScale(40),
    borderWidth: 2,
    borderRadius: scale(10),
    paddingLeft: scale(10),
  },
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

export default PageListavacas;
