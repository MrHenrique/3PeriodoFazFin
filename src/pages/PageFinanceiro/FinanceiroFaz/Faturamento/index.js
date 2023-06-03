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
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BezierChartFaturamento from "../../../../components/Graficos/BezierChartFaturamento";
import { scale, verticalScale } from "react-native-size-matters";
import Modal from "react-native-modal";
import { AuthContext } from "../../../../contexts/auth";
import FiltrosData from "../../../../components/Filtros/FiltrosData";
import styles from "../../styles";
import { Colors } from "../../../../styles";
function Faturamento() {
  const { precoCF, listaAli, listaLeite, precoLeite, listaFiltrada } =
    useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  function toggleModal() {
    setModalVisible(!isModalVisible);
  }
  const imgbg1 = "../../../../../assets/bg2.jpg";
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.listaDet}>
        <Text style={styles.tituloBotao}>
          {item.createdAt.getDate().toString().padStart(2, 0)}/
          {(item.createdAt.getMonth() + 1).toString().padStart(2, 0)}/
          {item.createdAt.getFullYear().toString()} - R${" "}
          {(item.prodL * item.precoL).toFixed(2)}
        </Text>
      </TouchableOpacity>
    );
  };
  function getReceitas() {
    if (typeof precoLeite !== "undefined") {
      return Number(precoLeite);
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
        // source={require(imgbg1)}
        imageStyle={{ opacity: 0.3 }}
      >
        <View style={styles.containergeral}>
          <View style={styles.BTN_detalhes}>
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
                <BezierChartFaturamento />
              </View>
              {/* MODAL FATURAMENTO */}
              <Modal
                isVisible={isModalVisible}
                coverScreen={true}
                statusBarTranslucent={true}
                backdropColor={Colors.black}
                deviceHeight={Dimensions.get("screen").height}
                backdropOpacity={0.5}
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
                    <FiltrosData listaRecebida={listaLeite} />
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
                  <View style={{ marginBottom: verticalScale(10) }}>
                    <TouchableOpacity
                      style={styles.botaopressM}
                      onPress={() => {
                        toggleModal();
                      }}
                    >
                      <Text style={styles.tituloBotao}>{"Voltar"}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </TouchableOpacity>
          </View>
          <View style={styles.containervoltar}>
            <TouchableOpacity
              style={styles.botaopress}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.tituloBotao}>{"Voltar"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
export default Faturamento;
