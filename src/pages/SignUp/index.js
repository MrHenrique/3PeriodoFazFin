import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { TextInput } from "react-native-gesture-handler";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
function SignUp() {
  const navigation = useNavigation();
  const VALID_EMAIL_EXPRESSION =
    /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  const [nomeProp, setNomeProp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const imgbg1 = "../../../assets/background7.jpg";

  function handleUserRegister() {
    if (nomeProp === "") {
      return Alert.alert("Informe o nome");
    }
    if (email === "") {
      return Alert.alert("Informe o email");
    }
    if (!VALID_EMAIL_EXPRESSION.test(email.toLowerCase())) {
      return Alert.alert("E-mail inválido");
    }
    if (password === "") {
      return Alert.alert("Informe a senha");
    }
    if (password.trim().length < 6) {
      return Alert.alert("A senha deve ter ao menos 6 dígitos");
    }
    if (password.trim() !== passwordConfirm.trim()) {
      return Alert.alert("As senhas nao conferem");
    }

    Alert.alert("Cadastrado com sucesso");
    navigation.navigate("SelectFazPage");
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgbg}>
        <View style={styles.containergeral}>
          <Image
            style={styles.logo}
            source={require("../../../assets/FazFin.png")}
          />
          <Text style={styles.title}>Bem-vindo(a)</Text>
          <Text style={styles.texto}>Digite o seu nome</Text>
          <TextInput
            style={styles.campoTexto}
            inputMode="text"
            onChangeText={setNomeProp}
            value={nomeProp}
            placeholder="Nome"
            placeholderTextColor={"#d9d9d9"}
          />
          <Text style={styles.texto}>Digite seu email</Text>
          <TextInput
            style={styles.campoTexto}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            inputMode="text"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={"#d9d9d9"}
          />
          <Text style={styles.texto}>Digite a senha</Text>
          <TextInput
            style={styles.campoTexto}
            inputMode="text"
            placeholder="Senha"
            autoCapitalize="none"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            placeholderTextColor={"#d9d9d9"}
          />
          <Text style={styles.texto}>Confirme a senha</Text>
          <TextInput
            style={styles.campoTexto}
            placeholder="Confirme sua senha"
            inputMode="text"
            autoCapitalize="none"
            onChangeText={setPasswordConfirm}
            value={passwordConfirm}
            secureTextEntry
            placeholderTextColor={"#d9d9d9"}
          />
          <View style={styles.containerbotoes}>
            <TouchableOpacity
              style={styles.botaopress2}
              onPress={() => navigation.navigate("LoginPage")}
            >
              <Text style={styles.tituloBotao}>{"Voltar"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaopress}
              onPress={handleUserRegister}
            >
              <Text style={styles.tituloBotao}>{"Cadastrar"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default SignUp;
