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
    marginTop: verticalScale(10),
    paddingHorizontal: scale(80),
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    elevation: 10,
  },
  botaopress2: {
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    marginTop: verticalScale(10),
    paddingHorizontal: scale(80),
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    elevation: 10,
  },
  botaopress3: {
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    flex: 0.3,
  },
  disabledbutton: {
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.green,
    opacity: 0.4,
    paddingHorizontal: scale(80),
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    elevation: 10,
  },
  tituloBotao: {
    ...Fonts.txtLargeBold,
    color: Colors.white,
  },
  select: {
    alignSelf: "center",
    marginVertical: scale(15),
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
    justifyContent: "flex-start",
  },
  containercadastrarfaz: {
    flex: 1.5,
    bottom: 0,
    justifyContent: "center",
  },
  titulocadfaz: {
    ...Fonts.txtMediumBold,
    fontSize: scale(16),
    color: Colors.white,
  },
});
export default styles;
