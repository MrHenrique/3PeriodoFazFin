import { StyleSheet } from "react-native";
import { Buttons, Colors, Fonts } from "../../styles";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  //STYLES COMUM
  lista: {
    flex: 1,
    // backgroundColor: "red",
  },
  containerfiltro: {
    flex: 0.1,
    position: "relative",
    zIndex: 1,
    justifyContent: "center",
  },
  filtrosBotao: {
    maxHeight: scale(40),
    flex: 0.1,
    backgroundColor: Colors.green,
    padding: scale(10),
    width: scale(100),
    flexDirection: "row",
    borderRadius: 20,
    justifyContent: "space-around",
    alignSelf: "center",
    position: "relative",
  },
  tab: {
    backgroundColor: Colors.green,
  },
  //relatorios
  containerbg: {
    backgroundColor: Colors.green,
    marginHorizontal: scale(10),
    padding: scale(10),
    borderRadius: scale(10),
  },
  containerResumo: {
    flex: 1,
    paddingHorizontal: scale(15),
  },
  //pagina DESPESAS
  preGraf2: {
    ...Fonts.txtSmall,
    color: "white",
  },
  preGraf: {
    ...Fonts.txtMedium,
    color: "white",
  },
  container: {
    backgroundColor: Colors.darkgreen,
    flex: 1,
  },
  containergeral: {
    flex: 1,
    margin: scale(15),
    backgroundColor: Colors.green,
    borderRadius: 10,
  },
  containerInfo2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: scale(1),
    borderBottomColor: "white",
  },
  containerInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: scale(2),
    borderBottomColor: "white",
  },
  lineStyle: {
    backgroundColor: Colors.white,
    padding: verticalScale(0.5),
    width: scale(310),
    alignSelf: "center",
    marginBottom: verticalScale(6),
  },
  containerChart: {
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "center",
  },
  Grafico: {
    flex: 2,
    justifyContent: "center",
    maxHeight: verticalScale(190),
  },
  containervoltar: {
    flex: 0.1,
    flexDirection: "column-reverse",
  },
  botaopress: {
    backgroundColor: Colors.darkgreen,
    ...Buttons.btnLargeRounded,
    marginBottom: verticalScale(10),
    elevation: 5,
  },
  exportButton: {
    backgroundColor: Colors.darkgreen,
    ...Buttons.btnSmallRounded,
    elevation: 5,
    padding: 5,
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  containerTituloBotao: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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
    alignSelf: "center",
  },
  textoValorPos: {
    color: Colors.neongreen,
    ...Fonts.txtXLargeBold,
    alignSelf: "center",
  },
  texto2: {
    color: Colors.white,
    fontWeight: "bold",
    ...Fonts.txtMedium,
    alignSelf: "center",
  },
  texto: {
    color: Colors.white,
    fontWeight: "bold",
    ...Fonts.txtLargeBold,
    alignSelf: "center",
  },
  BTN_detalhes: {
    flex: 2,
  },
  //Modal
  modalContainer2: {
    flex: 1,
    backgroundColor: Colors.darkgreen,
    alignSelf: "center",
    width: scale(330),
    maxHeight: verticalScale(240),
    borderRadius: 20,
    position: "relative",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.darkgreen,
    alignSelf: "center",
    width: scale(330),
    borderRadius: 20,
    position: "relative",
  },
  modalScroll: {
    height: verticalScale(500),
    marginVertical: verticalScale(10),
  },
  tituloModal: {
    color: Colors.white,
    margin: verticalScale(5),
    alignSelf: "center",
    ...Fonts.txtXLargeBold,
  },
  botaopressM: {
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    maxHeight: verticalScale(40),
    justifyContent: "center",
    alignSelf: "center",
    elevation: 10,
    margin: verticalScale(5),
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
  containerDetalhes: {
    width: scale(300),
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  modalContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContent: {
    fontSize: 20,
  },
  modalContainerText: {
    width: "100%",
    padding: 5,
  },
  tituloDetalhes: {
    color: "black",
    fontSize: verticalScale(20),
    marginBottom: verticalScale(10),
    textAlign: "center",
    fontWeight: "bold",
  },
  filtros: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    position: "absolute",
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    top: verticalScale(30),
    zIndex: 1,
    top: scale(75),
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
  return fontSize;
}

export const estilo = {
  tabarlabel: {
    color: Colors.white,
    ...Fonts.txtSmall,
  },
  tabBarIndicator: {
    backgroundColor: Colors.white,
  },
};
