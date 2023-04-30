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
import BezierChartDespesas from "../../../components/Graficos/BezierChartDespesas";
import { scale, verticalScale } from "react-native-size-matters";
import Modal from "react-native-modal";
import { AuthContext } from "../../../contexts/auth";
function Despesas() {
  const { precoCF, listaAli } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  function toggleModal() {
    setModalVisible(!isModalVisible);
  }
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.listaDet}>
        <Text style={styles.tituloBotao}>
          {item.nomeProd} - R$
          {(item.valorProd * item.qtdProd).toFixed(2)}
        </Text>
      </TouchableOpacity>
    );
  };
  function getDespesas() {
    if (typeof precoCF !== "undefined") {
      return Number(precoCF);
    } else {
      return 0;
    }
  }
  const despesas = getDespesas();
  const imgbg1 = "../../../../assets/bg2.jpg";
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
          <Text style={styles.texto}>Total de despesas:</Text>
          <Text style={styles.textoValorNeg}>R${despesas.toFixed(2)}</Text>
          <View style={styles.lineStyle} />
          <Text style={styles.preGraf}>
            Clique no gráfico para mais detalhes.
          </Text>
          <View style={styles.containerChart}>
            <BezierChartDespesas />
          </View>

          <Modal
            isVisible={isModalVisible}
            coverScreen={true}
            backdropColor={"rgba(234,242,215,0.8)"}
            animationIn="slideInUp"
            animationOut="slideOutDown"
          >
            <View style={styles.modalContainer}>
              <Text style={styles.tituloModal}>Detalhes de Despesas:</Text>

              <FlatList
                style={styles.scroll}
                data={listaAli}
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
    height: verticalScale(525),
  },
});
export default Despesas;
