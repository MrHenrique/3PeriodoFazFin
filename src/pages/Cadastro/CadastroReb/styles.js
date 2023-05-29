import { StyleSheet } from "react-native";
import { Buttons, Colors, Fonts, TextInput } from "../../../styles";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  containerkeyboard: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: Colors.darkgreen,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.darkgreen,
  },
  mainContainer: {
    flex: 1,
    margin: scale(15),
    borderRadius: 10,
    backgroundColor: Colors.darkgreen,
  },
  imgbg: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
  },
  logo: {
    resizeMode: "contain",
    height: verticalScale(150),
    width: verticalScale(150),
    top: verticalScale(30),
    alignSelf: "center",
    marginBottom: verticalScale(55),
  },
  texto: {
    ...Fonts.txtLargeBold,
    color: Colors.green,
  },
  viewtext: {
    flex: 1,
  },
  campoTexto: {
    backgroundColor: Colors.white,
    marginBottom: verticalScale(10),
  },
  campoTextoErro: {
    ...Fonts.txtMediumBold,
    ...TextInput.TextInputLargeRounded,
    backgroundColor: Colors.white,
    color: Colors.white,
    borderBottomColor: Colors.red,
    borderBottomWidth: 2,
  },
  containerbotoes: {
    flex: 0.2,
    padding: verticalScale(10),
    flexDirection: "column-reverse",
  },
  containerButaoKeyboardOn: {
    flex: 0.2,
    flexDirection: "column",
    justifyContent: "flex-end",
    minHeight: scale(40),
    paddingTop: verticalScale(10),
  },
  botao: {
    flex: 1,
    maxHeight: 40,
    marginBottom: verticalScale(10),
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    justifyContent: "center",
  },
  tituloBotao: {
    ...Fonts.txtMediumBold,
    color: Colors.white,
  },
  error: {
    backgroundColor: "#ff0000",
    marginBottom: 10,
    borderRadius: 20,
    padding: verticalScale(2),
    alignSelf: "center",
    color: "yellow",
  },
});

export default styles;
