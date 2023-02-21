import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
const screenWidth = Dimensions.get("window").width;
function PieChartFaz(dataRelatorio) {
  const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
  };
const data = [
    {
      name: "Faturamento",
      valor: 5000,
      color: "rgba(15, 109, 0, 0.85)",
      legendFontColor: "#FFF",
      legendFontSize: 13,
    },
    {
      name: "Despesas",
      valor: 2500,
      color: "rgba(255,0,0,0.85)",
      legendFontColor: "#FFF",
      legendFontSize: 13,
    },
  ];
  return (
    <PieChart
      width={screenWidth}
      height={verticalScale(220)}
      data={data}
      chartConfig={chartConfig}
      accessor={"valor"}
      backgroundColor={"transparent"}
      paddingLeft={scale(0)}
      center={[scale(10), verticalScale(10)]}
      absolute
    />
  );
}
export default PieChartFaz;
