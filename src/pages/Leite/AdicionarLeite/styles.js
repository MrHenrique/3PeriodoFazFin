import { StyleSheet } from "react-native";
import { Buttons, Colors, Fonts, TextInput } from "../../../styles";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  modalVoltarContainer: {
    flex: 0.6,
    justifyContent: "flex-end",
    marginBottom: verticalScale(10),
  },
  scroll: { flex: 1, paddingVertical: verticalScale(10) },
  modalListContainer: { flex: 6 },
  modalContainerSearch: {
    flex: 1,
  },
  campoTexto: {
    backgroundColor: Colors.white,
  },
  radioBView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  filtroNome: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    borderRadius: 20,
    width: scale(140),
    height: verticalScale(30),
    margin: verticalScale(5),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  search: {
    backgroundColor: Colors.white,
    width: "90%",
    fontSize: scale(15),
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: verticalScale(5),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.darkgreen,
    alignSelf: "center",
    width: scale(330),
    borderRadius: 20,
  },
  cardVacas: {
    backgroundColor: Colors.green,
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    marginVertical: verticalScale(4),
    position: "relative",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.darkgreen,
  },
  containergeral: {
    flex: 1,
    margin: scale(15),
    backgroundColor: Colors.darkgreen,
    borderRadius: 10,
  },
  contvoltar: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    color: "rgba(15, 109, 0, 0.9)",
    top: verticalScale(625),
  },
  botaovoltar: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    marginVertical: verticalScale(5),
    position: "relative",
    alignSelf: "center",
  },
  botaovoltar2: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    marginVertical: verticalScale(5),
    position: "relative",
    alignSelf: "center",
  },
  botaovoltar3: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    marginVertical: verticalScale(5),
    position: "relative",
    alignSelf: "center",
  },
  textovoltar: {
    ...Fonts.txtLargeBold,
    color: Colors.white,
    paddingLeft: scale(15),
  },
  tituloinfo: {
    color: "white",
    fontSize: verticalScale(20),
    marginBottom: verticalScale(10),
    fontWeight: "bold",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  detalhe: {
    fontSize: verticalScale(20),
    color: "black",
    backgroundColor: "white",
    borderRadius: verticalScale(5),
    marginBottom: verticalScale(20),
    textAlign: "center",
    width: scale(280),
  },
  containerinfos: {
    flex: 1,
    marginBottom: verticalScale(10),
    width: scale(300),
    padding: scale(10),
    borderRadius: 20,
    alignSelf: "center",
  },
  botaoselecionaranimal: {
    flex: 1,
    marginBottom: verticalScale(10),
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: scale(10),
    elevation: 10,
  },
  selecionaranimal: {
    color: "white",
    fontSize: verticalScale(20),
  },
  container2: {
    flex: 1,
    height: verticalScale(100),
    backgroundColor: "white",
  },
  lista2: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    alignSelf: "center",
    marginVertical: verticalScale(5),
    color: "white",
    textAlign: "center",
    fontSize: verticalScale(20),
    fontWeight: "bold",
  },
  container3: {
    height: verticalScale(300),
  },
  botaopressM: {
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    paddingHorizontal: scale(80),
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    elevation: 10,
  },
  tituloBotao: {
    ...Fonts.txtMediumBold,
    color: Colors.white,
  },
  botaopress: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(525),
    position: "absolute",
  },

  botaopress6: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(475),
    position: "absolute",
  },
  TituloM: {
    justifyContent: "center",
    alignSelf: "center",
    color: Colors.white,
    fontSize: verticalScale(30),
    fontWeight: "bold",
  },
  botaopressdisabled: {
    flex: 1.1,
    paddingHorizontal: scale(80),
    marginBottom: verticalScale(10),
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    elevation: 10,
    opacity: 0.2,
  },
  dateComponente: {
    width: 350,
  },
  btndata: {
    backgroundColor: Colors.darkgrey,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  containervoltar: {
    flex: 1,
    flexDirection: "column",
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
  containerScrollView: {
    flex: 5,
  },
  RadioTextStyle: {
    ...Fonts.txtMedium,
    color: Colors.white,
    justifyContent: "space-around",
  },
});
// estilo tab
export const estilo = {
  tabarlabel: {
    color: Colors.white,
    ...Fonts.txtMedium,
  },
  tabBarIndicator: {
    backgroundColor: Colors.white,
  },
};
export default styles;
