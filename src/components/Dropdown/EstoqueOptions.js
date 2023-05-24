import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { AuthContext } from "../../contexts/auth";
import { useMainContext } from "../../contexts/RealmContext";
import { Buttons, Colors, Fonts, TextInput } from "../../styles";
import { scale, verticalScale } from "react-native-size-matters";

const EstoqueOptions = () => {
  const realm = useMainContext();
  const [value, setValue] = useState(0);
  const [isFocus, setIsFocus] = useState(true);
  const [listaEstoque, setListaEstoque] = useState([]);
  const { fazID, IdEstoqueSaida, tipoEstoqueSaida, idEstoqueSaida } =
    useContext(AuthContext);

  useEffect(() => {
    if (realm) {
      let dataEstoque = realm.objectForPrimaryKey("Farm", fazID);
      setListaEstoque(dataEstoque.atualEstoque.sorted("nomeProd"));
      let filteredDataEstoque;
      if (tipoEstoqueSaida === 1) {
        filteredDataEstoque = dataEstoque.atualEstoque.filter(
          (obj) => obj.pesoProd < 0
        );
        setListaEstoque(filteredDataEstoque);
      } else if (tipoEstoqueSaida === 2) {
        filteredDataEstoque = dataEstoque.atualEstoque.filter(
          (obj) => obj.volumeProd < 0
        );
        setListaEstoque(filteredDataEstoque);
      }
    }
    setValue(0);
  }, [realm, tipoEstoqueSaida]);
  useEffect(() => {
    if (idEstoqueSaida === "") setValue(0);
  }, [idEstoqueSaida]);
  const data = listaEstoque.map((item, index) => ({
    label: item.nomeProd,
    value: String(index + 1),
    _id: item._id,
  }));

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: Colors.white }]}>
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
        valueField="value"
        idField="_id"
        placeholder={"Clique aqui"}
        value={value}
        onFocus={() => setIsFocus(true)}
        onChange={(item) => {
          setValue(item.value);
          IdEstoqueSaida(item._id);
        }}
      />
    </View>
  );
};
export default EstoqueOptions;
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
