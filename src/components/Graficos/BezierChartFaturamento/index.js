import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
const screenWidth = Dimensions.get("window").width;
function BezierChartFaturamento() {
  const data = {
    labels: ["Julho", "Agosto", "Setembro", "Outubro"],
    datasets: [
      {
        data: [2500, 2700, 4550, 5000],
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
      verticalLabelRotation={30}
      fromZero={true}
      bezier
    />
  );
}
export default BezierChartFaturamento;
