import { LineChart } from "react-native-chart-kit";
import { scale, verticalScale } from "react-native-size-matters";
import { AuthContext } from "../../../contexts/auth";
import { useContext, useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { StyleSheet } from "react-native";
function Graficodetalhesvacas() {
  const { grafVaca, listaReceitaVacas } = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(0);

  const resultado = Number(grafVaca);
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

  //Percorre todos as produçoes de leite
  listaReceitaVacas.forEach((item) => {
    const valor = item.prodL * item.precoL; //Pega a produção e multiplica pelo valor
    const mes = item.createdAt.getMonth(); // cria uma variavel que se iguala ao mes de criação do item

    receitasPorVaca[mes] += valor; //Soma todos os valores do mês
  });

  //Pega todos os os valores por mês e joga no array (valores)
  const valores = [];
  for (let i = 0; i < 12; i++) {
    valores.push(receitasPorVaca[i]);
  }

  const data = {
    labels: Object.keys(receitasPorVaca) //pega as chaves do objeto (receitasPorVaca)
      .map((mes) => getNomeDoMes(parseInt(mes))), //retorna o nome do mês referente a chave do (receitasPorVaca),
    datasets: [
      {
        data: valores,
        strokeWidth: 3,
      },
    ],
    legend: ["LUCRO DO ANIMAL"],
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
        onDataPointClick={({ value, index }) => {
          setSelectedMonth(index);
          setModalVisible(true);
        }}
      />
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              Detalhes de {data.labels[selectedMonth]}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseButton}>X</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.modalContent}>
            Receitas em {data.labels[selectedMonth]}: R${" "}
            {data.datasets[0].data[selectedMonth].toFixed(2)}
          </Text>
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 0.4,
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
  },
});
export default Graficodetalhesvacas;
