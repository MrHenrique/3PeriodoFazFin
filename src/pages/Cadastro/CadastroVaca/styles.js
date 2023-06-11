import { StyleSheet } from "react-native";
import { Buttons, Colors, Fonts, TextInput } from "../../../styles";
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
    flex: 0.2,
    flexDirection: "column-reverse",
    paddingTop: scale(10),
  },
  containerEdit: {
    flex: 0.19,
    flexDirection: "column",
    paddingTop: scale(10),
  },
  botao: {
    flex: 1.1,
    marginBottom: verticalScale(10),
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    flexDirection: "row-reverse",
    paddingHorizontal: scale(80),
    justifyContent: "space-between",
    elevation: 10,
    elevation: 10,
  },
  voltarfont: {
    color: Colors.white,
    ...Fonts.txtLargeBold,
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
  ContainerInfoCardOBS: {
    backgroundColor: Colors.green,
    flex: 2,
    margin: scale(4),
    borderRadius: scale(12),
    justifyContent: "flex-start",
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
  textInput: {
    backgroundColor: Colors.white,
    width: scale(300),
    justifyContent: "center",
    alignSelf: "center",
  },
  textInput: {
    backgroundColor: Colors.white,
    width: scale(300),
    justifyContent: "center",
    alignSelf: "center",
  },
  textInputError: {
    ...TextInput.TextInputLargeRounded,
    alignSelf: "center",
    backgroundColor: Colors.white,
    color: Colors.red,
    fontWeight: "bold",
    fontSize: 15,
    borderWidth: 2,
    borderColor: Colors.red,
  },
  error: {
    backgroundColor: Colors.red,
    borderRadius: 20,
    alignSelf: "center",
    color: Colors.yellow,
    fontWeight: "bold",
    position: "absolute",
    top: verticalScale(-15),
    padding: scale(1),
  },
  campoTextoErro: {
    ...Fonts.txtMediumBold,
    ...TextInput.TextInputLargeRounded,
    backgroundColor: Colors.white,
    color: Colors.black,
    borderWidth: 2,
    borderColor: Colors.red,
  },
  containerInput: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
    // minHeight: verticalScale(60),
  },
});
export default styles;
