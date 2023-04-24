import React, { useState, useContext, useCallback, useEffect } from "react";

import { useFocusEffect } from "@react-navigation/native";
import getAllEstoque from "../../Realm/getAllEstoque";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { AuthContext } from "../../contexts/auth";

const EstoqueOptions = () => {
  const [value, setValue] = useState(1);
  const [isFocus, setIsFocus] = useState(false);
  const [listaEstoque, setListaEstoque] = useState([]);
  const { fazID, IdEstoqueSaida, tipoEstoqueSaida } = useContext(AuthContext);

  const fetchDataEstoque = useCallback(async () => {
    const dataEstoque = await getAllEstoque(fazID);
    let filteredDataEstoque = [];

    if (tipoEstoqueSaida === 1) {
      filteredDataEstoque = dataEstoque.filter((obj) => obj.pesoProd != null);
      setValue(1);
    } else if (tipoEstoqueSaida === 2) {
      filteredDataEstoque = dataEstoque.filter((obj) => obj.volumeProd != null);
      setValue(1);
    }

    setListaEstoque(filteredDataEstoque);
  }, [tipoEstoqueSaida]);

  useEffect(() => {
    fetchDataEstoque();
  }, [fetchDataEstoque]);

  const data = listaEstoque.map((item, index) => ({
    label: item.nomeProd,
    value: String(index + 1),
    _id: item._id,
  }));

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
        idField="_id"
        placeholder={"Clique aqui"}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          IdEstoqueSaida(item._id);
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
