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
        <Feather name="menu" size={verticalScale(30)} color="#FFF" />
      </TouchableOpacity>
      <Text style={styles.title}>{header}</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    height: verticalScale(50),
    paddingLeft: scale(5),
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  menuButton: {
    height: verticalScale(30),
    paddingLeft: scale(5),
  },
  title: {
    color: "#FFF",
    fontSize: verticalScale(22),
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    paddingLeft: scale(5),
  },
});
export default Header;
