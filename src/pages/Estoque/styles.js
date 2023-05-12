import { Button, StyleSheet } from "react-native";
import { Buttons, Colors, Fonts, TextInput } from "../../styles";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  tab: {
    maxHeight: verticalScale(40),
    backgroundColor: Colors.green,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.darkgreen,
  },
  containergeral: {
    flex: 1,
    margin: scale(15),
    backgroundColor: Colors.green,
  },
  containerInput: {
    flex: 1,
    justifyContent: 'center',
  },
  containerInputTitulo: {
    flex: 0.45,
  },
  fontTitulo:{
    ...Fonts.txtXLargeBold,
    color: Colors.white,
  },
  font: {
    color: Colors.white,
    ...Fonts.txtLargeBold,
  },
  textInput: {
    ...TextInput.TextInputLargeRounded,
    alignSelf: "center",
    backgroundColor: Colors.white,
    color: Colors.black,
    fontWeight: "bold",
    fontSize: 15,
  },
  textInputQtd: {
    backgroundColor: Colors.green,
    paddingHorizontal: verticalScale(10),
    textAlign: "center",
    color: Colors.white,
    ...Fonts.txtLargeBold,
  },
  botao: {
    flex: 1,
    maxHeight: 40,
    marginBottom: verticalScale(10),
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.btndarkgreen,
    justifyContent: "center",
  },
  containerMaisMenos: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  button: {
    backgroundColor: "lightgray",
    width: scale(30),
    height: verticalScale(30),
    borderRadius: 4,
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  containerButao: {
    // backgroundColor: Colors.red,
    flex: 1.5,
    flexDirection: "column",
    justifyContent: "flex-end",
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
