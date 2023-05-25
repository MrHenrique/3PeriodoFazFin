import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { AuthContext } from "../../contexts/auth";
import { Buttons, Colors, Fonts } from "../../styles";

const data = [
  { label: "Todas as datas", value: "1" },
  { label: "Hoje", value: "2"},
  { label: "Ultimos 7 dias", value: "3" },
  { label: "Ultimos 30 dias", value: "4" },
  { label: "Ultimo ano", value: "5" },
];
const DropFiltrosData = ({ resetDropdown }) => {
  const { FiltroSelec } = useContext(AuthContext);
  const [value, setValue] = useState(1);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    var filtroSelec = value;
    FiltroSelec(filtroSelec);
  }, [value, FiltroSelec]);

  useEffect(() => {
    if (resetDropdown) {
      setValue(1); // Redefine o valor inicial do dropdown
    }
  }, [resetDropdown]);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "black" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        itemContainerStyle={styles.itemContainerStyle}
        itemTextStyle={styles.itemTextStyle}
        activeColor={Colors.green}
        iconColor={"black"}
        data={data}
        maxHeight={400}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Todas as datas" : "Todas as datas "}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};
export default DropFiltrosData;
const styles = StyleSheet.create({
  itemContainerStyle: {
    backgroundColor: Colors.darkgreen,
  },
  itemTextStyle: {
    color: Colors.white,
  },
  container: {
    //backgroundColor: Colors.green,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  dropdown: {
    borderBottomColor: Colors.black,
    borderBottomWidth: 0.8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    ...Fonts.txtLarge,
    textAlign: "left",
    color: Colors.black,
  },
  selectedTextStyle: {
    ...Fonts.txtLarge,
    textAlign: "left",
    color: Colors.black,
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  label: {
    color: Colors.white,
    ...Fonts.txtLargeBold,
  },
});
