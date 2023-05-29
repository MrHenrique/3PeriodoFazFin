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
    flex: 1,
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
  texto: {
    ...Fonts.txtLarge,
    fontWeight: "500",
    color: Colors.white,
    alignSelf: "center",
  },
  campoTexto: {
    backgroundColor: Colors.white,
    marginBottom: verticalScale(10),
  },
  subtitle: {
    ...Fonts.txtLarge,
    color: Colors.black,
    alignSelf: "center",
  },
  botao: {
    flex: 1,
    marginBottom: verticalScale(10),
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    justifyContent: "center",
  },
  disabledbutton: {
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.darkgreen,
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
    backgroundColor: Colors.darkgreen,
  },
  containerbotoes: {
    flex: 0.2,
    justifyContent: "flex-start",
    flexDirection: "column-reverse",
  },
  containerButaoKeyboardOn: {
    flex: 0.2,
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingTop: verticalScale(10),
    minHeight: scale(60),
  },
});
export default styles;
