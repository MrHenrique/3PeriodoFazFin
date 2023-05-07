import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import SelectFaz from "../../components/SelectFaz";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import getAllFarm from "../../Realm/getAllFarm";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
function SelectFazPage() {
  
  const navigation = useNavigation();
  const [listaFaz, setListaFaz] = useState([]);
  const { fazID } = useContext(AuthContext);
  const imgbg1 = "../../../assets/background7.jpg";
  useEffect(() => {
    (async () => {
      const data = await getAllFarm();
      setListaFaz(data);
      data.addListener((values) => {
        setListaFaz([...values]);
      });
    })();
  }, []);

  function CanContinue(fazID) {
    if (typeof fazID == "undefined" || fazID == "") {
      const CanContinue = true;
      return CanContinue;
    } else {
      const CanContinue = false;
      return CanContinue;
    }
  }
  function DisabledStyle(fazID) {
    if (typeof fazID == "undefined" || fazID == "") {
      const Style = styles.disabledbutton;
      return Style;
    } else {
      const Style = styles.botaopress2;
      return Style;
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
          <View style={styles.select}>
            <Text style={styles.subtitle}>Sua fazenda:</Text>
            <SelectFaz
              touchableText="Selecione sua fazenda"
              title="Fazendas"
              objKey="_id"
              objValue="nomefaz"
              data={listaFaz}
            />
          </View>
          <View style={styles.containerbotoes}>
            <TouchableOpacity
              disabled={CanContinue(fazID)}
              style={DisabledStyle(fazID)}
              onPress={() => navigation.navigate("GeralFaz")}
            >
              <Text style={styles.tituloBotao}>{"Continuar"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaopress}
              onPress={() => navigation.navigate("CadastroFaz")}
            >
              <Text style={styles.tituloBotao}>{"Cadastrar fazenda"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default SelectFazPage;
