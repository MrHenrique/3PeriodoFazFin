import { Button, StyleSheet } from "react-native";
import { Buttons, Colors, Fonts } from "../../styles";
import { scale, verticalScale } from "react-native-size-matters";

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
  containergeral: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  },

  spinner: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 7,
    borderTopColor: "#f5f5f5",
    borderRightColor: "#f5f5f5",
    borderBottomColor: "#f5f5f5",
    borderLeftColor: "green",
  },
  containercarregando: {
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.btngreen,
    padding: 20,
    borderRadius: 30,
  },
  textcarregando: {
    ...Fonts.txtXLargeBold,
    color: Colors.white,
  },
  tabviewShadow: {
    backgroundColor: Colors.green,
    height: verticalScale(45),
  },
});
export default styles;
