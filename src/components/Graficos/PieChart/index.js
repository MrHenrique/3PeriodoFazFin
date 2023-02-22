import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { useContext } from "react";
const screenWidth = Dimensions.get("window").width;
import { AuthContext } from "../../../contexts/auth";
function PieChartFaz() {
  const { precoCF ,precoLeite} = useContext(AuthContext);
  const despesas = Number(precoCF);
  const receitas = Number(precoLeite);
  const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
  };
  const data = [
    {
      name: "Receitas",
      valor: receitas,
      color: "rgba(15, 109, 0, 0.85)",
      legendFontColor: "#FFF",
      legendFontSize: 16,
    },
    {
      name: "Despesas",
      valor: despesas,
      color: "rgba(255,0,0,0.85)",
      legendFontColor: "#FFF",
      legendFontSize: 16,
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
