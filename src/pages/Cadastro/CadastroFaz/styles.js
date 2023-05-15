import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { Colors, Fonts, Buttons, TextInput } from "../../../styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Cyan,
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
    justifyContent: "center",
  },
  texto: {
    ...Fonts.txtLarge,
    color: Colors.white,
    alignSelf: "center",
  },
  campoTexto: {
    ...Fonts.txtMediumBold,
    ...TextInput.TextInputLargeRounded,
    backgroundColor: Colors.white,
    color: Colors.black,
  },
  campoTextoError: {
    ...Fonts.txtMediumBold,
    ...TextInput.TextInputLargeRounded,
    backgroundColor: Colors.white,
    color: Colors.red,
    fontWeight: "bold",
    fontSize: 15,
    borderWidth: 2,
    borderColor: Colors.red,
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
  containergeral: {
    flex: 1,
    margin: scale(15),
    borderRadius: 10,
    backgroundColor: Colors.darkgreenTransparent,
  },
  containerbotao: {
    flex: 1,
    flexDirection: "column-reverse",
    padding: verticalScale(10),
  },
  error: {
    backgroundColor: Colors.red,
    borderRadius: 20,
    paddingVertical: verticalScale(2),
    alignSelf: "center",
    color: Colors.yellow,
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
