import React, { useState, useContext, useCallback } from "react";

import { useFocusEffect } from "@react-navigation/native";
import getAllEstoque from "../../Realm/getAllEstoque";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { AuthContext } from "../../contexts/auth";

const EstoqueOptions = () => {
  const [value, setValue] = useState(1);
  const [isFocus, setIsFocus] = useState(false);
  const [listaEstoque, setListaEstoque] = useState([]);
  const { fazID } = useContext(AuthContext);
  const data = listaEstoque.map((item, index) => ({
    label: item.nomeProd,
    value: String(index + 1),
  }));
  async function fetchDataEstoque(fazID) {
    const dataEstoque = await getAllEstoque(fazID);
    setListaEstoque(dataEstoque);
  }
  //Chama funcao buscando dados do estoque ao focar em página
  useFocusEffect(
    useCallback(() => {
      fetchDataEstoque(fazID);
    }, [])
  );
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "black" }]}>
          Selecione o produto
        </Text>
      );
    }
    return null;
  };
  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={"Clique aqui"}
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
export default EstoqueOptions;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
