import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { Colors, Fonts, Buttons, TextInput } from "../../styles";

const styles = StyleSheet.create({
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
    ...Fonts.txtMediumBold,
    ...TextInput.TextInputLargeRounded,
    backgroundColor: Colors.white,
    borderBottomColor: Colors.green,
    borderBottomWidth: scale(2),
    color: Colors.black,
  },
  subtitle: {
    ...Fonts.txtLarge,
    color: Colors.black,
    alignSelf: "center",
  },
  botaopress: {
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    marginBottom: verticalScale(10),
  },
  botaopress2: {
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    flexDirection: "row-reverse",
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
    flex: 1,
    padding: verticalScale(10),
    flexDirection: "column-reverse",
  },
});
export default styles;
