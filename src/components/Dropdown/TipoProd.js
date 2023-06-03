import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { AuthContext } from "../../contexts/auth";
import { Colors, Fonts } from "../../styles";
import { scale, verticalScale } from "react-native-size-matters";
import { AntDesign, Entypo } from "@expo/vector-icons";

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
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign style={styles.icon} color="white" name="check" size={20} />
        )}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "black" }]}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        placeholderStyle={styles.placeholderStyle}
        containerStyle={{
          borderColor: Colors.black,
          backgroundColor: Colors.darkgreen,
        }}
        itemContainerStyle={styles.itemContainerStyle}
        activeColor={Colors.darkgreen}
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
        renderItem={renderItem}
        statusBarIsTranslucent={true}
        renderRightIcon={() => (
          <Entypo
            style={
              isFocus
                ? [styles.icon, { transform: [{ rotate: "180deg" }] }]
                : styles.icon
            }
            color="white"
            name="chevron-thin-down"
            size={24}
          />
        )}
      />
    </View>
  );
};
export default DropdownComponent;
const styles = StyleSheet.create({
  itemContainerStyle: {
    backgroundColor: Colors.green,
  },
  itemTextStyle: {
    color: Colors.white,
  },
  container: {
    backgroundColor: "transparent",
    paddingHorizontal:scale(20),
    paddingVertical: scale(5),
  },
  dropdown: {
    borderBottomColor: Colors.white,
    borderBottomWidth: scale(2),
  },
  icon: {
    marginRight: scale(5),
  },
  placeholderStyle: {
    ...Fonts.txtLarge,
    textAlign: "left",
    color: Colors.white,
    fontWeight: "300",
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
  label: {
    color: Colors.white,
    ...Fonts.txtLargeBold,
  },
  item: {
    paddingVertical: scale(16),
    paddingHorizontal: scale(10),
    flexDirection: "row",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: Colors.white,
  },
});
