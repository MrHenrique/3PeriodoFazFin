import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import styles from "./styles";
import { TextInput } from "react-native-paper";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../styles";
function SignUp() {
  const navigation = useNavigation();
  const VALID_EMAIL_EXPRESSION =
    /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  const [nomeProp, setNomeProp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [keyboardStatus, setkeyboardStatus] = useState(false);
  const [passwordState, setpasswordState] = useState(true);
  const [passwordConfirmState, setpasswordConfirmState] = useState(true);
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
  // LISTENER DO TECLADO(ATIVADO OU NAO)
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setkeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setkeyboardStatus(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  // RETORNA O ESTILO PARA O BOTAO, decidindo qual estilo, dependendo se o teclado esta ativo ou nao
  function StyleFuncKeyboard() {
    if (keyboardStatus) {
      return styles.containerButaoKeyboardOn;
    } else {
      return styles.containerbotoes;
    }
  }
  //estilo ScrollView
  function StyleScrollViewContainer() {
    if (keyboardStatus) {
      return [styles.ContainerScrollStyle, { paddingBottom: 15 }];
    } else {
      return [styles.ContainerScrollStyle, { flex: 1 }];
    }
  }
  return (
    <KeyboardAvoidingView behavior="undefined" style={styles.containerkeyboard}>
      <SafeAreaView style={styles.container}>
        <View style={styles.imgbg}>
          <View style={styles.containergeral}>
            <ScrollView
              contentContainerStyle={StyleScrollViewContainer()}
              style={{ flex: 1 }}
            >
              <Image
                style={keyboardStatus ? { display: "none" } : styles.logo}
                source={require("../../../assets/FazFin.png")}
              />
              <Text style={styles.title}>Bem-vindo(a)</Text>
              <TextInput
                mode="flat"
                label="Nome"
                activeUnderlineColor={Colors.green}
                textColor={Colors.black}
                placeholder="ex: Diego Alves Pereira"
                inputMode="text"
                style={styles.campoTexto}
                onChangeText={setNomeProp}
                value={nomeProp}
                error={false}
              />
              <TextInput
                mode="flat"
                label="Email"
                activeUnderlineColor={Colors.green}
                textColor={Colors.black}
                style={styles.campoTexto}
                placeholder="ex: seuemail@gmail.com"
                inputMode="text"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <TextInput
              label="Senha"
                right={
                  <TextInput.Icon
                    icon={passwordState ? "eye" : "eye-off"}
                    onPress={() => {
                      setpasswordState(!passwordState);
                    }}
                  />
                }
                secureTextEntry={passwordState}
                style={styles.campoTexto}
                inputMode="text"
                placeholder="Senha"
                autoCapitalize="none"
                onChangeText={setPassword}
                value={password}
                placeholderTextColor={"#d9d9d9"}
              />
              <TextInput
              label="Confirmar"
                right={
                  <TextInput.Icon
                    icon={passwordConfirmState ? "eye" : "eye-off"}
                    onPress={() => {
                      setpasswordConfirmState(!passwordConfirmState);
                    }}
                  />
                }
                secureTextEntry={passwordConfirmState}
                style={styles.campoTexto}
                placeholder="Confirme sua senha"
                inputMode="text"
                autoCapitalize="none"
                onChangeText={setPasswordConfirm}
                value={passwordConfirm}
              />
            </ScrollView>
            <View style={StyleFuncKeyboard()}>
              <TouchableOpacity
                style={styles.botao}
                onPress={() => navigation.navigate("LoginPage")}
              >
                <Text style={styles.tituloBotao}>{"Voltar"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botao}
                onPress={handleUserRegister}
              >
                <Text style={styles.tituloBotao}>{"Cadastrar"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
export default SignUp;
