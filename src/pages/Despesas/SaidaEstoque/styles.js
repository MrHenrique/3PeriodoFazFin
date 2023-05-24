import { StyleSheet } from "react-native";
import { Buttons, Colors, Fonts, TextInput } from "../../../styles";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
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
    backgroundColor: Colors.green,
  },
  containerGeralCadastro: {
    flex: 1.5,
  },
  dropdownContainer: {
    flex: 0.4,
    justifyContent: "center",
  },
  containerTxtInputDespesas: {},
  containerProduto: {
    flex: 2,
    backgroundColor: Colors.darkgreen,
    marginHorizontal: scale(10),
    paddingHorizontal: scale(10),
    marginBottom: scale(10),
    borderRadius: 10,
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
    backgroundColor: Colors.darkgreen,
    marginHorizontal: scale(10),
    paddingHorizontal: scale(10),
    borderRadius: 10,
    paddingVertical: verticalScale(10),
    justifyContent: "center",
  },
  titleTxtInput: {
    ...Fonts.txtMedium,
    color: Colors.white,
  },
  txtInput: {
    ...Fonts.txtMedium,
    ...TextInput.TextInputLargeRounded,
    width: "100%",
    maxHeight: verticalScale(40),
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
    minHeight: scale(10),
  },
  containerbutaoKeyboardOn:{
    flex: 0.3,
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingTop: verticalScale(10),
    minHeight: scale(100),
  },
  botao: {
    flex: 1,
    maxHeight: 40,
    marginBottom: verticalScale(10),
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.btndarkgreen,
    justifyContent: "center",
  },
});

export default styles;
