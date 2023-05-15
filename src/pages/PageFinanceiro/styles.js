import { StyleSheet } from "react-native";
import { Buttons, Colors, Fonts } from "../../styles";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  //STYLES COMUM

  //pagina DESPESAS
  preGraf: {
    ...Fonts.txtMedium,
    color: "white",
  },
  container: {
    backgroundColor: Colors.Cyan,
    flex: 1,
  },
  containergeral: {
    flex: 1,
    paddingVertical: scale(10),
    marginBottom: scale(15),
  },
  containerInfo: {
    alignContent: "center",
    alignSelf: "center",
    width: scale(300),
    flexDirection: "row",
    overflow: "hidden",
    justifyContent: "space-between",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    paddingBottom: scale(5),
    paddingTop: scale(5),
  },
  lineStyle: {
    backgroundColor: Colors.white,
    padding: verticalScale(0.5),
    width: scale(310),
    alignSelf: "center",
    marginBottom: verticalScale(6),
  },
  containerChart: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  Grafico: {
    marginVertical: verticalScale(20),
  },
  containervoltar: {
    flex: 1,
    flexDirection: "column-reverse",
  },
  botaopress: {
    backgroundColor: Colors.green,
    ...Buttons.btnLargeRounded,
  },
  tituloBotao: {
    ...Fonts.txtMediumBold,
    color: Colors.white,
  },
  imgbg: {
    flex: 1,
    resizeMode: "cover",
  },
  textoValorNeg: {
    color: Colors.red,
    ...Fonts.txtXLargeBold,
  },
  textoValorPos: {
    color: Colors.neongreen,
    ...Fonts.txtXLargeBold,
  },
  texto: {
    color: Colors.white,
    fontWeight: "bold",
    ...Fonts.txtLargeBold,
    alignSelf: "center",
  },
  BTN_detalhes: {
    flex: 1,
  },
  //Modal
  modalContainer: {
    backgroundColor: "rgba(234,242,215,1)",
    position: "absolute",
    top: verticalScale(0),
    alignSelf: "center",
    width: scale(330),
    borderRadius: 20,
  },
  modalScroll: {
    height: verticalScale(500),
    marginVertical: verticalScale(10),
  },
  tituloModal: {
    color: Colors.btngreen,
    margin: verticalScale(5),
    alignSelf: "center",
    ...Fonts.txtXLargeBold,
  },
  botaopressM: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  listaDet: {
    borderRadius: 20,
    backgroundColor: Colors.green,
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: verticalScale(5),
  },
  listaDet2: {
    borderRadius: 20,
    backgroundColor: Colors.darkgreen,
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: verticalScale(5),
  },
  scroll: {
    height: verticalScale(525),
  },
});
export default styles;

export function Color(total) {
  let color;
  if (total > 0) {
    return styles.textoValorPos;
  } else if (total < 0) {
    return styles.textoValorNeg;
  } else {
    let style = { color: Colors.white, fontWeight: "bold" };
    return style;
  }
}

export function setSize(text, width) {
  var fontSize = width / text.toString().length + 3;
  var maxSize = width / 10;
  fontSize = Math.min(fontSize, maxSize);
  // console.log(fontSize);
  return fontSize;
}