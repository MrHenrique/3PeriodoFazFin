import * as React from "react";
import { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PieChartReb from "../../../../components/Graficos/PieChartReb";
import { scale, verticalScale } from "react-native-size-matters";
import Modal from "react-native-modal";
import { AuthContext } from "../../../../contexts/auth";
import { useMainContext } from "../../../../contexts/RealmContext";
import styles, { Color, setSize } from "../../styles";
import { Colors } from "../../../../styles";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
function RelatorioReb() {
  const realm = useMainContext();
  const [nomeReb, setNomeReb] = useState("");
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
  const { precoCFReb, precoLeiteReb, rebID } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  function toggleModal() {
    setModalVisible(!isModalVisible);
  }
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Relatório do Rebanho</title>
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
        }
  
        h1 {
          margin-top: 0px;
          text-align: center;
          font-size: 40px;
        }
  
        table {
          width: 100%;
          border-collapse: collapse;
          border-top: 1px solid #ddd;
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
          color: #777777;
        }
        .fazFin {
          margin-top: 20px;
          text-align: center;
          justify-content: center;
        }
      </style>
    </head>
    <body>
      <div class="containerResumo">
        <h1>Relatório do Rebanho</h1>
  
        <table>
          <tr>
            <td class="left">Nome do Rebanho:</td>
            <td class="right">${nomeReb}</td>
          </tr>
          <tr>
            <td class="left">Receitas do Rebanho:</td>
            <td class="right">${totalReceitasRelatorio}</td>
          </tr>
          <tr>
            <td class="left">Despesas do Rebanho:</td>
            <td class="right">${totalDespesasRelatorio}</td>
          </tr>
          <tr>
            <td class="left">Resultado do Rebanho:</td>
            <td class="right">${totalRelatorio}</td>
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
  useEffect(() => {
    if (realm) {
      let Rebanho = realm.objectForPrimaryKey("RebanhoSchema", rebID);
      setNomeReb(Rebanho.nomeReb);
      let totalVacas = Rebanho.vacas.length;
      setTotalVacas(totalVacas);
      let totalLeite = Rebanho.receitas.reduce(
        (somaReceitas, receita) => somaReceitas + receita.prodL,
        0
      );

      let totalLeiteString = totalLeite.toString();
      setTotalLeite(totalLeiteString + " Litros");
      console.log(totalLeiteString + " Litros");
      let media = (totalLeite / totalVacas).toString();
      setMediaLeite(media + " Litros");
      let total = getTotal(getDespesas(), getReceitas()).toFixed(2);
      setTotal(total);
      setTotalRelatorio(`R$ ${total.replace(".", ",")}`);
      let despesas = getDespesas().toFixed(2);
      setTotalDespesasRelatorio(`R$ ${despesas.replace(".", ",")}`);
      let receitas = getReceitas().toFixed(2);
      setTotalReceitasRelatorio(`R$ ${receitas.replace(".", ",")}`);
    }
  }, [realm]);
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
                <PieChartReb />
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
                        fontSize: setSize(nomeReb, scale(200)),
                      },
                    ]}
                  >
                    {nomeReb}
                  </Text>
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
export default RelatorioReb;
