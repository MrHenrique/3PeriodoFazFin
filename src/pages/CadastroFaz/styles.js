import { StyleSheet } from "react-native";
import { scale , verticalScale } from "react-native-size-matters";
import {  Colors , Fonts , Buttons , TextInput } from "../../styles"

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.Cyan,
    },
    imgbg: {
      flex: 1,
      resizeMode: "cover",
      width: "100%",
    },
    logo: {
      resizeMode: "contain",
      height: verticalScale(120),
      width: verticalScale(120),
      top: verticalScale(30),
      alignSelf: "center",
      justifyContent: "center",
    },
    texto: {
      ...Fonts.txtLarge,
      color: Colors.white,
      alignSelf: "center",
    },
    viewtext: {
      alignSelf: "center",
      top: verticalScale(60),
    },
    campoTexto: {
        ...Fonts.txtSmall,
        ...TextInput.TextInputLargeRounded,
      backgroundColor: Colors.white,
      color: Colors.black,
    },
    botaopress: {
        ...Buttons.btnLargeRounded,
      backgroundColor: Colors.btngreen,
      top: verticalScale(175),
    },
    botaopress2: {
        ...Buttons.btnLargeRounded,
      backgroundColor: Colors.btngreen,
      top: verticalScale(185),
    },
    tituloBotao: {
      ...Fonts.txtMediumBold,
      color: Colors.white,
    },
  });
export default styles;