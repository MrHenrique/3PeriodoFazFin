import { LineChart } from "react-native-chart-kit";
import { scale, verticalScale } from "react-native-size-matters";
import { AuthContext } from "../../../contexts/auth";
import { useContext, useState } from "react";
import { Modal, Text, TouchableOpacity, View, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Fonts } from "../../../styles";
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
        color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`, // cor da primeira linha
        strokeWidth: 3,
      },
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
            visible={modalDetReceitasVisible}
            animationType="slide"
            transparent={true}
          >
            <SafeAreaView
              style={{ flex: 1 }}
              onTouchStart={() => setModalDetReceitasVisible(false)}
            >
              <View style={styles.modalContainer1}>
                <>
                  <View style={[styles.containerDetalhes]}>
                    <View style={styles.modalHeader1}>
                      <Text style={styles.modalTitle1}>
                        Detalhes {checkTipo(item)}
                      </Text>
                      <TouchableOpacity
                        onPress={() => setModalDetReceitasVisible(false)}
                      >
                        <Text style={styles.modalCloseButton1}>X</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.modalContainerText}>
                      {tipo === "Venda" ? (
                        <View style={styles.modalContent}>
                          <Text style={styles.textContent}>
                            Nome do animal:{" "}
                          </Text>
                          <Text style={styles.textContent}>
                            {item.nomeProd}
                          </Text>
                        </View>
                      ) : null}
                      <View style={styles.modalContent}>
                        <Text style={styles.textContent}>Data: </Text>
                        <Text style={styles.textContent}>
                          {formatarResultado(item.createdAt, "data")}
                        </Text>
                      </View>
                      <View style={styles.modalContent}>
                        <Text style={styles.textContent}>Horário: </Text>
                        <Text style={styles.textContent}>
                          {item.createdAt.toLocaleTimeString()}
                        </Text>
                      </View>
                      {tipo === "Leite" ? (
                        <>
                          <View style={styles.modalContent}>
                            <Text style={styles.textContent}>Produção: </Text>
                            <Text style={styles.textContent}>
                              {formatarResultado(item.prodL, "litro")}
                            </Text>
                          </View>
                          <View style={styles.modalContent}>
                            <Text style={styles.textContent}>Preço: </Text>
                            <Text style={styles.textContent}>
                              {formatarResultado(item.precoL, "preco")}
                            </Text>
                          </View>
                        </>
                      ) : (
                        <>
                          <View style={styles.modalContent}>
                            <Text style={styles.textContent}>Peso: </Text>
                            <Text style={styles.textContent}>
                              {formatarResultado(item.prodL, "peso")}
                            </Text>
                          </View>
                          <View style={styles.modalContent}>
                            <Text style={styles.textContent}>
                              Preço por arroba:{" "}
                            </Text>
                            <Text style={styles.textContent}>
                              {formatarResultado(item.precoL, "preco")}
                            </Text>
                          </View>
                        </>
                      )}
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
                </>
              </View>
            </SafeAreaView>
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
            visible={modalDetDespesasVisible}
            animationType="slide"
            transparent={true}
          >
            <SafeAreaView
              style={{ flex: 1 }}
              onTouchStart={() => setModalDetDespesasVisible(false)}
            >
              <View style={styles.modalContainer1}>
                <>
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
                      <Text style={styles.tituloDetalhes}>
                        {TipoAfter(item)}
                      </Text>
                    </View>
                    <View style={styles.modalContainerText}>
                      <View style={styles.modalContent}>
                        <Text style={styles.textContent}>Nome: </Text>
                        <Text style={styles.textContent}>
                          {item.nomeProd.length < verticalScale(22)
                            ? `${item.nomeProd}`
                            : `${item.nomeProd.substring(
                                0,
                                verticalScale(22)
                              )}...`}
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
                            <Text style={styles.textContent}>
                              Preço Unitário:{" "}
                            </Text>
                            <Text style={styles.textContent}>
                              {formatarResultado(
                                item.valorProd / item.pesoProd,
                                "preco"
                              )}
                            </Text>
                          </View>
                          <View style={styles.modalContent}>
                            <Text style={styles.textContent}>
                              Peso Utilizado:{" "}
                            </Text>
                            <Text style={styles.textContent}>
                              {formatarResultado(item.pesoProd, "peso")}
                            </Text>
                          </View>
                          <View style={styles.modalContent}>
                            <Text style={styles.textContent}>
                              Valor Total:{" "}
                            </Text>
                            <Text style={styles.textContent}>
                              {formatarResultado(item.valorProd, "preco")}
                            </Text>
                          </View>
                          <Text style={styles.textContent}>
                            Descrição: {item.obserProd}
                          </Text>
                        </>
                      ) : categoriaProd === "Remédios" ? (
                        <>
                          <View style={styles.modalContent}>
                            <Text style={styles.textContent}>
                              Preço Unitário:{" "}
                            </Text>
                            <Text style={styles.textContent}>
                              {formatarResultado(
                                item.valorProd / item.volumeProd,
                                "preco"
                              )}
                            </Text>
                          </View>
                          <View style={styles.modalContent}>
                            <Text style={styles.textContent}>
                              Volume Usado:{" "}
                            </Text>
                            <Text style={styles.textContent}>
                              {formatarResultado(item.volumeProd, "litro")}
                            </Text>
                          </View>
                          <View style={styles.modalContent}>
                            <Text style={styles.textContent}>
                              Valor Total:{" "}
                            </Text>
                            <Text style={styles.textContent}>
                              {formatarResultado(item.valorProd, "preco")}
                            </Text>
                          </View>
                          <Text style={styles.textContent}>
                            Descrição: {item.obserProd}
                          </Text>
                        </>
                      ) : categoriaProd === "Outras Despesas" ? (
                        <>
                          <View style={styles.modalContent}>
                            <Text style={styles.textContent}>
                              Valor Total:{" "}
                            </Text>
                            <Text style={styles.textContent}>
                              {formatarResultado(item.valorProd, "preco")}
                            </Text>
                          </View>
                          <Text style={styles.textContent}>
                            Descrição: {item.obserProd}
                          </Text>
                        </>
                      ) : null}
                    </View>
                  </View>
                </>
              </View>
            </SafeAreaView>
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
        visible={modalReceitasVisible}
        animationType="slide"
        transparent={true}
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
        visible={modalDespesasVisible}
        animationType="slide"
        transparent={true}
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
  modalContainer: {
    flex: 0.7,
    backgroundColor: "#fea",
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
    color: "#ffaa41",
    fontSize: 24,
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  modalContent: {
    fontSize: 18,
    paddingBottom: 15,
  },
  flatListContainer: {
    borderRadius: 10,
    backgroundColor: "#ffaa41",
    //width: "90%",
    paddingHorizontal: 10,
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
  },
  modalCloseButton1: {
    color: "#ffaa41",
    fontSize: 24,
    fontWeight: "bold",
  },
  modalTitle1: {
    fontSize: 24,
    fontWeight: "bold",
  },
  modalContent1: {
    fontSize: 16,
  },
  listaDet: {
    borderRadius: 20,
    backgroundColor: Colors.green,
    width: scale(300),
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
    ...Fonts.txtMediumBold,
    color: Colors.white,
  },
  containerDetalhes: {
    width: scale(300),
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  tituloDetalhes: {
    color: "black",
    fontSize: verticalScale(20),
    marginBottom: verticalScale(10),
    textAlign: "center",
    fontWeight: "bold",
  },
  modalContainerText: {
    width: "100%",
    padding: 5,
  },
  modalContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContent: {
    fontSize: 20,
  },
});
export default Graficodetalhesvacas;
