import React, {
    useState,
    useContext,
    useFocusEffect,
    useCallback,
    useEffect,
  } from "react";
  import { StyleSheet, Text, View } from "react-native";
  import { Dropdown } from "react-native-element-dropdown";
  import { scale, verticalScale } from "react-native-size-matters";
  import { AuthContext } from "../../contexts/auth";

  const data = [
    { label: "Janeiro", value: "1" },
    { label: "Fevereiro", value: "2" },
    { label: "Março", value: "3" },
    { label: "Abril", value: "4" },
    { label: "Maio", value: "5" },
    { label: "Junho", value: "6" },
    { label: "Julho", value: "7" },
    { label: "Agosto", value: "8" },
    { label: "Setembro", value: "9" },
    { label: "Outubro", value: "10" },
    { label: "Novembro", value: "11" },
    { label: "Dezembro", value: "12" },
  ];
  const DropdownComponentMes = () => {
    const { FiltroMes } = useContext(AuthContext);
    const [value, setValue] = useState(1);
    const [isFocus, setIsFocus] = useState(false);
    var mesEscolhido = value;
    FiltroMes(mesEscolhido);
    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: "black" }]}>
            Selecione o Mês:
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
          placeholder={!isFocus ? "Selecione o Mês" : "Selecione o Mês"}
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
  export default DropdownComponentMes;
  const styles = StyleSheet.create({
    container: {
        width: scale(300),
        height: verticalScale(120),
        justifyContent: 'center',
        alignSelf: 'center',
      borderRadius: 20,  
      backgroundColor: "#C0C0C0",
      padding: 30,
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
  