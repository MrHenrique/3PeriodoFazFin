import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { AuthContext } from "../../../contexts/auth";
import { useContext, useState } from "react";
const screenWidth = Dimensions.get("window").width;
function BezierChartFaturamentoReb() {
  const { precoLeiteReb, listaLeiteReb } = useContext(AuthContext);
  const receitas = Number(precoLeiteReb);

  const [listaTeste, setListaTeste] = useState(listaLeiteReb);


  const receitasPorMes = {
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
    10: 0,  //Novembro
    11: 0,  //Dezembro
  }

  //Percorre todos as produçoes de leite
  listaLeiteReb.forEach((item) => {
    const valor = (item.prodL * item.precoL) //Pega a produção e multioplica pelo valor
    const mes = item.createdAt.getMonth();  // cria uma variavel que se iguala ao mes de criação do item

    receitasPorMes[mes] += valor; //Soma todos os valores do mês
  });

  console.log(receitasPorMes);

  //Teste
  const totalAbril = listaLeiteReb.reduce((total, item) => {
    if (item.createdAt.getMonth() == 3){
      return total + (item.prodL * item.precoL);
    }
    return total;
  }, 0);
  //FIM

  console.log(totalAbril);
  const data = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Nov", "Dez"],
    datasets: [
      {
        data: Object.values(receitasPorMes),  // retorna um array com os valores de todas as propriedades do objeto (receitasPorMes)
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
  return (
    <LineChart
      data={data}
      width={screenWidth}
      height={verticalScale(330)}
      chartConfig={chartConfig}
      verticalLabelRotation={40}
      fromZero={true}
      bezier
    />
  );
}
export default BezierChartFaturamentoReb;
