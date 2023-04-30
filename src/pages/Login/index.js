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
import getAllFarm from "../../Realm/getAllFarm";
import getAllReb from "../../Realm/getAllReb";
import styles from "./styles";

function Login({ navigation }) {
  const [listaFaz, setListaFaz] = useState([]);
  const [listaReb, setListaReb] = useState([]);
  const { FazendaID, RebanhoID, FazendaProp } = useContext(AuthContext);
  const imgbg1 = "../../../assets/background7.jpg";
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const data = await getAllFarm();
      if (isMounted) {
        setListaFaz(data);
        if (data.length === 1) {
          FazendaID(data[0]._id);
          FazendaProp(data[0].proprietario);
          const fazID = data[0]._id;
          const dataReb = await getAllReb(fazID);
          if (isMounted) {
            setListaReb(dataReb);
            if (dataReb.length === 1) {
              RebanhoID(dataReb[0]._id);
            }
          }
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

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
