import { StyleSheet } from "react-native";
import { Buttons, Colors, Fonts, TextInput } from "../../../styles";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  modalContainerSearch: {
    flex: 1,
  },
  modalListContainer: { flex: 6 },
  modalVoltarContainer: {
    flex: 0.6,
    justifyContent: "flex-end",
    marginBottom: verticalScale(10),
  },
  scroll: { flex: 1, paddingVertical: verticalScale(10) },
  containerSelecionarAnimal: {
    flex: 1,
    margin: scale(20),
  },
  scrollcontainer: { flex: 1 },
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
  botaopressM: {
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    justifyContent: "center",
  },
  search: {
    backgroundColor: Colors.white,
    width: "90%",
    fontSize: scale(15),
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: verticalScale(5),
  },
  filtroNome: {
    backgroundColor: Colors.green,
    borderRadius: 20,
    width: scale(140),
    height: verticalScale(30),
    margin: verticalScale(5),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  TituloM: {
    justifyContent: "center",
    alignSelf: "center",
    color: Colors.white,
    fontSize: verticalScale(30),
    fontWeight: "bold",
  },
  tituloBotao: {
    ...Fonts.txtMediumBold,
    color: Colors.white,
  },
  botaoselecionaranimal: {
    flex: 1,
    marginBottom: verticalScale(10),
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    flexDirection: "row",
    justifyContent: "space-evenly",
    elevation: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.darkgreen,
    alignSelf: "center",
    width: scale(330),
    borderRadius: 20,
  },
  RadioTextStyle: {
    ...Fonts.txtMedium,
    color: Colors.white,
    justifyContent: "space-around",
  },
  RadioTextStyle: {
    ...Fonts.txtMedium,
    color: Colors.white,
    justifyContent: "space-around",
  },
  radioBView: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
  },
  ContainerScrollStyle: {
    marginVertical: verticalScale(10),
  },
  containerkeyboard: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: Colors.red,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.darkgreen,
  },
  containergeral: {
    flex: 1,
    margin: scale(15),
    borderRadius: 10,
    backgroundColor: Colors.darkgreen,
  },
  containerbutao: {
    flex: 0.2,
    flexDirection: "column",
    justifyContent: "flex-end",
    minHeight: scale(10),
  },
  containerbutaoKeyboardOn: {
    flex: 0.3,
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingTop: verticalScale(10),
    minHeight: scale(100),
  },
  containerCadastroOutras: {
    flex: 1,
    marginVertical: verticalScale(10),
    marginHorizontal: scale(10),
    flexDirection: "column",
    borderRadius: 10,
  },
  containerOutrasDespesas: {
    flex: 1,
    marginVertical: verticalScale(20),
    justifyContent: "center",
  },
  //Textos
  txtDescricao: {
    ...Fonts.txtLarge,
    color: Colors.white,
  },
  txtBotao: {
    ...Fonts.txtMedium,
    color: Colors.white,
  },
  //botôes
  botao: {
    flex: 1,
    marginBottom: verticalScale(10),
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    justifyContent: "center",
  },
  //Textinput
  txtInput: {
    backgroundColor: Colors.white,
  },
});

export default styles;
