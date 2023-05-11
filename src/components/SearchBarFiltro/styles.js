import { Button, StyleSheet, Dimensions } from "react-native";
import { Buttons, Colors, Fonts, TextInput } from "../../styles";
import { scale, verticalScale } from "react-native-size-matters";

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  containerBotoes: {
    flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    // backgroundColor: Colors.red,
  },
  containerTxtInput: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  containergeral: {
    flex: 1,
  },
  statusbar: {
    backgroundColor: "#f2f2f2",
    Color: Colors.black,
    ...TextInput.TextInputLargeRounded,
    ...Fonts.txtLargeBold,
    paddingHorizontal: scale(20),
  },
  botao: {
    paddingHorizontal: scale(20),
    flexDirection: "row",
    justifyContent: "space-evenly",
    ...Buttons.btnMediumLessRounded,
    backgroundColor: Colors.green,
    // justifyContent: "center",
  },
  TextoBotao: {
    ...Fonts.txtLargeBold,
    color: Colors.white,
    alignSelf: "center",
  },
  containerImg: {
    paddingTop: scale(4),
    justifyContent: "center",
    // backgroundColor: Colors.black,
  },
});
export default styles;
