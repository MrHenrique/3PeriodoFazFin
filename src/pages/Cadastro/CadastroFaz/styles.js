import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { Colors, Fonts, Buttons, TextInput } from "../../../styles";

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
    marginBottom: verticalScale(55),
  },
  texto: {
    ...Fonts.txtLarge,
    color: Colors.green,
    fontWeight: "500",
    alignSelf: "center",
  },
  campoTexto: {
    backgroundColor: Colors.white,
  },
  campoTextoError: {
    ...Fonts.txtMediumBold,
    ...TextInput.TextInputLargeRounded,
    backgroundColor: Colors.white,
    color: Colors.red,
    fontWeight: "bold",
    fontSize: 15,
    fontWeight: "500",
    borderBottomWidth: 2,
    borderBottomColor: Colors.red,
  },
  botao: {
    flex: 1,
    maxHeight: 40,
    marginTop: verticalScale(10),
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    justifyContent: "center",
  },
  tituloBotao: {
    ...Fonts.txtMediumBold,
    color: Colors.white,
  },
  containergeral: {
    flex: 1,
    margin: scale(15),
    borderRadius: 10,
    backgroundColor: Colors.darkgreen,
  },
  containerbotao: {
    flex: 0.2,
    flexDirection: "column-reverse",
    padding: verticalScale(10),
  },
  containerButaoKeyboardOn: {
    flex: 0.2,
    flexDirection: "column-reverse",
    justifyContent: "flex-end",
    minHeight: scale(40),
    paddingTop: verticalScale(10),
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
