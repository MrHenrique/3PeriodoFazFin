import { LineChart } from "react-native-chart-kit";
import { scale, verticalScale } from "react-native-size-matters";
import { AuthContext } from "../../../contexts/auth";
import { useContext, useState } from "react";
import { Modal, Text, TouchableOpacity, View, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
function Graficodetalhesvacas() {
  const { grafVaca, listaReceitasVaca, listaDespesasVaca } =
    useContext(AuthContext);
  const [modalReceitasVisible, setModalReceitasVisible] = useState(false);
  const [modalDespesasVisible, setModalDespesasVisible] = useState(false);
  const [modalDetReceitasVisible, setModalDetReceitasVisible] = useState(false);
  const [modalDetDespesasVisible, setModalDetDespesasVisible] = useState(false);
  const [mesSelecionado, setMesSelecionado] = useState(0);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  const resultado = Number(grafVaca);
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

  /*
  //Pega todos os os valores por mês e joga no array (receitas)
  const receitas = [];
  for (let i = 0; i < 12; i++) {
    receitas.push(receitasPorVaca[i]);
  }

  //Pega todos os os valores por mês e joga no array (despesas)
  const despesas = [];
  for (let i = 0; i < 12; i++) {
    despesas.push(despesasPorVaca[i]);
  }
  */

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

  /*//Teste
  const getItemValue = (key) => {
    const item = receitasDoMesSelecionado.find((item) => item._id === key);
    return item ? "Aqui deu" : '';
  };*/

  //Cria um texto com a Data e o Valor daquela produção, usado na flatList
  const renderItemDespesas = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setModalDetDespesasVisible(true);
          setItemSelecionado(item);
        }}
      >
        <Text style={styles.flatListContent}>
          {item.createdAt.getDate().toString().padStart(2, 0)}/
          {(item.createdAt.getMonth() + 1).toString().padStart(2, 0)}/
          {item.createdAt.getFullYear().toString()} -- R${" "}
          {(item.qtdProd * item.valorProd).toFixed(2)}
        </Text>
      </TouchableOpacity>
    );
  };

  //Cria um texto com a Data e o Valor daquela produção, usado na flatList
  const renderItemReceitas = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setModalDetReceitasVisible(true);
          setItemSelecionado(item);
        }}
      >
        <Text style={styles.flatListContent}>
          {item.createdAt.getDate().toString().padStart(2, 0)}/
          {(item.createdAt.getMonth() + 1).toString().padStart(2, 0)}/
          {item.createdAt.getFullYear().toString()} -- R${" "}
          {(item.prodL * item.precoL).toFixed(2)}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleDataPointClick = ({ value, index, dataset }) => {
    setMesSelecionado(index); //passa o indice do ponto clicado para a variavel mesSelecionado
    console.log(value, index, dataset);
    if (dataset.datasetsID === "receitas") {
      setModalReceitasVisible(true);
    } else if (dataset.datasetsID === "despesas") {
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
            Receitas em {meses[mesSelecionado]}: R${" "}
            {data.datasets[0].data[mesSelecionado].toFixed(2)}
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
            Despesas em {meses[mesSelecionado]}: R${" "}
            {data.datasets[0].data[mesSelecionado].toFixed(2)}
          </Text>
          <FlatList
            style={styles.flatListContainer}
            data={despesasDoMesSelecionado}
            renderItem={renderItemDespesas}
            keyExtractor={(item) => item._id}
          />
        </View>
      </Modal>

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
            <View style={styles.modalHeader1}>
              <Text style={styles.modalTitle1}>Detalhes</Text>
              <TouchableOpacity
                onPress={() => setModalDetReceitasVisible(false)}
              >
                <Text style={styles.modalCloseButton1}>X</Text>
              </TouchableOpacity>
            </View>
            {itemSelecionado && (
              <>
                <Text style={styles.modalContent1}>
                  <Text style={{ fontWeight: "bold" }}>Preço:</Text> R${" "}
                  {itemSelecionado.precoL.toFixed(2)}
                </Text>
                <Text style={styles.modalContent1}>
                  <Text style={{ fontWeight: "bold" }}>Quantidade:</Text>{" "}
                  {itemSelecionado.prodL}
                </Text>
                <Text style={styles.modalContent1}>
                  <Text style={{ fontWeight: "bold" }}>Data:</Text>{" "}
                  {itemSelecionado.createdAt.toLocaleDateString()}
                </Text>
                <Text style={styles.modalContent1}>
                  <Text style={{ fontWeight: "bold" }}>Hora:</Text>{" "}
                  {itemSelecionado.createdAt.toLocaleTimeString()}
                </Text>
              </>
            )}
          </View>
        </SafeAreaView>
      </Modal>

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
            <View style={styles.modalHeader1}>
              <Text style={styles.modalTitle1}>Detalhes</Text>
              <TouchableOpacity
                onPress={() => setModalDetDespesasVisible(false)}
              >
                <Text style={styles.modalCloseButton1}>X</Text>
              </TouchableOpacity>
            </View>
            {itemSelecionado && (
              <>
                <Text style={styles.modalContent1}>
                  <Text style={{ fontWeight: "bold" }}>Preço:</Text> R${" "}
                  {itemSelecionado.precoL.toFixed(2)}
                </Text>
                <Text style={styles.modalContent1}>
                  <Text style={{ fontWeight: "bold" }}>Quantidade:</Text>{" "}
                  {itemSelecionado.prodL}
                </Text>
                <Text style={styles.modalContent1}>
                  <Text style={{ fontWeight: "bold" }}>Data:</Text>{" "}
                  {itemSelecionado.createdAt.toLocaleDateString()}
                </Text>
                <Text style={styles.modalContent1}>
                  <Text style={{ fontWeight: "bold" }}>Hora:</Text>{" "}
                  {itemSelecionado.createdAt.toLocaleTimeString()}
                </Text>
              </>
            )}
          </View>
        </SafeAreaView>
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
    flex: 0.2,
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
});
export default Graficodetalhesvacas;
