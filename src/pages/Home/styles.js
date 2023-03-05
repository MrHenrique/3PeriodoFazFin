import { StyleSheet } from "react-native";
import { Buttons, Colors, Fonts } from "../../styles";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Cyan,
  },
  imgbg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  logo: {
    resizeMode: "contain",
    height: verticalScale(150),
    width: verticalScale(150),
    top: verticalScale(30),
    alignSelf: "center",
  },
  title: {
    ...Fonts.Title,
    color: Colors.white,
    top: verticalScale(25),
  },
  subtitle: {
    ...Fonts.txtLarge,
    color: Colors.white,
    alignSelf: "center",
  },
  botaopress: {
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(290),
    
  },
  botaopress2: {
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(300),
  },
  disabledbutton: {
    backgroundColor: Colors.darkgreen,
    ...Buttons.btnLargeRounded,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(300),
  },
  tituloBotao: {
    ...Fonts.txtMediumBold,
    color: Colors.white,
  },
  select: {
    top: verticalScale(100),
    alignSelf: "center",
  },
});
export default styles;
