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
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useMainContext } from "../../contexts/RealmContext";
function SelectFazPage() {
  const realm = useMainContext();
  const navigation = useNavigation();
  const [listaFaz, setListaFaz] = useState([]);
  const { fazID } = useContext(AuthContext);
  useEffect(() => {
    if (realm) {
      let data = realm.objects("Farm").sorted("nomefaz");
      setListaFaz(data);
      data.sorted("nomefaz").addListener((values) => {
        setListaFaz([...values]);
      });
    }
    CanContinue(fazID);
  }, [realm, fazID]);
  useEffect(() => {
    CanContinue();
  }, [fazID]);
  function CanContinue() {
    if (typeof fazID == "undefined" || fazID == "") {
      const CanContinue = true;
      return CanContinue;
    } else {
      const CanContinue = false;
      return CanContinue;
    }
  }
  function DisabledStyle() {
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
      <View style={styles.containerlogin}>
        <Image
          style={styles.logo}
          source={require("../../../assets/FazFin.png")}
        />
        <Text style={styles.title}>Bem-vindo(a)</Text>
        <View style={styles.select}>
          <Text style={styles.subtitle}>Selecione sua fazenda:</Text>
          <SelectFaz
            touchableText="Selecione sua fazenda"
            title="Fazendas"
            objKey="_id"
            objValue="nomefaz"
            data={listaFaz}
          />
        </View>
        <View style={styles.containerbotoes2}>
          <TouchableOpacity
            style={styles.botaopress3}
            onPress={() => navigation.navigate("CadastroFaz")}
          >
            <Text style={styles.tituloBotao}>{"Cadastrar fazenda"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerbotoes}>
          <TouchableOpacity
            style={styles.botaopress}
            onPress={() => navigation.navigate("LoginPage")}
          >
            <Text style={styles.tituloBotao}>{"Voltar"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={CanContinue(fazID)}
            style={DisabledStyle(fazID)}
            onPress={() => navigation.navigate("SelectRebPage")}
          >
            <Text style={styles.tituloBotao}>{"Continuar"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SelectFazPage;
