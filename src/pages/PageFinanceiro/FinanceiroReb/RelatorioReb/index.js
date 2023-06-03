import * as React from "react";
import { useState, useContext } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PieChartReb from "../../../../components/Graficos/PieChartReb";
import { scale, verticalScale } from "react-native-size-matters";
import Modal from "react-native-modal";
import { AuthContext } from "../../../../contexts/auth";
import styles, { Color, setSize } from "../../styles";
import { Colors } from "../../../../styles";
function RelatorioReb() {
  const precoTotal = precoLeiteReb - precoCFReb;
  const { precoCFReb, listaAliReb, listaLeiteReb, precoLeiteReb } =
    useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  function toggleModal() {
    setModalVisible(!isModalVisible);
  }
  const renderItem2 = ({ item }) => {
    // console.log(item);
    return (
      <TouchableOpacity style={styles.listaDet}>
        <Text style={styles.tituloBotao}>
          {item.createdAt.getDate().toString().padStart(2, "0")}/
          {(item.createdAt.getMonth() + 1).toString().padStart(2, "0")}/
          {item.createdAt.getFullYear()} - {item.description} - R${" "}
          {(item.prodL * item.precoL).toFixed(2)}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderItem = ({ item }) => {
    // console.log(item.createdAt);
    return (
      <TouchableOpacity style={styles.listaDet}>
        <Text style={styles.tituloBotao}>
          {item.createdAt.getDate().toString().padStart(2, "0")}/
          {(item.createdAt.getMonth() + 1).toString().padStart(2, "0")}/
          {item.createdAt.getFullYear()} - {item.nomeProd} - R$
          {(item.valorProd * item.qtdProd).toFixed(2)}
        </Text>
      </TouchableOpacity>
    );
  };
  function getDespesas() {
    if (typeof precoCFReb !== "undefined") {
      return Number(precoCFReb);
    } else {
      return 0;
    }
  }
  function getReceitas() {
    if (typeof precoLeiteReb !== "undefined") {
      return Number(precoLeiteReb);
    } else {
      return 0;
    }
  }
  function getTotal(despesas, receitas) {
    if (despesas !== "0" || receitas !== "0") {
      return Number(receitas - despesas);
    } else {
      return 0;
    }
  }
  const total = getTotal(getDespesas(), getReceitas()).toFixed(2);
  const formattedTotal = `R$ ${total.replace(".", ",")}`;
  const despesas = getDespesas().toFixed(2);
  const formattedDespesas = `R$ ${despesas.replace(".", ",")}`;
  const receitas = getReceitas().toFixed(2);
  const formattedReceitas = `R$ ${receitas.replace(".", ",")}`;
  const imgbg1 = "../../../../../assets/bg5.jpg";
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containergeral}>
        <View style={styles.BTN_detalhes}>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: "space-around" }}
            onPress={() => {
              toggleModal();
            }}
          >
            <View style={styles.containerResumo}>
              <View style={styles.containerInfo}>
                <Text style={styles.texto}>Total de receitas:</Text>
                <Text
                  style={[
                    styles.textoValorPos,
                    { fontSize: setSize(formattedReceitas, scale(230)) },
                  ]}
                >
                  {formattedReceitas}
                </Text>
              </View>
              <View style={styles.containerInfo}>
                <Text style={styles.texto}>Total de despesas:</Text>
                <Text
                  style={[
                    styles.textoValorNeg,
                    { fontSize: setSize(formattedDespesas, scale(200)) },
                  ]}
                >
                  {formattedDespesas}
                </Text>
              </View>
              <View style={styles.containerInfo}>
                <Text style={styles.texto}>Balanço final:</Text>
                <Text
                  style={[
                    Color(total),
                    { fontSize: setSize(formattedTotal, scale(250)) },
                  ]}
                >
                  {formattedTotal}
                </Text>
              </View>
            </View>
            <View style={styles.Grafico}>
              <Text style={styles.preGraf}>
                Clique no gráfico para mais detalhes.
              </Text>
              <View style={styles.containerChart}>
                <PieChartReb />
              </View>
            </View>

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
                <View style={{ flex: 1 }}>
                  <Text style={styles.tituloModal}>Detalhes de receitas:</Text>
                  <FlatList
                    style={styles.scroll}
                    data={listaLeiteReb}
                    renderItem={renderItem2}
                    keyExtractor={(item) => item._id}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.tituloModal}>Detalhes de despesas:</Text>
                  <FlatList
                    style={styles.scroll}
                    data={listaAliReb}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                  />
                </View>
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
    </SafeAreaView>
  );
}
export default RelatorioReb;