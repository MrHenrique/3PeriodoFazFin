import React, { useContext } from "react";
import { Feather } from "@expo/vector-icons";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { scale, verticalScale } from "react-native-size-matters";
import { AuthContext } from "../../contexts/auth";
import { Colors,Fonts } from "../../styles";
function Header() {
  const { fazProp } = useContext(AuthContext);
  const proprietario = fazProp.FazProp;
  var header = "Olá," + proprietario;
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.openDrawer()}
      >
        <Feather name="menu" size={verticalScale(30)} color={Colors.white} />
      </TouchableOpacity>
      <Text style={styles.title}>{header}</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.plusdarkgreen,
    height: verticalScale(42),
    paddingLeft: scale(5),
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  menuButton: {
    height: verticalScale(30),
    paddingLeft: scale(5),
  },
  title: {
    color: Colors.white,
    ...Fonts.txtXLargeBold,
    flex: 1,
    paddingLeft: scale(5),
  },
});
export default Header;
