import { StyleSheet } from "react-native";
import { Buttons, Colors, Fonts } from "../../styles";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkgreen,
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
    borderColor: Colors.white,
    elevation: 10,
  },
  title: {
    ...Fonts.Title,
    color: Colors.white,
    top: verticalScale(35),
    marginBottom: verticalScale(30),
  },
  subtitle: {
    ...Fonts.txtLarge,
    color: Colors.white,
    alignSelf: "center",
    fontWeight: "500",
  },
  botaopress: {
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    marginBottom: verticalScale(10),
  },
  botaopress2: {
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    flexDirection: "row-reverse",
  },
  botaopress3: {
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
  },
  disabledbutton: {
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    opacity: 0.4,
  },
  tituloBotao: {
    ...Fonts.txtMediumBold,
    color: Colors.white,
  },
  select: {
    alignSelf: "center",
    marginTop: verticalScale(15),
  },
  containerlogin: {
    flex: 1,
    margin: scale(15),
    borderRadius: 10,
    backgroundColor: Colors.darkgreen,
  },
  containerbotoes: {
    flex: 1,
    padding: verticalScale(10),
    flexDirection: "column-reverse",
  },
  containerbotoes2: {
    flex: 1,
    padding: verticalScale(10),
    flexDirection: "column",
  },
});
export default styles;
