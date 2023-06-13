import * as React from "react";
import { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import PieChartFaz from "../../../../components/Graficos/PieChart";
import styles, { Color, setSize } from "../../styles";
import { Colors } from "../../../../styles";
import { verticalScale, scale } from "react-native-size-matters";
import Modal from "react-native-modal";
import { AuthContext } from "../../../../contexts/auth";
import { useMainContext } from "../../../../contexts/RealmContext";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
function Relatorio({ navigation }) {
  const realm = useMainContext();
  const { precoCF, precoLeite, fazID } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [nomeFaz, setNomeFaz] = useState("");
  const [nRebanhos, setNRebanhos] = useState(0);
  const [totalEstoque, setTotalEstoque] = useState("");
  const [itensEstoque, setItensEstoque] = useState(0);
  const [totalVacas, setTotalVacas] = useState(0);
  const [totalLeite, setTotalLeite] = useState("0 Litros");
  const [mediaLeite, setMediaLeite] = useState("0 Litros");
  const [total, setTotal] = useState(0);
  const [totalRelatorio, setTotalRelatorio] = useState("R$0,00");
  const [totalReceitasRelatorio, setTotalReceitasRelatorio] =
    useState("R$0,00");
  const [totalDespesasRelatorio, setTotalDespesasRelatorio] =
    useState("R$0,00");
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
      <title>Relatório da Fazenda</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 3vh;
          background-color: #f1f1f1;
        }
  
        .containerResumo {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          height: 100%;
          background-color:#035921;
        }
  
        h1 {
          margin-top: 0px;
          text-align: center;
          font-size: 40px;
          color: white;
        }
  
        table {
          width: 100%;
          border-collapse: collapse;
          border-top: 1px solid #ddd;
          color: white;
        }
  
        th,
        td {
          padding: 14px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
  
        .left {
          text-align: left;
          font-weight: bold;
          font-size: 20px;
        }
  
        .right {
          text-align: right;
          font-weight: normal;
          font-size: 15px;
        }
        .markFazFin {
          font-weight: 200;
          font-size: 13px;
          color: white;
        }
        .fazFin {
          margin-top: 20px;
          text-align: center;
          justify-content: center;
        }
        img {
          max-width: 50%;
          height: auto;
          align-items: center;
          display: block;
          margin-left: auto;
          margin-right: auto;
          width: 50%;
        }
      </style>
    </head>
    <body>
      <div class="containerResumo">
      <img src="data:image/png;base64,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" />
        <h1>Relatório da Fazenda</h1>
        <table>
          <tr>
            <td class="left">Nome da Fazenda:</td>
            <td class="right">${nomeFaz}</td>
          </tr>
          <tr>
            <td class="left">Receitas da Fazenda:</td>
            <td class="right">${totalReceitasRelatorio}</td>
          </tr>
          <tr>
            <td class="left">Despesas da Fazenda:</td>
            <td class="right">${totalDespesasRelatorio}</td>
          </tr>
          <tr>
            <td class="left">Resultado da Fazenda:</td>
            <td class="right">${totalRelatorio}</td>
          </tr>
          <tr>
            <td class="left">Itens em Estoque:</td>
            <td class="right">${itensEstoque}</td>
          </tr>
          <tr>
            <td class="left">Valor do Estoque:</td>
            <td class="right">${totalEstoque}</td>
          </tr>
          <tr>
            <td class="left">Número de Rebanhos:</td>
            <td class="right">${nRebanhos}</td>
          </tr>
          <tr>
            <td class="left">Número de Animais:</td>
            <td class="right">${totalVacas}</td>
          </tr>
          <tr>
            <td class="left">Média de produção por animal:</td>
            <td class="right">${mediaLeite}</td>
          </tr>
          <tr>
            <td class="left">Produção de Leite:</td>
            <td class="right">${totalLeite}</td>
          </tr>
        </table>
        <div class="fazFin">
          <span class="markFazFin">
            Relatório Gerado por FazFin em ${text} ${hora}
          </span>
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
    generatePDF();
  };
  let generatePDF = async () => {
    const file = await printToFileAsync({ html: html, base64: false });
    await shareAsync(file.uri);
  };
  function getDespesas() {
    if (typeof precoCF !== "undefined") {
      return Number(precoCF).toFixed(2);
    } else {
      return 0;
    }
  }
  function getReceitas() {
    if (typeof precoLeite !== "undefined") {
      return Number(precoLeite).toFixed(2);
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
        let sumProdL = rebanho.receitas
          .filter((item) => item.tipo === 1)
          .reduce((somaReceita, receita) => somaReceita + receita.prodL, 0);
        return somaRebanho + sumProdL;
      }, 0);
      let totalLeiteString = totalLeite.toFixed(2).toString();
      setTotalLeite(totalLeiteString + " Litros");
      let media = (totalLeite / totalVacas).toFixed(2).toString();
      setMediaLeite(media + " Litros");
      let total = getTotal(getDespesas(), getReceitas()).toFixed(2);
      setTotal(total);
      setTotalRelatorio(`R$ ${total.replace(".", ",")}`);
      let despesas = getDespesas();
      setTotalDespesasRelatorio(`R$ ${despesas.replace(".", ",")}`);
      let receitas = getReceitas();
      setTotalReceitasRelatorio(`R$ ${receitas.replace(".", ",")}`);
    }
  }, [realm]);
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
                    { fontSize: setSize(totalReceitasRelatorio, scale(230)) },
                  ]}
                >
                  {totalReceitasRelatorio}
                </Text>
              </View>
              <View style={styles.containerInfo}>
                <Text style={styles.texto}>Total de despesas:</Text>
                <Text
                  style={[
                    styles.textoValorNeg,
                    { fontSize: setSize(totalDespesasRelatorio, scale(230)) },
                  ]}
                >
                  {totalDespesasRelatorio}
                </Text>
              </View>
              <View style={styles.containerInfo}>
                <Text style={styles.texto}>Balanço final:</Text>
                <Text
                  style={[
                    Color(total),
                    { fontSize: setSize(totalRelatorio, scale(230)) },
                  ]}
                >
                  {totalRelatorio}
                </Text>
              </View>
            </View>
            <View style={styles.Grafico}>
              <Text style={styles.preGraf}>
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
                      {totalLeite}
                    </Text>
                  </View>
                  <View style={styles.containerInfo2}>
                    <Text style={styles.texto2}>
                      Média de Produção de Leite:
                    </Text>
                    <Text
                      style={[
                        styles.texto2,
                        {
                          fontSize: setSize(mediaLeite, scale(150)),
                          alignSelf: "center",
                        },
                      ]}
                    >
                      {mediaLeite}
                    </Text>
                  </View>
                  <View style={styles.containerInfo2}>
                    <Text style={styles.texto2}>Total de receitas:</Text>
                    <Text
                      style={[
                        styles.textoValorPos,
                        {
                          fontSize: setSize(totalReceitasRelatorio, scale(200)),
                        },
                      ]}
                    >
                      {totalReceitasRelatorio}
                    </Text>
                  </View>
                  <View style={styles.containerInfo2}>
                    <Text style={styles.texto2}>Total de despesas:</Text>
                    <Text
                      style={[
                        styles.textoValorNeg,
                        {
                          fontSize: setSize(totalDespesasRelatorio, scale(200)),
                        },
                      ]}
                    >
                      {totalDespesasRelatorio}
                    </Text>
                  </View>
                  <View style={styles.containerInfo3}>
                    <Text style={styles.texto2}>Balanço final: </Text>
                    <Text
                      style={[
                        Color(total),
                        {
                          fontSize: setSize(totalRelatorio, scale(200)),
                          alignSelf: "center",
                        },
                      ]}
                    >
                      {totalRelatorio}
                    </Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.botaopressM}
                    onPress={() => {
                      dateGen();
                    }}
                  >
                    <Text style={styles.texto2}>Exportar relatório</Text>
                  </TouchableOpacity>
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
