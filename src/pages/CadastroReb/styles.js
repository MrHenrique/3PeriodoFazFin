import { StyleSheet } from "react-native";
import { Buttons, Colors, Fonts } from "../../styles";
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
    borderRadius: 20,
    width: scale(300),
    height: verticalScale(40),
    marginVertical: verticalScale(10),
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
});

export default styles;
