import { StyleSheet } from "react-native";
import { Buttons, Colors, Fonts, TextInput } from "../../../styles";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  ContainerScrollStyle: {
    paddingVertical: verticalScale(15),
    
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