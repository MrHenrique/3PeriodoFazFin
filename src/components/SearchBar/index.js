import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { scale, verticalScale } from "react-native-size-matters";
import { TextInput } from "react-native-gesture-handler";
const windowWidth = Dimensions.get('window').width;


function SearchBar ({setChange}) {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
    {/*Botao Drawer*/}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.openDrawer()}
      >
        <Feather name="menu" size={verticalScale(30)} color="#FFF" />
      </TouchableOpacity>
    {/*Barra de pesquisa*/}
      <TextInput
        placeholder="Pesquisar"
        placeholderTextColor="#f2f2f2"
        style={styles.statusbar}
        cursorColor="#fff"
        onChangeText={e => setChange(e)}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: windowWidth,
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
  statusbar: {
    backgroundColor: "#f2f2f2",
    width: scale(250),
    height: verticalScale(40),
    borderWidth: 2,
    borderRadius: scale(10),
    paddingLeft: scale(10),
  },
  clearsearch: {
    height: verticalScale(30),
    justifyContent: "center",
    paddingLeft: scale(5),
  },
});
export default SearchBar;
