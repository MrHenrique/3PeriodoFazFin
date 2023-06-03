import * as React from "react";
import { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BezierChartFaturamentoReb from "../../../../components/Graficos/BezierChartFaturamentoReb";
import FiltrosData from "../../../../components/Filtros/FiltrosData";
import { scale, verticalScale } from "react-native-size-matters";
import Modal from "react-native-modal";
import { AuthContext } from "../../../../contexts/auth";
function FaturamentoReb() {
  const { precoCFReb, listaAliReb, listaLeiteReb, precoLeiteReb } =
    useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const { listaFiltrada } = useContext(AuthContext);
  const [shouldShow, setShouldShow] = useState(false);
  const [shouldShowDetalhes, setShouldShowDetalhes] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  function toggleModal() {
    setModalVisible(!isModalVisible);
  }
  const imgbg1 = "../../../../../assets/bg2.jpg";

  const handleItemPress = (itemId) => {
    if (itemId === selectedItemId) {
      // Se o itemId for o mesmo do item selecionado atualmente,
      // feche o modal de detalhes
      setSelectedItemId(null);
      setShouldShowDetalhes(false);
    } else {
      // Se o itemId for diferente do item selecionado atualmente
      // atualize o itemId e abra o modal de detalhes
      setSelectedItemId(itemId);
      setShouldShowDetalhes(true);
    }
  };

  const formatarResultado = (valorRecebido, tipo) => {
    let formattedResult = "";
    if (tipo == "preco") {
      const result = valorRecebido.toFixed(2);
      formattedResult = `R$ ${result.replace(".", ",")}`;
    } else if (tipo == "prod") {
      const result = valorRecebido.toFixed(2);
      formattedResult = `${result.replace(".", ",")} L`;
    }
    return formattedResult;
  };

  const renderItem = ({ item }) => {
    const result = (item.prodL * item.precoL).toFixed(2);
    const formattedResult = `R$ ${result.replace(".", ",")}`;
    const formattedData = `${
      item.createdAt.getDate().toString().padStart(2, 0) +
      "/" +
      (item.createdAt.getMonth() + 1).toString().padStart(2, 0) +
      "/" +
      item.createdAt.getFullYear().toString()
    }`;
    const isItemSelected = item._id === selectedItemId;
    return (
      <>
        <TouchableOpacity
          style={styles.listaDet}
          onPress={() => handleItemPress(item._id)}
        >
          <Text style={styles.tituloBotao}>
            {formattedData} - {formattedResult}
          </Text>
        </TouchableOpacity>
        {shouldShowDetalhes && isItemSelected && (
          <View style={[styles.containerDetalhes]}>
          <View>
            <Text style={styles.tituloDetalhes}>Detalhes</Text>
          </View>
          <View style={styles.modalContainerText}>
            <View style={styles.modalContent}>
              <Text style={styles.textContent}>Data: </Text>
              <Text style={styles.textContent}>{formattedData}</Text>
            </View>
            <View style={styles.modalContent}>
              <Text style={styles.textContent}>Horario: </Text>
              <Text style={styles.textContent}>
                {item.createdAt.toLocaleTimeString()}
              </Text>
            </View>
            <View style={styles.modalContent}>
              <Text style={styles.textContent}>Produção: </Text>
              <Text style={styles.textContent}>
                {formatarResultado(item.prodL, "prod")}
              </Text>
            </View>
            <View style={styles.modalContent}>
              <Text style={styles.textContent}>Preco: </Text>
              <Text style={styles.textContent}>
                {formatarResultado(item.precoL, "preco")}
              </Text>
            </View>
            <View style={styles.modalContent}>
              <Text style={styles.textContent}>Valor Total: </Text>
              <Text style={styles.textContent}>
                {formatarResultado(item.precoL * item.prodL, "preco")}
              </Text>
            </View>
            <Text style={styles.textContent}>
              Descrição: {item.description}
            </Text>
          </View>
        </View>
        )}
      </>
    );
  };
  function getReceitas() {
    if (typeof precoLeiteReb !== "undefined") {
      return Number(precoLeiteReb);
    } else {
      return 0;
    }
  }
  const receitas = getReceitas().toFixed(2);
  const formattedReceitas = `R$ ${receitas.replace(".", ",")}`;
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgbg}
        source={require(imgbg1)}
        imageStyle={{ opacity: 0.3 }}
      >
        <TouchableOpacity
          onPress={() => {
            toggleModal();
          }}
        >
          <Text style={styles.texto}>Total de receitas:</Text>
          <Text style={styles.textoValorPos}>{formattedReceitas}</Text>
          <View style={styles.lineStyle} />
          <Text style={styles.preGraf}>
            Clique no gráfico para mais detalhes.
          </Text>
          <View style={styles.containerChart}>
            <BezierChartFaturamentoReb />
          </View>
          <Modal
            isVisible={isModalVisible}
            coverScreen={true}
            backdropColor={"rgba(234,242,215,0.8)"}
            animationIn="slideInUp"
            animationOut="slideOutDown"
          >
            <View style={styles.modalContainer}>
              <Text style={styles.tituloModal}>Detalhes de receitas:</Text>

              {/*filtros*/}
              <TouchableOpacity
                onPress={() => setShouldShow(!shouldShow)}
                style={styles.filtrosBotao}
              >
                <Text style={styles.tituloBotao}>Filtros</Text>
              </TouchableOpacity>
              <View
                style={[
                  styles.filtros,
                  { display: shouldShow ? "flex" : "none" },
                ]}
              >
                <FiltrosData listaRecebida={listaLeiteReb} />
              </View>

              <FlatList
                style={[
                  styles.lista,
                  { marginTop: shouldShow ? verticalScale(140) : 0 },
                ]}
                data={listaFiltrada}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
              />
            </View>
            <TouchableOpacity
              style={styles.botaopressM}
              onPress={() => {
                toggleModal();
              }}
            >
              <Text style={styles.tituloBotao}>{"Voltar"}</Text>
            </TouchableOpacity>
          </Modal>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaopress}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.tituloBotao}>{"Voltar"}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  preGraf: {
    color: "white",
    alignSelf: "center",
  },
  modalContainer: {
    backgroundColor: "rgba(234,242,215,1)",
    position: "absolute",
    top: verticalScale(0),
    alignSelf: "center",
    width: scale(330),
    height: scale(480),
    borderRadius: 20,
  },
  modalScroll: {
    height: verticalScale(500),
    marginVertical: verticalScale(10),
  },
  container: {
    backgroundColor: "#006773",
    flex: 1,
  },
  lineStyle: {
    backgroundColor: "#FFF",
    padding: verticalScale(0.4),
    width: scale(310),
    alignSelf: "center",
    margin: verticalScale(6),
  },
  containerChart: {
    position: "absolute",
    top: verticalScale(150),
  },
  botaopress: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(530),
    position: "absolute",
  },
  tituloBotao: {
    fontSize: verticalScale(14),
    fontWeight: "bold",
    color: "#fff",
  },
  tituloModal: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: "rgba(0, 69, 19, 0.95)",
    margin: verticalScale(5),
    alignSelf: "center",
  },
  imgbg: {
    flex: 1,
    resizeMode: "cover",
    padding: verticalScale(10),
  },
  textoValorNeg: {
    color: "#FF3131",
    fontWeight: "bold",
    fontSize: verticalScale(30),
    marginLeft: scale(20),
  },
  texto: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: verticalScale(25),
    marginLeft: scale(20),
  },
  textoValorPos: {
    color: "#0FFF50",
    fontWeight: "bold",
    fontSize: verticalScale(30),
    marginLeft: scale(20),
  },
  botaopressM: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(583),
    position: "absolute",
  },
  listaDet: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.95)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: verticalScale(5),
  },
  listaDet2: {
    borderRadius: 20,
    backgroundColor: "rgba(0, 69, 19, 0.95)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: verticalScale(5),
  },
  scroll: {
    height: verticalScale(380),
  },
  filtrosBotao: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  filtros: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    position: "absolute",
    top: verticalScale(80),
    left: 0,
    right: 0,
  },
  lista: {
    flex: 1,
    marginTop: 10,
    marginBottom: 12,
  },
  containerDetalhes: {
    width: scale(300),
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  modalContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContent: {
    fontSize: 20,
  },
  modalContainerText: {
    width: "100%",
    padding: 5,
  },
  tituloDetalhes: {
    color: "black",
    fontSize: verticalScale(20),
    marginBottom: verticalScale(10),
    textAlign: "center",
    fontWeight: "bold",
  },
});
export default FaturamentoReb;
