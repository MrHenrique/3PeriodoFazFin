import { StyleSheet } from "react-native";
import { Buttons, Colors, Fonts, TextInput } from "../../../../styles";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkgreen,
  },
  containergeral: {
    flex: 1,
    margin: scale(15),
    backgroundColor: Colors.darkgreen,
    borderRadius: 10,
  },
  containervoltar: {
    paddingTop: scale(10),
    flex: 0.178,
    flexDirection: "column-reverse",
  },
  botao: {
    flex: 1.1,
    paddingHorizontal: scale(80),
    marginBottom: verticalScale(10),
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    elevation: 10,
  },
  voltarfont: {
    color: Colors.white,
    ...Fonts.txtLargeBold,
    paddingLeft: scale(15),
  },
  contentContainer: {
    flex: 2,
  },
  containerCard: {
    flex: 1,
  },
  ContainerInfoCard: {
    backgroundColor: Colors.green,
    flex: 1,
    margin: scale(4),
    borderRadius: scale(12),
    elevation: 10,
  },
  fontTitulo: {
    ...Fonts.txtMedium,
    color: Colors.grey,
  },
  font: {
    ...Fonts.txtLarge,
    color: Colors.white,
  },
  ContainerInfoCardOBS: {
    backgroundColor: Colors.green,
    flex: 2,
    margin: scale(4),
    borderRadius: scale(12),
    justifyContent: "flex-start",
    elevation: 10,
  },
});
export default styles;
