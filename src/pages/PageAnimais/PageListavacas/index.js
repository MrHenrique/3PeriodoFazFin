import React, { useState, useContext, useEffect } from "react";
import {
  Dimensions,
  View,
  SafeAreaView,
  Keyboard,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { TextInput, Button } from "react-native-paper";
import styles from "./styles";
import { AuthContext } from "../../../contexts/auth";
import { Feather } from "@expo/vector-icons";
import { useMainContext } from "../../../contexts/RealmContext";
import { Colors, Buttons } from "../../../styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const imgbg1 = "../../../../assets/fazfinwhiteletter.png";

function PageListavacas({ navigation, route }) {
  const [searchText, setSearchText] = useState("");
  const { rebID, IdVaca } = useContext(AuthContext);
  const { precoCFReb, GrafVaca, ListaReceitaVacas } = useContext(AuthContext);
  const [gastoReb, setGastoReb] = useState(0);
  const [resultL, setResultL] = useState(0);
  const [listaVaca, setListaVaca] = useState([]);
  const [lista, setLista] = useState(listaVaca);
  const [keyboardStatus, setkeyboardStatus] = useState(false);
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
            data={lista}
            keyExtractor={(item) => item._id}
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
            <Text style={styles.textovoltar}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

export default PageListavacas;
