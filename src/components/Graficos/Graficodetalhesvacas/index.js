import { LineChart } from "react-native-chart-kit";
import { scale, verticalScale } from "react-native-size-matters";
import { AuthContext } from "../../../contexts/auth";
import { useContext, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Fonts } from "../../../styles";
import { MD3Colors } from "react-native-paper";
function Graficodetalhesvacas() {
  const { listaReceitasVaca, listaDespesasVaca } = useContext(AuthContext);
  const [modalReceitasVisible, setModalReceitasVisible] = useState(false);
  const [modalDespesasVisible, setModalDespesasVisible] = useState(false);
  const [modalDetReceitasVisible, setModalDetReceitasVisible] = useState(false);
  const [modalDetDespesasVisible, setModalDetDespesasVisible] = useState(false);
  const [mesSelecionado, setMesSelecionado] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const receitasPorVaca = {
    0: 0, //Janeiro
    1: 0, //Fevereiro
    2: 0, //Marco
    3: 0, //Abril
    4: 0, //Maio
    5: 0, //Junho
    6: 0, //Julho
    7: 0, //Agosto
    8: 0, //Setembro
    9: 0, //Outubro
    10: 0, //Novembro
    11: 0, //Dezembro
  };
  const despesasPorVaca = {
    0: 0, //Janeiro
    1: 0, //Fevereiro
    2: 0, //Marco
    3: 0, //Abril
    4: 0, //Maio
    5: 0, //Junho
    6: 0, //Julho
    7: 0, //Agosto
    8: 0, //Setembro
    9: 0, //Outubro
    10: 0, //Novembro
    11: 0, //Dezembro
  };
  function getNomeDoMes(mes) {
    const meses = {
      0: "Jan",
      1: "Fev",
      2: "Mar",
      3: "Abr",
      4: "Mai",
      5: "Jun",
      6: "Jul",
      7: "Ago",
      8: "Set",
      9: "Out",
      10: "Nov",
      11: "Dez",
    };
    return meses[mes];
  }

  //Percorre todos as preceitas
  listaReceitasVaca.forEach((item) => {
    const valor = item.prodL * item.precoL;
    const mes = item.createdAt.getMonth(); // cria uma variavel que se iguala ao mes de criação do item

    receitasPorVaca[mes] += valor; //Soma todos os valores do mês
  });
  //Percorre todos as despesas
  listaDespesasVaca.forEach((item) => {
    const valor = item.qtdProd * item.valorProd;
    const mes = item.createdAt.getMonth(); // cria uma variavel que se iguala ao mes de criação do item

    despesasPorVaca[mes] += valor; //Soma todos os valores do mês
  });

  //Cria um novo array com as receitas do mes selecionado quando clicado em um ponto do grafico.
  const receitasDoMesSelecionado = listaReceitasVaca.filter((item) => {
    const dataCriacao = new Date(item.createdAt);
    return dataCriacao.getMonth() === mesSelecionado;
  });

  //Cria um novo array com as despesas do mes selecionado quando clicado em um ponto do grafico.
  const despesasDoMesSelecionado = listaDespesasVaca.filter((item) => {
    const dataCriacao = new Date(item.createdAt);
    return dataCriacao.getMonth() === mesSelecionado;
  });

  const handleDataPointClick = ({ value, index, dataset }) => {
    setMesSelecionado(index); //passa o indice do ponto clicado para a variavel mesSelecionado
    const podeAbrirReceita = listaReceitasVaca.some(
      (item) => item.createdAt.getMonth() === index
    );
    const podeAbrirDespesa = listaDespesasVaca.some(
      (item) => item.createdAt.getMonth() === index
    );
    if (dataset.datasetsID === "receitas" && podeAbrirReceita) {
      setModalReceitasVisible(true);
    } else if (dataset.datasetsID === "despesas" && podeAbrirDespesa) {
      setModalDespesasVisible(true);
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

  const checkTipo = (item) => {
    if (item.tipo === 1) {
      return "Leite";
    } else {
      return "Venda";
    }
  };

  const data = {
    labels: Object.keys(receitasPorVaca) //pega as chaves do objeto (receitasPorVaca)
      .map((mes) => getNomeDoMes(parseInt(mes))), //retorna o nome do mês referente a chave do (receitasPorVaca),
    datasets: [
      {
        datasetsID: "receitas",
        data: Object.values(receitasPorVaca),
        color: (opacity = 1) => `rgba(0, 200, 83, ${opacity})`, // cor da primeira linha
        strokeWidth: 3,
      },
        // MD3Colors.error60,
      { 
        datasetsID: "despesas",
        data: Object.values(despesasPorVaca),
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // cor da segunda linha
        strokeWidth: 3,
      },
    ],
    legend: ["Receitas", "Despesas"],
  };
  const chartConfig = {
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    backgroundGradientFrom: "#ffffff00",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130d00",
    backgroundGradientToOpacity: 0,
    propsForDots: {
      r: scale(5),
    },
  };

  //Cria um texto com a Data e o Valor daquela produção, usado na flatList
  const renderItemReceitas = ({ item }) => {
    const tipo = checkTipo(item);
    const isItemSelected = item._id === selectedItemId;
    return (
      <>
        <TouchableOpacity
          style={styles.listaDet}
          onPress={() => {
            setModalDetReceitasVisible(true);
            setSelectedItemId(item._id);
          }}
        >
          <View style={styles.containerTituloBotao}>
            <Text style={[styles.tituloBotao, { flex: 1 }]}>
              {formatarResultado(item.createdAt, "data")}
            </Text>
            <Text style={[styles.tituloBotao, { flex: 1 }]}>
              {formatarResultado(item.prodL * item.precoL, "preco")}
            </Text>
          </View>
        </TouchableOpacity>

        {isItemSelected && (
          <Modal
            isVisible={modalDetReceitasVisible}
            statusBarTranslucent
            backdropColor="#000"
            backdropOpacity={0.3}
            onBackdropPress={() => setModalDetReceitasVisible(false)}
            animationIn="fadeInLeftBig"
            animationInTiming={600}
            animationOut={"fadeOutRightBig"}
            animationOutTiming={600}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}
          >
            <View style={{ flex: 1, justifyContent: "flex-start" }}>
              <View style={[styles.containerDetalhes]}>
                <View style={styles.modalHeader1}>
                  <Text style={styles.modalTitle1}>Detalhes</Text>
                  <TouchableOpacity
                    onPress={() => setModalDetReceitasVisible(false)}
                  >
                    <Text style={styles.modalCloseButton1}>X</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={styles.tituloDetalhes}>{checkTipo(item)}</Text>
                </View>
                <View style={styles.modalContainerText}>
                  <View style={styles.modalContentDet}>
                    <Text style={styles.textContentTitulo}>Data: </Text>
                    <Text style={styles.textContent}>
                      {formatarResultado(item.createdAt, "data")}
                    </Text>
                  </View>
                  <View style={styles.modalContentDet}>
                    <Text style={styles.textContentTitulo}>Horário: </Text>
                    <Text style={styles.textContent}>
                      {item.createdAt.toLocaleTimeString()}
                    </Text>
                  </View>
                  {tipo === "Leite" ? (
                    <>
                      <View style={styles.modalContentDet}>
                        <Text style={styles.textContentTitulo}>Produção: </Text>
                        <Text style={styles.textContent}>
                          {formatarResultado(item.prodL, "litro")}
                        </Text>
                      </View>
                      <View style={styles.modalContentDet}>
                        <Text style={styles.textContentTitulo}>Preço: </Text>
                        <Text style={styles.textContent}>
                          {formatarResultado(item.precoL, "preco")}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <>
                      <View style={styles.modalContentDet}>
                        <Text style={styles.textContentTitulo}>Peso: </Text>
                        <Text style={styles.textContent}>
                          {formatarResultado(item.prodL, "peso")}
                        </Text>
                      </View>
                      <View style={styles.modalContentDet}>
                        <Text style={styles.textContentTitulo}>
                          Preço por arroba:{" "}
                        </Text>
                        <Text style={styles.textContent}>
                          {formatarResultado(item.precoL, "preco")}
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={styles.modalContentDet}>
                    <Text style={styles.textContentTitulo}>Valor Total: </Text>
                    <Text style={styles.textContent}>
                      {formatarResultado(item.precoL * item.prodL, "preco")}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.textContentTitulo}>Descrição:</Text>
                    <Text style={styles.textContent}> {item.description}</Text>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </>
    );
  };

  //Cria um texto com a Data e o Valor daquela produção, usado na flatList
  const renderItemDespesas = ({ item }) => {
    const categoriaProd = TipoAfter(item);
    const isItemSelected = item._id === selectedItemId;
    return (
      <>
        <TouchableOpacity
          style={styles.listaDet}
          onPress={() => {
            setModalDetDespesasVisible(true);
            setSelectedItemId(item._id);
          }}
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

        {isItemSelected && (
          <Modal
            isVisible={modalDetDespesasVisible}
            statusBarTranslucent
            backdropColor="#000"
            backdropOpacity={0.3}
            onBackdropPress={() => setModalDetDespesasVisible(false)}
            animationIn="fadeInLeftBig"
            animationInTiming={600}
            animationOut={"fadeOutRightBig"}
            animationOutTiming={600}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}
          >
            <View style={{ flex: 1, justifyContent: "flex-start" }}>
              <View style={[styles.containerDetalhes]}>
                <View style={styles.modalHeader1}>
                  <Text style={styles.modalTitle1}>Detalhes</Text>
                  <TouchableOpacity
                    onPress={() => setModalDetDespesasVisible(false)}
                  >
                    <Text style={styles.modalCloseButton1}>X</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={styles.tituloDetalhes}>{TipoAfter(item)}</Text>
                </View>
                <View style={styles.modalContainerText}>
                  <View style={styles.modalContentDet}>
                    <Text style={styles.textContentTitulo}>Nome: </Text>
                    <Text style={styles.textContent}>
                      {item.nomeProd.length < verticalScale(22)
                        ? `${item.nomeProd}`
                        : `${item.nomeProd.substring(0, verticalScale(22))}...`}
                    </Text>
                  </View>
                  <View style={styles.modalContentDet}>
                    <Text style={styles.textContentTitulo}>Data: </Text>
                    <Text style={styles.textContent}>
                      {formatarResultado(item.createdAt, "data")}
                    </Text>
                  </View>
                  <View style={styles.modalContentDet}>
                    <Text style={styles.textContentTitulo}>Horario: </Text>
                    <Text style={styles.textContent}>
                      {item.createdAt.toLocaleTimeString()}
                    </Text>
                  </View>
                  {categoriaProd === "Alimento" ? (
                    <>
                      <View style={styles.modalContentDet}>
                        <Text style={styles.textContentTitulo}>
                          Preço Unitário:{" "}
                        </Text>
                        <Text style={styles.textContent}>
                          {formatarResultado(
                            item.valorProd / item.pesoProd,
                            "preco"
                          )}
                        </Text>
                      </View>
                      <View style={styles.modalContentDet}>
                        <Text style={styles.textContentTitulo}>
                          Peso Utilizado:{" "}
                        </Text>
                        <Text style={styles.textContent}>
                          {formatarResultado(item.pesoProd, "peso")}
                        </Text>
                      </View>
                      <View style={styles.modalContentDet}>
                        <Text style={styles.textContentTitulo}>
                          Valor Total:{" "}
                        </Text>
                        <Text style={styles.textContent}>
                          {formatarResultado(item.valorProd, "preco")}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "column" }}>
                        <Text style={styles.textContentTitulo}>Descrição:</Text>
                        <Text style={styles.textContent}>
                          {" "}
                          {item.obserProd}
                        </Text>
                      </View>
                    </>
                  ) : categoriaProd === "Remédios" ? (
                    <>
                      <View style={styles.modalContentDet}>
                        <Text style={styles.textContentTitulo}>
                          Preço Unitário:{" "}
                        </Text>
                        <Text style={styles.textContent}>
                          {formatarResultado(
                            item.valorProd / item.volumeProd,
                            "preco"
                          )}
                        </Text>
                      </View>
                      <View style={styles.modalContentDet}>
                        <Text style={styles.textContentTitulo}>
                          Volume Usado:{" "}
                        </Text>
                        <Text style={styles.textContent}>
                          {formatarResultado(item.volumeProd, "litro")}
                        </Text>
                      </View>
                      <View style={styles.modalContentDet}>
                        <Text style={styles.textContentTitulo}>
                          Valor Total:{" "}
                        </Text>
                        <Text style={styles.textContent}>
                          {formatarResultado(item.valorProd, "preco")}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "column" }}>
                        <Text style={styles.textContentTitulo}>Descrição:</Text>
                        <Text style={styles.textContent}>
                          {" "}
                          {item.obserProd}
                        </Text>
                      </View>
                    </>
                  ) : categoriaProd === "Outras Despesas" ? (
                    <>
                      <View style={styles.modalContentDet}>
                        <Text style={styles.textContentTitulo}>
                          Valor Total:{" "}
                        </Text>
                        <Text style={styles.textContent}>
                          {formatarResultado(item.valorProd, "preco")}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "column" }}>
                        <Text style={styles.textContentTitulo}>Descrição:</Text>
                        <Text style={styles.textContent}>
                          {" "}
                          {item.obserProd}
                        </Text>
                      </View>
                    </>
                  ) : null}
                </View>
              </View>
            </View>
          </Modal>
        )}
      </>
    );
  };

  return (
    <>
      <LineChart
        data={data}
        width={scale(280)}
        height={verticalScale(300)}
        chartConfig={chartConfig}
        verticalLabelRotation={-90}
        xLabelsOffset={verticalScale(7)}
        bezier
        onDataPointClick={handleDataPointClick}
      />
      <Modal
        isVisible={modalReceitasVisible}
        statusBarTranslucent
        backdropColor="#000"
        backdropOpacity={0.3}
        onBackdropPress={() => setModalReceitasVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              Detalhes de {meses[mesSelecionado]}
            </Text>
            <TouchableOpacity onPress={() => setModalReceitasVisible(false)}>
              <Text style={styles.modalCloseButton}>X</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.modalContent}>
            Receitas: R$ {data.datasets[0].data[mesSelecionado].toFixed(2)}
          </Text>
          <FlatList
            style={styles.flatListContainer}
            data={receitasDoMesSelecionado}
            renderItem={renderItemReceitas}
            keyExtractor={(item) => item._id}
          />
        </View>
      </Modal>

      <Modal
        isVisible={modalDespesasVisible}
        statusBarTranslucent
        backdropColor="#000"
        backdropOpacity={0.3}
        onBackdropPress={() => setModalDespesasVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              Detalhes de {meses[mesSelecionado]}
            </Text>
            <TouchableOpacity onPress={() => setModalDespesasVisible(false)}>
              <Text style={styles.modalCloseButton}>X</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.modalContent}>
            Despesas: R$ {data.datasets[1].data[mesSelecionado].toFixed(2)}
          </Text>
          <FlatList
            style={styles.flatListContainer}
            data={despesasDoMesSelecionado}
            renderItem={renderItemDespesas}
            keyExtractor={(item) => item._id}
          />
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  containerDet: {
    flexDirection: "row",
  },
  modalContainer: {
    flex: 0.7,
    backgroundColor: Colors.darkgreen,
    borderRadius: 10,
    margin: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "50%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  modalCloseButton: {
    color: Colors.white,
    fontSize: scale(16),
    fontWeight: "bold",
  },
  modalTitle: {
    ...Fonts.txtLargeBold,
    color: Colors.white,
  },
  modalContent: {
    ...Fonts.txtMedium,
    color: Colors.white,
    backgroundColor: Colors.green,
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: 10,
    marginBottom: scale(5),
  },
  modalContentDet: {
    width: "100%",
    ...Fonts.txtMedium,
    color: Colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
  },
  flatListContainer: {
    borderRadius: 10,
    backgroundColor: Colors.green,
    width: "100%",
    paddingHorizontal: scale(5),
  },
  flatListContent: {
    fontSize: 16,
    paddingVertical: 2,
    borderBottomWidth: 0.5,
    textAlign: "center",
  },

  //Modal1
  modalContainer1: {
    flex: 1,
    backgroundColor: "#fea",
    borderRadius: 10,
    margin: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    //marginTop: "50%",
  },
  modalHeader1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: scale(10),
    paddingTop: scale(5),
  },
  modalCloseButton1: {
    color: Colors.white,
    fontSize: scale(16),
    fontWeight: "bold",
  },
  modalTitle1: {
    ...Fonts.txtLarge,
    color: Colors.white,
  },
  modalContent1: {
    fontSize: 16,
  },
  listaDet: {
    borderRadius: 20,
    backgroundColor: Colors.grey,
    width: "100%",
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: verticalScale(5),
  },
  containerTituloBotao: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tituloBotao: {
    ...Fonts.txtMedium,
    color: Colors.black,
  },
  containerDetalhes: {
    width: "100%",
    backgroundColor: Colors.darkgreen,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  tituloDetalhes: {
    color: Colors.white,
    ...Fonts.txtLarge,
    marginBottom: verticalScale(10),
    textAlign: "center",
    fontWeight: "bold",
  },
  modalContainerText: {
    width: "100%",
    padding: 5,
  },
  textContent: {
    ...Fonts.txtMedium,
    color: Colors.white,
  },
  textContentTitulo: {
    ...Fonts.txtMedium,
    color: Colors.grey,
  },
});
export default Graficodetalhesvacas;
