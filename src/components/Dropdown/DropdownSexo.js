import React, { useState, useContext, useEffect,useCallback  } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { AuthContext } from "../../contexts/auth";
import { Colors, Fonts } from "../../styles";
import { scale } from "react-native-size-matters";
import { useFocusEffect } from "@react-navigation/core";

const DropdownSexo = () => {
  const [value, setValue] = useState(2);
  const [isFocus, setIsFocus] = useState(true);
  const { MachoFemea, genero } = useContext(AuthContext);

  const data = [
    { label: "Fêmea", value: 1 },
    { label: "Macho", value: 0 },
  ];

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: Colors.white }]}>
          Gênero
        </Text>
      );
    }
    return null;
  };
  useEffect(() => {
    MachoFemea(value);
  }, [value]);
  useEffect(() => {
    setValue(genero);
  }, [genero]);
  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "black" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        containerStyle={{
          borderColor: Colors.white,
          backgroundColor: Colors.darkgreen,
        }}
        itemContainerStyle={styles.itemContainerStyle}
        itemTextStyle={styles.itemTextStyle}
        activeColor={Colors.green}
        iconColor={"white"}
        data={data}
        maxHeight={300}
        labelField="label"
        statusBarIsTranslucent={true}
        valueField="value"
        placeholder={"Clique aqui"}
        value={value}
        onFocus={() => setIsFocus(true)}
        onChange={(item) => {
          setValue(item.value);
          MachoFemea(item.value);
        }}
      />
    </View>
  );
};
export default DropdownSexo;
const styles = StyleSheet.create({
  itemContainerStyle: {
    backgroundColor: Colors.darkgreen,
  },
  itemTextStyle: {
    color: Colors.white,
  },
  container: {
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  dropdown: {
    borderBottomColor: Colors.white,
    borderBottomWidth: scale(2),
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    ...Fonts.txtLarge,
    textAlign: "left",
    color: Colors.white,
  },
  selectedTextStyle: {
    ...Fonts.txtLarge,
    textAlign: "left",
    color: Colors.white,
    fontWeight: "500",
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
