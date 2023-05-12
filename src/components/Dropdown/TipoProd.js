import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { AuthContext } from "../../contexts/auth";
import { Buttons, Colors, Fonts } from "../../styles";

const data = [
  { label: "Farmácia", value: "1" },
  { label: "Alimentos", value: "2" },
];
const DropdownComponent = () => {
  const { TipoProd } = useContext(AuthContext);
  const [value, setValue] = useState(1);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    var tipoProduto = value;
    TipoProd(tipoProduto);
  }, [value, TipoProd]);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: Colors.grey }]}>
          Selecione o tipo de produto
        </Text>
      );
    }
    return null;
  };
  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "black" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        itemContainerStyle={styles.itemContainerStyle}
        itemTextStyle={styles.itemTextStyle}
        activeColor={Colors.green}
        iconColor={"white"}
        data={data}
        maxHeight={400}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Farmácia" : "Farmácia"}
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
export default DropdownComponent;
const styles = StyleSheet.create({
  itemContainerStyle: {
    backgroundColor: Colors.darkgreen,
  },
  itemTextStyle: {
    color: Colors.white,
  },
  container: {
    backgroundColor: Colors.green,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  dropdown: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 0.8,
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
