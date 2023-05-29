import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { Colors, Fonts, Buttons, TextInput } from "../../styles";

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
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  containergeral: {
    flex: 1,
    margin: scale(15),
    borderRadius: 10,
    backgroundColor: Colors.darkgreen,
  },
  texto: {
    ...Fonts.txtLarge,
    color: Colors.black,
    alignSelf: "center",
  },
  campoTexto: {
    backgroundColor: Colors.white,
    marginBottom: verticalScale(10),
  },
  logo: {
    resizeMode: "contain",
    height: verticalScale(150),
    width: verticalScale(150),
    top: verticalScale(30),
    alignSelf: "center",
  },
  title: {
    ...Fonts.Title,
    color: Colors.white,
    top: verticalScale(25),
    marginBottom: verticalScale(30),
  },
  subtitle: {
    ...Fonts.txtLarge,
    color: Colors.white,
    alignSelf: "center",
  },
  botao: {
    flex: 1,
    maxHeight: 40,
    marginBottom: verticalScale(10),
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    justifyContent: "center",
  },
  disabledbutton: {
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.btndarkgreen,
    opacity: 0.4,
  },
  tituloBotao: {
    ...Fonts.txtMediumBold,
    color: Colors.white,
  },
  select: {
    alignSelf: "center",
    marginTop: verticalScale(15),
  },
  containerlogin: {
    flex: 1,
    margin: scale(15),
    borderRadius: 10,
    backgroundColor: Colors.darkgreenTransparent,
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
});
export default styles;
