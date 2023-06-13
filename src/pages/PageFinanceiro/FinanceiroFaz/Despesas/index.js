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
import BezierChartDespesas from "../../../../components/Graficos/BezierChartDespesas";
import { scale, verticalScale } from "react-native-size-matters";
import Modal from "react-native-modal";
import { AuthContext } from "../../../../contexts/auth";
import styles from "../../styles";
import { Colors } from "../../../../styles";
function Despesas({ navigation }) {
  const { precoCF, listaAli } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [shouldShowDetalhes, setShouldShowDetalhes] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  function toggleModal() {
    setModalVisible(!isModalVisible);
  }

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
    if (tipo === "preco") {
      const result = valorRecebido.toFixed(2);
      formattedResult = `R$ ${result.replace(".", ",")}`;
    } else if (tipo == "litro") {
      const result = valorRecebido.toFixed(2);
      formattedResult = `${result.replace(".", ",")} L`;
    } else if (tipo === "peso") {
      const result = valorRecebido.toFixed(2);
      formattedResult = `${result.replace(".", ",")} Kg`;
    } else if (tipo === "data") {
      let valorAFormatar = new Date(valorRecebido);
      formattedResult = `${
        valorAFormatar.getDate().toString().padStart(2, 0) +
        "/" +
        (valorAFormatar.getMonth() + 1).toString().padStart(2, 0) +
        "/" +
        valorAFormatar.getFullYear().toString()
      }`;
    }
    return formattedResult;
  };

  //recebe volume ou peso, e retorna a categoria do produto
  const TipoAfter = (item) => {
    if (item.volumeProd > 0) {
      const categoriaProd = "Remédios";
      return categoriaProd;
    } else if (item.pesoProd > 0) {
      const categoriaProd = "Alimento";
      return categoriaProd;
    } else {
      const categoriaProd = "Outras Despesas";
      return categoriaProd;
    }
  };

  const renderItem = ({ item }) => {
    const categoriaProd = TipoAfter(item);
    const isItemSelected = item._id === selectedItemId;
    return (
      <>
        <TouchableOpacity
          style={styles.listaDet}
          onPress={() => handleItemPress(item._id)}
        >
          <View style={styles.containerTituloBotao}>
            <Text style={[styles.tituloBotao, { flex: 1 }]}>
              {formatarResultado(item.createdAt, "data")}
            </Text>
            <Text style={[styles.tituloBotao, { flex: 1 }]}>
              {" "}
              {item.nomeProd.length < 10
                ? `${item.nomeProd}`
                : `${item.nomeProd.substring(0, scale(9))}...`}{" "}
            </Text>
            <Text style={[styles.tituloBotao, { flex: 1 }]}>
              {" "}
              {formatarResultado(item.valorProd * item.qtdProd, "preco")}
            </Text>
          </View>
        </TouchableOpacity>
        {shouldShowDetalhes && isItemSelected && (
          <View style={[styles.containerDetalhes]}>
            <View>
              <Text style={styles.tituloDetalhes}>Detalhes</Text>
            </View>
            <View>
              <Text style={styles.tituloDetalhes}>{TipoAfter(item)}</Text>
            </View>
            <View style={styles.modalContainerText}>
              <View style={styles.modalContent}>
                <Text style={styles.textContent}>Nome: </Text>
                <Text style={styles.textContent}>
                  {item.nomeProd.length < verticalScale(22)
                    ? `${item.nomeProd}`
                    : `${item.nomeProd.substring(0, verticalScale(22))}...`}
                </Text>
              </View>
              <View style={styles.modalContent}>
                <Text style={styles.textContent}>Data: </Text>
                <Text style={styles.textContent}>
                  {formatarResultado(item.createdAt, "data")}
                </Text>
              </View>
              <View style={styles.modalContent}>
                <Text style={styles.textContent}>Horario: </Text>
                <Text style={styles.textContent}>
                  {item.createdAt.toLocaleTimeString()}
                </Text>
              </View>
              {categoriaProd === "Alimento" ? (
                <>
                  <View style={styles.modalContent}>
                    <Text style={styles.textContent}>Preço Unitário: </Text>
                    <Text style={styles.textContent}>
                      {formatarResultado(
                        item.valorProd / item.pesoProd,
                        "preco"
                      )}
                    </Text>
                  </View>
                  <View style={styles.modalContent}>
                    <Text style={styles.textContent}>Peso Utilizado: </Text>
                    <Text style={styles.textContent}>
                      {formatarResultado(item.pesoProd, "peso")}
                    </Text>
                  </View>
                  <View style={styles.modalContent}>
                    <Text style={styles.textContent}>Valor Total: </Text>
                    <Text style={styles.textContent}>
                      {formatarResultado(
                        item.valorProd,
                        "preco"
                      )}
                    </Text>
                  </View>
                  <Text style={styles.textContent}>
                    Descrição: {item.obserProd}
                  </Text>
                </>
              ) : categoriaProd === "Remédios" ? (
                <>
                  <View style={styles.modalContent}>
                    <Text style={styles.textContent}>Preço Unitário: </Text>
                    <Text style={styles.textContent}>
                      {formatarResultado(
                        item.valorProd / item.volumeProd,
                        "preco"
                      )}
                    </Text>
                  </View>
                  <View style={styles.modalContent}>
                    <Text style={styles.textContent}>Volume Usado: </Text>
                    <Text style={styles.textContent}>
                      {formatarResultado(item.volumeProd, "litro")}
                    </Text>
                  </View>
                  <View style={styles.modalContent}>
                    <Text style={styles.textContent}>Valor Total: </Text>
                    <Text style={styles.textContent}>
                      {formatarResultado(
                        item.valorProd,
                        "preco"
                      )}
                    </Text>
                  </View>
                  <Text style={styles.textContent}>
                    Descrição: {item.obserProd}
                  </Text>
                </>
              ) : categoriaProd === "Outras Despesas" ? (
                <>
                  <View style={styles.modalContent}>
                    <Text style={styles.textContent}>Valor Total: </Text>
                    <Text style={styles.textContent}>
                      {formatarResultado(
                        item.valorProd,
                        "preco"
                      )}
                    </Text>
                  </View>
                  <Text style={styles.textContent}>
                    Descrição: {item.obserProd}
                  </Text>
                </>
              ) : null}
            </View>
          </View>
        )}
      </>
    );
  };
  function getDespesas() {
    if (typeof precoCF !== "undefined") {
      return Number(precoCF);
    } else {
      return 0;
    }
  }
  const despesas = getDespesas().toFixed(2);
  const formattedDespesas = `R$ ${despesas.replace(".", ",")}`;
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
              <Text style={styles.texto}>Total de despesas:</Text>
              <Text style={styles.textoValorNeg}>{formattedDespesas}</Text>
              <View style={styles.lineStyle} />
              <Text style={styles.preGraf}>
                Clique no gráfico para mais detalhes.
              </Text>
              <View style={styles.containerChart}>
                <BezierChartDespesas />
              </View>
              {/* modal detalhes despesas*/}
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
                  <Text style={styles.tituloModal}>Detalhes de Despesas:</Text>

                  <FlatList
                    style={styles.scroll}
                    data={listaAli}
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
export default Despesas;
