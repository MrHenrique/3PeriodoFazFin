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
    maxHeight: 40,
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
