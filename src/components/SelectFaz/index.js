import React, { useState, useContext, useEffect } from "react";
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
              selected?.[objKey] === item?.[objKey] ? "#0F6D00" : "#004513",
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

const SelectFaz = ({
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
    if (data.length === 1) {
      setSelected(data[0]);
      var Fazid = data[0]._id;
      FazendaID(Fazid);
      var FazProp = data[0].proprietario;
      FazendaProp(FazProp);
      var Rebid = "";
      RebanhoID(Rebid);
      setVisible(false);
    }
  }, [data]);

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
      var Fazid = "";
      var Rebid = "";
      FazendaID(Fazid);
      RebanhoID(Rebid);
    } else {
      setSelected(item);
      setVisible(false);
      if (typeof item._id !== "undefined") {
        var Fazid = item._id;
        FazendaID(Fazid);
        var Rebid = "";
        RebanhoID(Rebid);
        var FazProp = item.proprietario;
        FazendaProp(FazProp);
      }
    }
  }
  const { FazendaID, FazendaProp, RebanhoID } = useContext(AuthContext);
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
    backgroundColor: "#00290C",
  },
  touchableContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: verticalScale(40),
    borderBottomColor: "white",
    borderBottomWidth: verticalScale(1),
    width: scale(300),
  },
  touchableText: {
    color: "white",
    fontSize: verticalScale(16),
    fontWeight: "bold",
  },
  header: {
    height: verticalScale(50),
    backgroundColor: "#004513",
    borderBottomColor: "#00290C",
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
    backgroundColor: "#0F6D00",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(20),
    borderBottomColor: "#00290C",
    borderBottomWidth: verticalScale(1),
  },
  optionText: {
    color: "white",
    fontSize: verticalScale(20),
  },
});
export default SelectFaz;
