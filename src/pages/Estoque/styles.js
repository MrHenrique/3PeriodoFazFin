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
    justifyContent: "center",
  },
  containerInputTitulo: {
    flex: 0.45,
  },
  fontTitulo: {
    ...Fonts.txtXLargeBold,
    marginVertical: verticalScale(5),
  },
  font: {
    color: Colors.white,
    ...Fonts.txtLargeBold,
  },
  fontsubtitulo: {
    color: Colors.grey,
    ...Fonts.txtMediumBold,
  },
  fontblk: {
    color: Colors.black,
    ...Fonts.txtLargeBold,
  },
  fontcontainerlistitem: {
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
    paddingHorizontal: verticalScale(45),
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
    flex: 1.5,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  error: {
    backgroundColor: "#ff0000",
    marginBottom: 10,
    borderRadius: 20,
    padding: verticalScale(2),
    alignSelf: "center",
    color: "yellow",
  },
  campoTextoErro: {
    ...Fonts.txtMediumBold,
    ...TextInput.TextInputLargeRounded,
    backgroundColor: Colors.white,
    color: Colors.black,
    borderWidth: 2,
    borderColor: Colors.red,
  containerlist: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    overflow: "scroll",
    alignContent: "center",
    marginHorizontal: scale(7),
  },
  modalContainer: {
    borderColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1.25,
    flex: 1,
    justifyContent: "center",
    height: verticalScale(140),
  },
  listcontainerstyle: {
    flex: 1,
    width: "100%",
  },
  listcontainerstyleMargin: {
    flex: 1,
    width: "100%",
    marginBottom: scale(-5),
  },
  containerItem: {
    flex: 1,
    margin: scale(5),
    borderRadius: 10,
    backgroundColor: Colors.darkgreenTransparent,
  },
  containerText: {
    flex: 1,
    ...Fonts.txtLargeBold,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  font: {
    ...Fonts.txtLarge,
    color: Colors.white,
  },
  Text: {
    ...Fonts.txtLargeBold,
    color: Colors.white,
  },
  iconArrow: {
    alignSelf: "center",
  },
  iconArrowvirado: {
    alignSelf: "center",
    transform: [{ rotate: "180deg" }],
  },
  containerValor: {
    backgroundColor: Colors.darkgreen,
    margin: scale(10),
    borderRadius: 10,
    flex: 0.5,
    padding: scale(10),
  },
  containerlista: {
    flex: 4,
  },
  relatorioCadastro: {
    flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "space-evenly",
  },
  containershouldshow: {
    flex: 10,
    margin: scale(5),
  },
  botaorelatorioproduto: {
    backgroundColor: Colors.grey,
    ...Buttons.btnSmallRounded,
    width: scale(140),
    height: "100%",
    justifyContent: "center",
  },
  disabled: {
    opacity: 1,
  },
  ListItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    borderStyle: "dashed",
  },
  containerItems: {
    backgroundColor: Colors.btndarkgreen,
    marginHorizontal: scale(5),
  },
  fontvalortotal: {
    paddingTop: scale(5),
    color: Colors.neongreen,
    ...Fonts.txtLargeBold,
    alignSelf: "center",
  },
  containerImg: {
    padding: scale(20),
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
