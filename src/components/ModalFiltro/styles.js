import { Button, StyleSheet, Dimensions } from "react-native";
import { Buttons, Colors, Fonts, TextInput } from "../../styles";
import { scale, verticalScale } from "react-native-size-matters";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    marginTop: 100,
    maxHeight: 280,
    // backgroundColor: Colors.red,
  },
  container: {
    flex: 1,
    height: verticalScale(180),
    maxHeight: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.darkgreen,
  },
  botao: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.green,
    ...Buttons.btnSmallRounded,
  },
  txtbotao: {
    ...Fonts.txtMediumBold,
    color: Colors.white,
  },
  containervoltar: {
    paddingBottom: verticalScale(3),
    flex:1,
    justifyContent: "flex-end",
    flexDirection: "column",
  },
});
export default styles;
