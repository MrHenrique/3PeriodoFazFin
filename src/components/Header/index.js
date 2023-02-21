import React from "react";
import { Feather } from "@expo/vector-icons";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { scale, verticalScale } from "react-native-size-matters";
function Header({ title }) {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.openDrawer()}
      >
        <Feather name="menu" size={verticalScale(30)} color="#FFF" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    height: verticalScale(50),
    paddingLeft: scale(10),
  },
  menuButton: {
    height: verticalScale(30),
    justifyContent: "center",
    paddingLeft: scale(15),
  },
  title: {
    color: "#FFF",
    fontSize: verticalScale(25),
    fontWeight: "bold",
  },
});
export default Header;
