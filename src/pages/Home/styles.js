import { Button, StyleSheet } from "react-native";
import { Buttons, Colors, Fonts } from "../../styles";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green,
  },
  imgbg: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
  },
  // btn voltar despesas estoque
  botaoPress4: {
    flex: 1,
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.darkgreen,
  },
  // texto - btn voltar despesas estoque
  tituloBotao2: {
    ...Fonts.txtXLargeBold,
    color: Colors.white,
  },
  // voltar
  botaopress: {
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.darkgreen,
  },
  tituloBotao: {
    ...Fonts.txtMediumBold,
    color: Colors.white,
  },

  containergeral: {
    flex: 1,
    margin: scale(15),
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  containerPreview: {
    flex: 0.6,
    justifyContent: "flex-start",
    flexDirection: "column-reverse",
    // backgroundColor: Colors.white,
    paddingTop: verticalScale(15),
  },
  containerBotoes: {
    flex: 1,
    // backgroundColor: Colors.blue,
  },
  BTN_route: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: verticalScale(5),
  },
  containerVoltar: {
    justifyContent: "center",
    padding: verticalScale(10),
    // backgroundColor: Colors.red,
  },
  Preview: {
    flexDirection: "row",
  },
  previewteste: {
    width: scale(320),
    paddingBottom: verticalScale(10),
  },
  nextPreview: {
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.darkgreen,
    marginBottom: scale(10),
  },
  textPreview: {
    ...Fonts.txtLargeBold,
    color: Colors.white,

  },
  containerScrollPreview: {
    height: verticalScale(180),
    marginBottom: verticalScale(-5),
  },
});
export default styles;
