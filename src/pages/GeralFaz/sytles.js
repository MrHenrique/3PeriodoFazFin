import { StyleSheet } from "react-native";
import { Buttons, Colors, Fonts } from "../../styles";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Cyan,
  },
  containergeral: {
    flex: 1,
    margin: scale(15),
  },
  imgbg: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
  },
  bannerButton: {
    borderRadius: 30,
    height: verticalScale(150),
    width: scale(300),
    alignSelf: "center",
    backgroundColor: Colors.btngreen,
    justifyContent: "center",
    marginBottom: verticalScale(35),
  },
  bannerText: {
    color: Colors.grey,
    ...Fonts.txtMedium,
    margin: verticalScale(5),
    alignSelf: "center",
  },
  textoBannerT: {
    textAlign: "center",
    fontSize: scale(15),
  },
  textoBanner: {
    color: Colors.white,
    fontSize: scale(17),
  },
  textoBannerRec: {
    color: "#0FFF50",
    fontSize: scale(17),
  },
  textoBannerDes: {
    color: "#FF3131",
    fontSize: scale(17),
  },
  botaoPress3: {
    borderRadius: 20,
    backgroundColor: Colors.btngreen,
    width: scale(300),
    height: verticalScale(75),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  tituloBotao2: {
    fontSize: scale(16),
    fontWeight: "bold",
    color: Colors.white,
  },
  botaopress: {
    borderRadius: 20,
    backgroundColor: Colors.btngreen,
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  botaopress4: {
    borderRadius: 20,
    backgroundColor: Colors.btngreen,
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    opacity: 0.3,
  },
  botaopress2: {
    borderRadius: 20,
    backgroundColor: Colors.btngreen,
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  tituloBotao: {
    fontSize: verticalScale(14),
    fontWeight: "bold",
    color: Colors.white,
  },
  viewtext: {
    alignSelf: "center",
  },
  texto: {
    fontSize: verticalScale(20),
    color: Colors.white,
    alignSelf: "center",
  },
  containerbotoes: {
    flex: 1,
    padding: verticalScale(10),
    flexDirection: "column-reverse",
  },
});
export default styles;
