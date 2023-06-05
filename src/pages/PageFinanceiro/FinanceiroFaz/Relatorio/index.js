import * as React from "react";
import { useState, useContext, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PieChartFaz from "../../../../components/Graficos/PieChart";
import styles, { Color, setSize } from "../../styles";
import { Colors } from "../../../../styles";
import { verticalScale, scale } from "react-native-size-matters";
import Modal from "react-native-modal";
import { AuthContext } from "../../../../contexts/auth";
import { useMainContext } from "../../../../contexts/RealmContext";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
function Relatorio() {
  const realm = useMainContext();
  const precoTotal = precoLeite - precoCF;
  const { precoCF, listaAli, listaLeite, precoLeite, fazID } =
    useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [nomeFaz, setNomeFaz] = useState("");
  const [nRebanhos, setNRebanhos] = useState(0);
  const [totalEstoque, setTotalEstoque] = useState("");
  const [itensEstoque, setItensEstoque] = useState(0);
  const [totalVacas, setTotalVacas] = useState(0);
  const [totalLeite, setTotalLeite] = useState(0);
  const [mediaLeite, setMediaLeite] = useState(0);
  const [exportDate, setExportDate] = useState(Date.now().toString());
  const [hora, setHora] = useState(new Date().toLocaleTimeString());
  const [text, setText] = useState(
    new Date().getDate().toString().padStart(2, "0") +
      "/" +
      (new Date().getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      new Date().getFullYear().toString().padStart(2, "0")
  );
  function toggleModal() {
    setModalVisible(!isModalVisible);
  }
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        body {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 20px;
          display: flex;
          justify-content: center;
          height: 90vh;
          background-color: #f1f1f1;
        }
  
        .containerResumo {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
  
        h1 {
          font-size: 36px;
          margin-top: 0;
          margin-bottom: 20px;
          color: #333333;
        }
        h2 {
          font-size: 30px;
          margin-top: 0;
          margin-bottom: 20px;
          color: #333333;
        }
        .containerTitulo {
          text-align: center;
        }
        .containerInfo {
          margin: 15px;
          text-align: center;
        }
  
        .containerInfo .label {
          font-weight: bold;
          font-size: 24px;
          color: #555555;
        }
  
        .containerInfo .value {
          font-weight: normal;
          font-size: 20px;
          color: #777777;
        }
      </style>
    </head>
    <body>
      <div class="containerResumo">
        <div class="containerTitulo">
          <h2>Relatório da Fazenda</h2>
          <span>Data:${text} ${hora}</span>
        </div>
        <div class="containerInfo">
          <span class="label">Nome da Fazenda:</span>
          <span class="value">${nomeFaz}</span>
        </div>
  
        <div class="containerInfo">
          <span class="label">Itens em Estoque:</span>
          <span class="value">${itensEstoque}</span>
        </div>
  
        <div class="containerInfo">
          <span class="label">Valor do Estoque:</span>
          <span class="value">${totalEstoque}</span>
        </div>
  
        <div class="containerInfo">
          <span class="label">Número de Rebanhos:</span>
          <span class="value">${nRebanhos}</span>
        </div>
  
        <div class="containerInfo">
          <span class="label">Número de Animais:</span>
          <span class="value">${totalVacas}</span>
        </div>
  
        <div class="containerInfo">
          <span class="label">Produção de Leite:</span>
          <span class="value">${totalLeite} Litros</span>
        </div>
      </div>
    </body>
  </html>
  
  `;
  let dateGen = () => {
    let tempDate = new Date();
    let fDate =
      tempDate.getDate().toString().padStart(2, "0") +
      "/" +
      (tempDate.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      tempDate.getFullYear().toString().padStart(2, "0");
    setText(fDate);
    setHora(new Date().toLocaleTimeString());
    console.log(hora);
    generatePDF();
  };
  let generatePDF = async () => {
    const file = await printToFileAsync({ html: html, base64: false });
    await shareAsync(file.uri);
  };
  const renderItem2 = ({ item }) => {
    return (
      <TouchableOpacity style={styles.listaDet}>
        <Text style={styles.tituloBotao}>
          {item.description} - R$ {(item.prodL * item.precoL).toFixed(2)}
        </Text>
      </TouchableOpacity>
    );
  };
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
  function getReceitas() {
    if (typeof precoLeite !== "undefined") {
      return Number(precoLeite);
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
  useEffect(() => {
    if (realm) {
      let Fazenda = realm.objectForPrimaryKey("Farm", fazID);
      setNomeFaz(Fazenda.nomefaz);
      let nRebanhos = Fazenda.rebanhos.length;
      setNRebanhos(nRebanhos);
      let ValorTotalEstoque = Fazenda.atualEstoque.reduce(
        (total, produto) => total + produto.valorProd,
        0
      );
      let formattedValor = `R$ ${ValorTotalEstoque.toFixed(2).replace(
        ".",
        ","
      )}`;
      setTotalEstoque(formattedValor);
      setItensEstoque(Fazenda.atualEstoque.length);
      let totalVacas = Fazenda.rebanhos.reduce(
        (soma, rebanho) => soma + rebanho.vacas.length,
        0
      );
      setTotalVacas(totalVacas);
      let totalLeite = Fazenda.rebanhos.reduce((somaRebanho, rebanho) => {
        let sumProdL = rebanho.receitas.reduce(
          (somaReceita, receita) => somaReceita + receita.prodL,
          0
        );
        return somaRebanho + sumProdL;
      }, 0);
      setTotalLeite(totalLeite);
    }
  }, [realm]);
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
          <View style={styles.containerResumo}>
            <Text
              style={[
                styles.texto2,
                {
                  fontSize: setSize(nomeFaz, scale(200)),
                },
              ]}
            >
              {nomeFaz}
            </Text>
            <View style={styles.containerInfo2}>
              <Text style={styles.texto2}>Itens em Estoque: </Text>
              <Text
                style={[
                  styles.texto2,
                  {
                    fontSize: setSize(itensEstoque, scale(150)),
                    alignSelf: "center",
                  },
                ]}
              >
                {itensEstoque}
              </Text>
            </View>
            <View style={styles.containerInfo2}>
              <Text style={styles.texto2}>Valor do Estoque: </Text>
              <Text
                style={[
                  styles.texto2,
                  {
                    fontSize: setSize(totalEstoque, scale(150)),
                    alignSelf: "center",
                  },
                ]}
              >
                {totalEstoque}
              </Text>
            </View>
            <View style={styles.containerInfo2}>
              <Text style={styles.texto2}>Número de Rebanhos:</Text>
              <Text
                style={[
                  styles.texto2,
                  {
                    fontSize: setSize(nRebanhos, scale(150)),
                  },
                ]}
              >
                {nRebanhos}
              </Text>
            </View>
            <View style={styles.containerInfo2}>
              <Text style={styles.texto2}>Número de animais: </Text>
              <Text
                style={[
                  styles.texto2,
                  {
                    fontSize: setSize(totalVacas, scale(150)),
                    alignSelf: "center",
                  },
                ]}
              >
                {totalVacas}
              </Text>
            </View>
            <View style={styles.containerInfo2}>
              <Text style={styles.texto2}>Produção de Leite: </Text>
              <Text
                style={[
                  styles.texto2,
                  {
                    fontSize: setSize(totalLeite, scale(150)),
                    alignSelf: "center",
                  },
                ]}
              >
                {totalLeite + " Litros"}
              </Text>
            </View>
            <View style={styles.containerInfo2}>
              <Text style={styles.texto2}>Média de Produção de Leite: </Text>
              <Text
                style={[
                  styles.texto2,
                  {
                    fontSize: setSize(mediaLeite, scale(150)),
                    alignSelf: "center",
                  },
                ]}
              >
                {totalLeite / totalVacas + " Litros"}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.exportButton}
                onPress={() => {
                  dateGen();
                }}
              >
                <Text style={styles.texto2}>Exportar Dados</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: "space-around" }}
            onPress={() => {
              toggleModal();
            }}
          >
            <View style={styles.Grafico}>
              <Text style={styles.preGraf2}>
                Clique no gráfico para mais detalhes.
              </Text>
              <View style={styles.containerChart}>
                <PieChartFaz />
              </View>
            </View>

            {/* MODAL */}
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
              <View style={styles.modalContainer2}>
                <View style={{ flex: 1 }}>
                  <View style={styles.containerResumo}>
                    <View style={styles.containerInfo}>
                      <Text style={styles.texto}>Total de receitas:</Text>
                      <Text
                        style={[
                          styles.textoValorPos,
                          {
                            fontSize: setSize(formattedReceitas, scale(200)),
                          },
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
                          {
                            fontSize: setSize(formattedDespesas, scale(200)),
                          },
                        ]}
                      >
                        {formattedDespesas}
                      </Text>
                    </View>
                    <Text style={styles.texto}>Balanço final: </Text>
                    <Text
                      style={[
                        Color(total),
                        {
                          fontSize: setSize(formattedTotal, scale(270)),
                          alignSelf: "center",
                        },
                      ]}
                    >
                      {formattedTotal}
                    </Text>
                  </View>
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
// const styles = StyleSheet.create({
// preGraf: {
//   color: "white",
//   alignSelf: "center",
// },
// modalContainer: {
//   backgroundColor: "rgba(234,242,215,1)",
//   position: "absolute",
//   top: verticalScale(0),
//   alignSelf: "center",
//   width: scale(330),
//   borderRadius: 20,
// },
// modalScroll: {
//   height: verticalScale(220),
//   marginVertical: verticalScale(10),
// },
// container: {
//   backgroundColor: "#006773",
//   flex: 1,
// },
// containerChart: {
//   position: "absolute",
//   top: verticalScale(280),
// },
// botaopress: {
//   borderRadius: 20,
//   backgroundColor: "rgba(15, 109, 0, 0.9)",
//   width: scale(300),
//   height: verticalScale(40),
//   alignItems: "center",
//   justifyContent: "center",
//   alignSelf: "center",
//   top: verticalScale(530),
//   position: "absolute",
// },
// tituloBotao: {
//   fontSize: verticalScale(14),
//   fontWeight: "bold",
//   color: "#fff",
// },
// lineStyle: {
//   backgroundColor: "#FFF",
//   padding: verticalScale(0.4),
//   width: scale(310),
//   alignSelf: "center",
//   margin: verticalScale(6),
// },
// tituloModal: {
//   fontSize: verticalScale(20),
//   fontWeight: "bold",
//   color: "rgba(0, 69, 19, 0.95)",
//   margin: verticalScale(5),
//   alignSelf: "center",
// },
// imgbg: {
//   flex: 1,
//   resizeMode: "cover",
//   padding: verticalScale(10),
// },
// textoValorNeg: {
//   color: "#FF3131",
//   fontWeight: "bold",
//   fontSize: verticalScale(30),
//   marginLeft: scale(20),
// },
// textoValorPos: {
//   color: "#0FFF50",
//   fontWeight: "bold",
//   fontSize: verticalScale(30),
//   marginLeft: scale(20),
// },
// texto: {
//   color: "#ffffff",
//   fontWeight: "bold",
//   fontSize: verticalScale(25),
//   marginLeft: scale(20),
// },
// botaopressM: {
//   borderRadius: 20,
//   backgroundColor: "rgba(15, 109, 0, 0.9)",
//   width: scale(300),
//   height: verticalScale(40),
//   alignItems: "center",
//   justifyContent: "center",
//   alignSelf: "center",
//   top: verticalScale(583),
//   position: "absolute",
// },
// listaDet: {
//   borderRadius: 20,
//   backgroundColor: "rgba(15, 109, 0, 0.95)",
//   width: scale(300),
//   height: verticalScale(40),
//   alignItems: "center",
//   justifyContent: "center",
//   alignSelf: "center",
//   marginVertical: verticalScale(5),
// },
// listaDet2: {
//   borderRadius: 20,
//   backgroundColor: "rgba(0, 69, 19, 0.95)",
//   width: scale(300),
//   height: verticalScale(40),
//   alignItems: "center",
//   justifyContent: "center",
//   alignSelf: "center",
//   marginVertical: verticalScale(5),
// },
// scroll: {
//   height: verticalScale(245),
// },
// });
export default Relatorio;
