import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { AuthContext } from "../../../contexts/auth";
import { useContext } from "react";
const screenWidth = Dimensions.get("window").width;
function BezierChartDespesasReb() {
  const { precoCFReb, listaAliReb } = useContext(AuthContext);
  const despesas = Number(precoCFReb);

  const despesasPorMes = {
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

  //Percorre todos as despesas
  listaAliReb.forEach((item) => {
    const valor = (item.valorAli / item.qtdAli) * item.consumoAli;
    const mes = item.createdAt.getMonth(); // cria uma variavel que se iguala ao mes de criação do item

    despesasPorMes[mes] += valor; //Soma todos as despesas do mês
  });

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

  //Pega todos os os valores por mês e joga no array (valores)
  const valores = [];
  for (let i = 0; i < 12; i++) {
    valores.push(despesasPorMes[i]);
  }
  
  const data = {
    labels: Object.keys(despesasPorMes) //pega as chaves do objeto (despesasPorMes)
      .map((mes) => getNomeDoMes(parseInt(mes))), //retorna o nome do mês referente a chave do (despesasPorMes)],
    datasets: [
      {
        data: Object.values(despesasPorMes),
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      },
    ],
  };
  const chartConfig = {
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
  };
  //console.log(listaAliReb);
  return (
    <LineChart
      data={data}
      width={screenWidth}
      height={verticalScale(330)}
      chartConfig={chartConfig}
      verticalLabelRotation={30}
      fromZero={true}
      bezier
    />
  );
}
export default BezierChartDespesasReb;
