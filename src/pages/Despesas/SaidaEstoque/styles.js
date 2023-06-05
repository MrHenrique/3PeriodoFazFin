import { StyleSheet } from "react-native";
import { Buttons, Colors, Fonts, TextInput } from "../../../styles";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
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
    borderRadius: 20,
    backgroundColor: Colors.green,
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(580),
    position: "absolute",
  },
  search: {
    backgroundColor: Colors.white,
    fontSize: verticalScale(15),
    width: scale(300),
    justifyContent: "center",
    alignSelf: "center",
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
    fontSize: verticalScale(14),
    fontWeight: "bold",
    color: Colors.white,
  },
  botaoselecionaranimal: {
    flex: 0.5,
    marginBottom: verticalScale(10),
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    justifyContent: "center",
    elevation: 10,
  },
  modalContainer: {
    backgroundColor: Colors.darkgreen,
    position: "absolute",
    top: verticalScale(10),
    alignSelf: "center",
    height: verticalScale(550),
    width: scale(330),
    borderRadius: 20,
  },
  RadioTextStyle: {
    ...Fonts.txtMedium,
    color: Colors.white,
    justifyContent: "space-around",
  },
  ContainerScrollStyle: {
    paddingVertical: verticalScale(15),
  },
  radioBView: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
  },
  containerkeyboard: {
    flex: 1,
    justifyContent: "flex-end",
  },
  scrollcontainer: {
    flex: 1,
    // backgroundColor: Colors.black,
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
  containerGeralCadastro: {
    flex: 1.5,
  },
  dropdownContainer: {
    flex: 0.4,
    justifyContent: "center",
  },
  containerTxtInputDespesas: {
    flex: 1,
  },
  containerProduto: {
    flex: 1,
    backgroundColor: Colors.green,
    marginHorizontal: scale(10),
    padding: scale(10),
    marginVertical: verticalScale(10),
    borderRadius: 10,
    elevation: 5,
  },
  checkbox: {
    height: "auto",
    marginVertical: verticalScale(4),
    marginHorizontal: scale(10),
    borderRadius: 10,
    backgroundColor: Colors.darkgreen,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerCheckBox: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: Colors.green,
    borderColor: Colors.green,
    borderRadius: 10,
  },
  containergeralDespesas: {
    flex: 2,
  },
  ctnProduto: {
    flex: 1,
    // backgroundColor: Colors.blue,
  },
  ctntextos: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cadastroDespesas: {
    flex: 2,
    backgroundColor: Colors.green,
    marginHorizontal: scale(10),
    paddingHorizontal: scale(10),
    paddingTop: scale(30),
    borderRadius: 10,
    paddingVertical: verticalScale(10),
    justifyContent: "center",
    marginTop: verticalScale(10),
  },
  titleTxtInput: {
    ...Fonts.txtMedium,
    color: Colors.white,
  },
  txtInput: {
    backgroundColor: Colors.white,
  },
  textCheckBox: {
    color: Colors.white,
    fontWeight: "bold",
    ...Fonts.txtLarge,
  },
  textTitulo: {
    ...Fonts.txtLarge,
    color: Colors.white,
  },
  txtProdTitulo: {
    ...Fonts.txtMedium,
    color: Colors.grey,
  },
  txtQtdPreco: {
    ...Fonts.txtMedium,
    color: Colors.white,
  },
  txtBotao: {
    ...Fonts.txtMedium,
    color: Colors.white,
  },
  containerbutao: {
    flex: 0.2,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  containerbutaoKeyboardOn: {
    flex: 0.3,
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingTop: verticalScale(10),
    minHeight: verticalScale(50),
  },
  botao: {
    flex: 1,
    marginBottom: verticalScale(10),
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    justifyContent: "center",
  },
});

export default styles;
