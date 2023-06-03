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
