import { LineChart } from "react-native-chart-kit";
import { scale, verticalScale } from "react-native-size-matters";
function Graficodetalhesvacas() {
  const data = {
    labels: ["	Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez", ],
    datasets: [
      {
        data: [1000, 1200, 400, 6000, 3500, 7000, 6200, 1400, 8000, 500, 2990, 5000],
        strokeWidth: 2.6
      }
    ],
    legend: ["LUCRO DO ANIMAL"] 
  };
  const chartConfig = {
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    backgroundGradientFrom: "#ffffff00",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130d00",
    backgroundGradientToOpacity: 0,

  };
  return (
    <LineChart
      data={data}
      width={scale(280)}
      height={verticalScale(300)}
      chartConfig={chartConfig}
      verticalLabelRotation={-90}
      bezier
    />
  );
}
export default Graficodetalhesvacas;
