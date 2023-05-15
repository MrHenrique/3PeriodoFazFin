import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { useMainContext } from "../../contexts/RealmContext";

function Login({ navigation }) {
  const realm = useMainContext();
  const { FazendaID, RebanhoID, FazendaProp } = useContext(AuthContext);
  const [listaReb, setListaReb] = useState([]);
  const [listaFaz, setListaFaz] = useState([]);
  const imgbg1 = "../../../assets/background7.jpg";
  useEffect(() => {
    if (realm) {
      let data = realm.objects("Farm").sorted("nomefaz");
      setListaFaz(data);
      if (data.length === 1) {
        FazendaID(data[0]._id);
        FazendaProp(data[0].proprietario);
        const fazID = data[0]._id;
        let dataReb = realm.objectForPrimaryKey("Farm", fazID);
        setListaReb(dataReb.rebanhos);
        if (dataReb.rebanhos.length === 1) {
          RebanhoID(dataReb.rebanhos[0]._id);
        }
      }
    }
  }, [realm]);

  function navigateWhere() {
    if (listaFaz.length === 1 && listaReb.length === 1) {
      return "Home";
    }
    if (listaFaz.length === 1 && listaReb.length != 1) {
      return "SelectRebPage";
    } else {
      return "SelectFazPage";
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgbg}
        source={require(imgbg1)}
        imageStyle={{ opacity: 0.6 }}
      >
        <View style={styles.containerlogin}>
          <Image
            style={styles.logo}
            source={require("../../../assets/FazFin.png")}
          />
          <Text style={styles.title}>Bem-vindo(a)</Text>
          <View style={styles.containerbotoes}>
            <TouchableOpacity
              style={styles.botaopress2}
              onPress={() => navigation.navigate(navigateWhere())}
            >
              <Text style={styles.tituloBotao}>{"Continuar"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default Login;
