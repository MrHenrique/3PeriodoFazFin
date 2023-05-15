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
import { TextInput } from "react-native-gesture-handler";
import { Alert } from "react-native";

function Login({ navigation }) {
  const realm = useMainContext();
  const { FazendaID, RebanhoID, FazendaProp } = useContext(AuthContext);
  const [listaReb, setListaReb] = useState([]);
  const [listaFaz, setListaFaz] = useState([]);
  const VALID_EMAIL_EXPRESSION = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
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
  function handleUserRegistrer(){
  
    if (nomeProp.trim() === ""){
      return Alert.alert("Informe o nome");
    }
    if (email.trim() === ""){
      return Alert.alert("Informe o email");
    }
    if (!(VALID_EMAIL_EXPRESSION).test(email.toLowerCase())){
      return Alert.alert("E-mail inválido");
    }
    if (password.trim() === ""){
      return Alert.alert("Informe a senha");
    }
    if (password.trim().length < 6){
      return Alert.alert("A senha deve ter ao menos 6 dígitos");
    }
   
  
  Alert.alert("Cadastrado com sucesso")
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
          
          <View>
            <Text >Digite seu email</Text>
            <TextInput
              
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              inputMode="text"
              keyboardType="email-address"
              autoCapitalize="none"
              
            />
          </View>
          <View>
            <Text>Digite a senha</Text>
            <TextInput
              
              inputMode="text"
              autoCapitalize="none"
              onChangeText={setPassword}
              value={password}
              secureTextEntry
            />
            
          </View>
          
          <View style={styles.containerbotoes}>
            
          <TouchableOpacity
              style={styles.botaopress2}
              onPress={() => navigation.navigate("SingUp")}
            >
              <Text style={styles.tituloBotao}>{"Clique aqui para cadastrar"}</Text>
              
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaopress2}
              onPress={() => navigation.navigate(navigateWhere())}
            >
              <Text style={styles.tituloBotao}>{"Login"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );

}
export default Login;
