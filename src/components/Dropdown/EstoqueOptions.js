import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { AuthContext } from "../../contexts/auth";
import { useMainContext } from "../../contexts/RealmContext";

const EstoqueOptions = () => {
  const realm = useMainContext();
  const [value, setValue] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const [listaEstoque, setListaEstoque] = useState([]);
  const { fazID, IdEstoqueSaida, tipoEstoqueSaida,idEstoqueSaida } = useContext(AuthContext);

  useEffect(() => {
    if (realm) {
      let dataEstoque = realm.objectForPrimaryKey("Farm", fazID);
      setListaEstoque(dataEstoque.atualEstoque.sorted("nomeProd"));
      let filteredDataEstoque;
      if (tipoEstoqueSaida === 1) {
        filteredDataEstoque = dataEstoque.atualEstoque.filter(
          (obj) => obj.pesoProd !== 0
        );
        setValue(1);
        setListaEstoque(filteredDataEstoque);
      } else if (tipoEstoqueSaida === 2) {
        filteredDataEstoque = dataEstoque.atualEstoque.filter(
          (obj) => obj.volumeProd !== 0
        );
        setValue(1);
        setListaEstoque(filteredDataEstoque);
      }
    }
  }, [realm, tipoEstoqueSaida]);
useEffect(()=>{
  if (idEstoqueSaida === "")
  setValue(0)
},[idEstoqueSaida]);
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
