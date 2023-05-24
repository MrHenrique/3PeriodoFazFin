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
  const imgbg1 = "../../../assets/bg4.jpg";
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgbg}
        source={require(imgbg1)}
        imageStyle={{ opacity: 0.6 }}
      >
        <View style={styles.containergeral}>
          <View style={styles.containerlogo}>
            <Image
              style={styles.logo}
              source={require("../../../assets/FazFin.png")}
            />
          </View>

          <View style={styles.viewtext}>
            <Text style={styles.texto}>Selecionar rebanho</Text>
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
              onPress={() => {
                FazendaID(""),
                  RebanhoID(""),
                  navigation.navigate("SelectFazPage");
              }}
            >
              <Text style={styles.tituloBotao}>{"Voltar"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={CanContinue(rebID)}
              style={DisabledStyle(rebID)}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.tituloBotao}>{"Continuar"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
export default SelectRebPage;
