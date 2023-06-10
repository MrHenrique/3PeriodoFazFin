import { StyleSheet } from "react-native";
import { Colors, Fonts, TextInput } from "../../../styles";
import { verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  tab: {
    maxHeight: verticalScale(40),
    backgroundColor: Colors.green,
  },
});
// estilo tab
export const estilo = {
  tabarlabel: {
    color: Colors.white,
    ...Fonts.txtSmall,
  },
  tabBarIndicator: {
    backgroundColor: Colors.white,
  },
};
export default styles;