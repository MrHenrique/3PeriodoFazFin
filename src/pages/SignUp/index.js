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
import { TextInput, HelperText, MD3Colors } from "react-native-paper";
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
  const [nomePreenchido, setNomePreenchido] = useState(true);
  const [emailPreenchido, setEmailPreenchido] = useState(true);
  const [emailValido, setEmailValido] = useState(true);
  const [senhaPreenchido, setSenhaPreenchido] = useState(true);
  const [senhaValida, setSenhaValida] = useState(true);
  const [senhasIguais, setSenhasIguais] = useState(true);
  function handleNomePropChange(text) {
    const isValid = text.trim().length > 0;
    setNomePreenchido(isValid);
    setNomeProp(text);
  }
  function handleEmailChange(text) {
    const isValid = text.trim().length > 0;
    setEmailPreenchido(isValid);
    setEmail(text);
    if (!VALID_EMAIL_EXPRESSION.test(text.toLowerCase())) {
      setEmailValido(false);
    } else {
      setEmailValido(true);
    }
  }
  function handleSenhaChange(text) {
    const isValid = text.trim().length > 0;
    setSenhaPreenchido(isValid);
    setPassword(text);
    if (text.trim().length < 6) {
      setSenhaValida(false);
    } else {
      setSenhaValida(true);
    }
  }
  function handleUserRegister() {
    if (
      nomeProp.length === 0 ||
      email.length === 0 ||
      !VALID_EMAIL_EXPRESSION.test(email.toLowerCase()) ||
      password.length === 0 ||
      password.trim() !== passwordConfirm.trim() ||
      password.trim().length < 6
    ) {
      if (nomeProp.length === 0) {
        setNomePreenchido(false);
      }
      if (email.length === 0) {
        setEmailPreenchido(false);
      }
      if (!VALID_EMAIL_EXPRESSION.test(email.toLowerCase())) {
        setEmailValido(false);
      }
      if (password.length === 0) {
        setSenhaPreenchido(false);
      }
      if (password.trim().length < 6) {
        setSenhaValida(false);
      }
      if (password.trim() !== passwordConfirm.trim()) {
        setSenhasIguais(false);
      }
    } else if (
      nomePreenchido &&
      emailPreenchido &&
      emailValido &&
      senhaPreenchido &&
      senhaValida &&
      senhasIguais
    ) {
      //Função de registro no banco aqui
      navigation.navigate("LoginPage");
    }
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
                label="Digite seu nome"
                activeUnderlineColor={Colors.green}
                textColor={Colors.black}
                placeholder="ex: Diego Alves Pereira"
                inputMode="text"
                style={styles.campoTexto}
                onChangeText={handleNomePropChange}
                value={nomeProp}
                error={!nomePreenchido}
              />
              <HelperText
                type="error"
                style={{
                  color: MD3Colors.error60,
                  fontSize: 14,
                  lineHeight: 15,
                }}
                visible={!nomePreenchido}
                padding="20"
              >
                Digite seu nome.
              </HelperText>
              <TextInput
                mode="flat"
                label="Digite seu e-mail"
                activeUnderlineColor={Colors.green}
                textColor={Colors.black}
                style={styles.campoTexto}
                placeholder="ex: seuemail@gmail.com"
                inputMode="text"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={handleEmailChange}
                error={!emailPreenchido}
              />
              <HelperText
                type="error"
                style={{
                  color: MD3Colors.error60,
                  fontSize: 14,
                  lineHeight: 15,
                }}
                visible={!emailPreenchido || !emailValido}
                padding="20"
              >
                {!emailPreenchido
                  ? "Digite o seu e-mail."
                  : "E-mail inválido, digite um e-mail válido."}
              </HelperText>

              <TextInput
                label="Escolha uma senha"
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
                placeholder="Utilize no mínimo 6 caracteres"
                autoCapitalize="none"
                onChangeText={handleSenhaChange}
                value={password}
                placeholderTextColor={"#d9d9d9"}
                error={!senhaPreenchido}
              />
              <HelperText
                type="error"
                style={{
                  color: MD3Colors.error60,
                  fontSize: 14,
                  lineHeight: 15,
                }}
                visible={!senhaPreenchido || !senhaValida}
                padding="20"
              >
                {!senhaPreenchido
                  ? "Digite sua senha."
                  : "Senha possui menos de 6 caracteres, tente novamente."}
              </HelperText>
              <TextInput
                label="Confirme sua senha"
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
                placeholder="Digite novamente a senha escolhida"
                inputMode="text"
                autoCapitalize="none"
                onChangeText={setPasswordConfirm}
                value={passwordConfirm}
                error={!senhasIguais}
              />
              <HelperText
                type="error"
                style={{
                  color: MD3Colors.error60,
                  fontSize: 14,
                  lineHeight: 15,
                }}
                visible={!senhasIguais}
                padding="20"
              >
                Confirmação de senha não confere, tente novamente.
              </HelperText>
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
