import React, { useState, useContext, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import getAllReb from "../../Realm/getAllReb";
import { scale, verticalScale } from "react-native-size-matters";
import Select from "../../components/Select";
import { AuthContext } from "../../contexts/auth";
import styles from "./styles";
function SelectRebPage({ navigation }) {
  const [listaReb, setListaReb] = useState([]);

  async function fetchDataReb(fazID) {
    const data = await getAllReb(fazID);
    setListaReb(data);
    data.addListener((values) => {
      setListaReb([...values]);
    });
  }

  useFocusEffect(
    useCallback(() => {
      fetchDataReb(fazID);
    }, [])
  );

  const { precoCF, fazID, rebID, precoLeite } = useContext(AuthContext);

  function CanContinue(rebID) {
    if (typeof rebID == "undefined" || rebID == "") {
      const CanContinue = true;
      return CanContinue;
    } else {
      const CanContinue = false;
      return CanContinue;
    }
  }
  function DisabledStyle(rebID) {
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
              onPress={() => navigation.navigate("SelectFazPage")}
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
