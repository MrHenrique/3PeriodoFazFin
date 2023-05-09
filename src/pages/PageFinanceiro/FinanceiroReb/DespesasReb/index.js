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
import BezierChartDespesasReb from "../../../../components/Graficos/BezierChartDespesasReb";
import { scale, verticalScale } from "react-native-size-matters";
import Modal from "react-native-modal";
import { AuthContext } from "../../../../contexts/auth";
import styles, { Color, setSize } from "../../styles";
function DespesasReb() {
  const { precoCFReb, listaAliReb } = useContext(AuthContext);
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
    if (typeof precoCFReb !== "undefined") {
      return Number(precoCFReb);
    } else {
      return 0;
    }
  }
  const despesas = getDespesas();
  const imgbg1 = "../../../../../assets/bg2.jpg";
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgbg}
        source={require(imgbg1)}
        imageStyle={{ opacity: 0.3 }}
      >
        <View style={styles.containergeral}>
          <View style={styles.BTN_detalhes}>
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
                <BezierChartDespesasReb />
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
                    data={listaAliReb}
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
export default DespesasReb;
