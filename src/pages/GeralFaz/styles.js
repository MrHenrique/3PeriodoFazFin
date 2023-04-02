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
    justifyContent: "space-around",
  },
  containercadastrarreb: {
    flex: 1.2,
    marginTop: scale(-50),
  },
  geralfaz: {
    flex: 1.8,
  },
  viewtext: {
    flex: 1,
    alignSelf: "center",
    marginTop: scale(-75),
  },
  imgbg: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
  },

  bolareceita: {
    width: scale(10),
    height: scale(10),
    borderRadius: 50,
    backgroundColor: Colors.neongreen,
    marginEnd: scale(5),
  },

  boladespesa: {
    width: scale(10),
    height: scale(10),
    borderRadius: 50,
    backgroundColor: Colors.red,
    marginEnd: scale(5),
  },

  bannerButton: {
    flex: 0.7,
    backgroundColor: Colors.btngreen,
    justifyContent: "center",
    borderRadius: 10,
  },

  bannerText: {
    color: Colors.grey,
    ...Fonts.txtMedium,
    alignSelf: "center",
  },

  textoBannerCat: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexDirection: "row",
    overflow: "hidden",
  },

  textoBannerTitulo: {
    ...Fonts.txtLargeBold,
    color: Colors.white,
    paddingBottom: verticalScale(20),
  },

  textoBanner: {
    color: Colors.white,
    ...Fonts.txtMedium,
  },

  textoBannerRec: {
    ...Fonts.txtLarge,
    color: Colors.white,
  },

  textoBannerDes: {
    ...Fonts.txtLarge,
    color: Colors.white,
  },

  containerGeralFinan: {
    marginLeft: scale(40),
    marginRight: scale(40),
  },

  textoBannerRes: {
    color: Colors.grey,
    ...Fonts.txtSmall,
    position: "absolute",
    top: verticalScale(-10),
    left: scale(0),
  },

  textResultsPrice: {
    color: Colors.white,
    textAlign: "center",
    alignSelf: "center",
  },

  textoRS: {
    ...Fonts.txtXLarge,
    color: Colors.white,
  },

  containerSaldoTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    width: "100%",
    overflow: "hidden",
  },

  botaoPress3: {
    flex: 0.3,
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.btngreen,
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
    ...Buttons.btnLargeRounded,
    backgroundColor: Colors.btngreen,
    alignItems: "center",
    marginTop: verticalScale(10),
  },

  tituloBotao: {
    ...Fonts.txtMediumBold,
    color: Colors.white,
  },

  texto: {
    ...Fonts.txtLargeBold,
    color: Colors.white,
  },

  containerbotoes: {
    flex: 1,
    padding: verticalScale(10),
    flexDirection: "column-reverse",
  },
});
export default styles;

export function Color(total) {
  let color;
  if (total > 0) {
    color = Colors.neongreen;
    return color;
  } else if (total < 0) {
    color = Colors.red;
    return color;
  } else {
    color = Colors.white;
    return color;
  }
}
