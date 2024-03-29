import React, { useState, useContext, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/core";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  SafeAreaView,
  View,
  Dimensions,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { Colors } from "../../styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { AuthContext } from "../../contexts/auth";
const Touchable = (
  text = "Selecione sua fazenda",
  onPress,
  selected,
  objValue
) => {
  const TouchableComponent = () => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.touchableContainer}>
        <Text style={styles.touchableText}>
          {selected === null ? text : selected?.[objValue]}
        </Text>
        <MaterialCommunityIcons
          name="chevron-right"
          color="white"
          size={verticalScale(30)}
        />
      </TouchableOpacity>
    );
  };
  return { TouchableComponent };
};

const Option = (item, value, selected, objKey, onPress) => {
  const OptionComponent = () => {
    return (
      <TouchableOpacity
        style={[
          styles.optionContainer,
          {
            backgroundColor:
              selected?.[objKey] === item?.[objKey]
                ? Colors.darkgreen
                : Colors.green,
          },
        ]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.optionText,
            {
              fontWeight:
                selected?.[objKey] === item?.[objKey] ? "bold" : "normal",
            },
          ]}
        >
          {item?.[value]}
        </Text>
        {selected?.[objKey] === item?.[objKey] ? (
          <MaterialCommunityIcons
            name="check"
            size={verticalScale(30)}
            color="white"
          />
        ) : null}
      </TouchableOpacity>
    );
  };
  return { OptionComponent };
};

const Select = ({
  touchableComponent = Touchable,
  optionComponent = Option,
  touchableText = "Select",
  title = "",
  data = [],
  objKey = "",
  objValue = "",
}) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    if (rebID === "" || rebID === undefined) {
      RebanhoID("");
      setSelected(null);
    }
  }, [rebID]);
  const { TouchableComponent } = touchableComponent(
    touchableText,
    () => setVisible(true),
    selected,
    objValue
  );
  function renderOption(item) {
    const { OptionComponent } = optionComponent(
      item,
      objValue,
      selected,
      objKey,
      () => toggleSelect(item)
    );
    return <OptionComponent />;
  }
  function toggleSelect(item) {
    if (item?.[objKey] === selected?.[objKey]) {
      setSelected(null);
      var Rebid = "";
      RebanhoID(Rebid);
    } else {
      setSelected(item);
      setVisible(false);
      if (typeof item._id !== "undefined") {
        var Rebid = item._id;
        RebanhoID(Rebid);
      }
    }
  }
  const { RebanhoID, rebID } = useContext(AuthContext);
  return (
    <>
      <TouchableComponent />
      <Modal visible={visible} animationType="fade">
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <MaterialCommunityIcons
                name="close"
                size={verticalScale(30)}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <FlatList
            style={styles.liststyle}
            data={data}
            keyExtractor={(_, index) => String(index)}
            renderItem={({ item }) => renderOption(item)}
          />
        </SafeAreaView>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  liststyle: {
    backgroundColor: Colors.green,
  },
  touchableContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: verticalScale(40),
    borderBottomColor: Colors.white,
    borderBottomWidth: verticalScale(2),
    width: scale(300),
  },
  touchableText: {
    color: "white",
    fontSize: verticalScale(16),
    fontWeight: "bold",
  },
  header: {
    height: verticalScale(50),
    backgroundColor: Colors.darkgreen,
    borderBottomColor: Colors.white,
    borderBottomWidth: verticalScale(1),
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: verticalScale(25),
    fontWeight: "bold",
    color: "white",
    paddingLeft: scale(20),
  },
  optionContainer: {
    backgroundColor: Colors.green,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(20),
    borderBottomColor: Colors.black,
    borderBottomWidth: verticalScale(1),
  },
  optionText: {
    color: "white",
    fontSize: verticalScale(20),
  },
});
export default Select;
