import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Image,
} from "react-native";
import Select from "../../components/Select";
import { AuthContext } from "../../contexts/auth";
import styles from "./styles";
import { useMainContext } from "../../contexts/RealmContext";
import { MaterialIcons } from "@expo/vector-icons";
import { scale } from "react-native-size-matters";

function SelectRebPage({ navigation }) {
  const realm = useMainContext();
  const [listaReb, setListaReb] = useState([]);
  useEffect(() => {
    if (realm) {
      let data = realm.objectForPrimaryKey("Farm", fazID);
      setListaReb(data.rebanhos);
      data.rebanhos.sorted("nomeReb").addListener((values) => {
        setListaReb([...values]);
      });
    }
  }, [realm]);
  useEffect(() => {
    CanContinue();
  }, [rebID]);
  const { fazID, rebID, FazendaID, RebanhoID } = useContext(AuthContext);
  function backAndClear() {
    RebanhoID("");
    FazendaID("");
    navigation.reset({
      index: 1,
      routes: [{ name: "SelectFazPage" }],
    });
  }
  function CanContinue() {
    if (typeof rebID == "undefined" || rebID == "") {
      const CanContinue = true;
      return CanContinue;
    } else {
      const CanContinue = false;
      return CanContinue;
    }
  }
  function DisabledStyle() {
    if (typeof rebID == "undefined" || rebID == "") {
      const Style = styles.botaopress4;
      return Style;
    } else {
      const Style = styles.botaopress;
      return Style;
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containergeral}>
        <View style={styles.containerlogo}>
          <Image
            style={styles.logo}
            source={require("../../../assets/FazFin.png")}
          />
        </View>

        <View style={styles.viewtext}>
          <Text style={styles.texto}>Selecionar o rebanho</Text>
          <Select
            touchableText="Selecione seu rebanho"
            title="Rebanhos"
            objKey="_id"
            objValue="nomeReb"
            data={listaReb}
          />
        </View>

        <View style={styles.containercadastrarreb}>
          <TouchableOpacity
            style={styles.botaoPress3}
            onPress={() => navigation.navigate("CadastroReb")}
          >
            <Text style={styles.tituloBotao2}>{"Cadastrar rebanhos"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerbotoes}>
          <TouchableOpacity
            style={styles.botaopress2}
            onPress={() => backAndClear()}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={styles.tituloBotao}>{"Voltar"}</Text>
            </View>
            <MaterialIcons name="arrow-back" size={scale(24)} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={CanContinue(rebID)}
            style={DisabledStyle(rebID)}
            onPress={() => navigation.navigate("Home")}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={styles.tituloBotao}>{"Continuar"}</Text>
            </View>
            <MaterialIcons
              name="arrow-forward"
              size={scale(24)}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default SelectRebPage;
