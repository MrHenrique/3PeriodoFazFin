import { StyleSheet } from "react-native";
import { Buttons, Colors, Fonts, TextInput } from "../../../styles";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Cyan,
  },
  mainContainer: {
    flex: 1,
    margin: scale(15),
    borderRadius: 10,
    backgroundColor: Colors.darkgreenTransparent,
  },
  imgbg: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
  },
  logo: {
    flex: 1,
    resizeMode: "contain",
    height: verticalScale(150),
    width: verticalScale(150),
    alignSelf: "center",
  },
  texto: {
    ...Fonts.txtLargeBold,
    color: Colors.white,
  },
  viewtext: {
    flex: 1,
    alignSelf: "center",
  },
  campoTexto: {
    backgroundColor: Colors.white,
    color: Colors.black,
    textAlign: "center",
    ...Fonts.txtMediumBold,
    ...TextInput.TextInputLargeRounded,
  },
  containerbotoes: {
    flex: 1,
    padding: verticalScale(10),
    flexDirection: "column-reverse",
  },
  botaopress: {
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.btngreen,
    marginBottom: verticalScale(10),
  },
  botaopress2: {
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.btngreen,
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
  campoTextoErro: {
    ...Fonts.txtMediumBold,
    ...TextInput.TextInputLargeRounded,
    backgroundColor: Colors.white,
    color: Colors.black,
    borderWidth: 2,
    borderColor: Colors.red,
  },
});

export default styles;
