import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts, Buttons } from "../../../styles";
import { scale, verticalScale } from "react-native-size-matters";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  containergeral: {
    flex: 9,
    margin: scale(15),
    backgroundColor: Colors.darkgreen,
    borderRadius: 10,
  },

  container: {
    flex: 1,
    backgroundColor: Colors.darkgreen,
  },
  botaovoltar: {
    backgroundColor: "rgba(36, 105, 25, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  container2: {
    flex: 2,
    maxHeight: scale(110),
    minHeight: scale(110),
    backgroundColor: Colors.green,
    justifyContent: "center",
    alignItems: "center",
    padding: scale(8),
  },
  menuButton: {
    height: verticalScale(30),
    justifyContent: "center",
    paddingLeft: scale(15),
  },
  statusbar: {
    height: verticalScale(30),
    width: scale(300),
    backgroundColor: Colors.white,
    marginVertical: verticalScale(5),
  },
  containerVacas: {
    flex: 1,
    margin: 5,
    alignItems: "center",
  },
  cardVacas: {
    padding: 15,
    alignItems: "center",
    borderRadius: windowHeight * 0.015,
    width: "90%",
    elevation: 10,
  },
  textVacas: {
    color: "#f2f2f2",
    fontSize: windowWidth * 0.06,
    fontWeight: "bold",
  },
  containermodal: {
    backgroundColor: "#005f1d",
    borderRadius: 5,
    height: "100%",
    padding: 20,
    marginBottom: 11,
  },
  Vacaavatar: {
    backgroundColor: "#00290C",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(15),
  },
  textavatar: {
    fontSize: 24,
    paddingLeft: scale(10),
    color: "white",
  },
  tituloinfo: {
    color: "#c4c4c4ff",
    fontSize: scale(15),
  },
  detalhe: {
    fontSize: scale(20),
    color: "white",
  },
  containerinfos: {
    marginTop: verticalScale(10),
    padding: scale(10),
    backgroundColor: "rgba(15, 109, 0, 0.7)",
    borderRadius: scale(8),
  },
  textovoltar: {
    ...Fonts.txtLargeBold,
    color: Colors.white,
    paddingLeft: scale(15),
  },
  botaoeditar: {
    backgroundColor: "rgba(255, 30, 0, 1)",
    marginTop: verticalScale(10),
    width: scale(280),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  texteditar: {
    fontSize: verticalScale(16),
    color: "white",
  },
  text: {
    fontSize: verticalScale(18),
    textAlign: "center",
    backgroundColor: "#f2f2f2",
  },
  rendimento: {
    fontSize: verticalScale(25),
    textAlign: "center",
  },
  rendimentototal: {
    fontSize: verticalScale(25),
    textAlign: "center",
    color: "#080",
  },
  containerRendimento: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  botao: {
    flex: 1.1,
    paddingHorizontal: scale(80),
    marginBottom: verticalScale(10),
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    elevation: 10,
  },
  containervoltar: {
    flex: 0.11,
    flexDirection: "column-reverse",
    paddingTop: scale(10),
  },
  containerLista: {
    flex: 1,
  },
  btnfiltro: {
    backgroundColor: Colors.darkgreen,
    width: scale(130),
    height: scale(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: scale(20),
  },
  fontBtnFiltro: {
    ...Fonts.txtMedium,
    color: Colors.white,
  },
});

export default styles;
