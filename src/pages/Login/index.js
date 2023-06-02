import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import styles from "./styles";
import { useMainContext } from "../../contexts/RealmContext";
import { TextInput, HelperText, MD3Colors } from "react-native-paper";
import { Colors } from "../../styles";

function Login({ navigation }) {
  const realm = useMainContext();
  const { FazendaID, RebanhoID, FazendaProp } = useContext(AuthContext);
  const [listaReb, setListaReb] = useState([]);
  const [listaFaz, setListaFaz] = useState([]);
  const [passwordState, setpasswordState] = useState(true);
  const [keyboardStatus, setkeyboardStatus] = useState(false);
  const [emailPreenchido, setEmailPreenchido] = useState(true);
  const [emailValido, setEmailValido] = useState(true);
  const [senhaPreenchido, setSenhaPreenchido] = useState(true);
  const [senhaValida, setSenhaValida] = useState(true);
  const VALID_EMAIL_EXPRESSION =
    /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  function handleUserLogin() {
    if (
      email.length === 0 ||
      !VALID_EMAIL_EXPRESSION.test(email.toLowerCase()) ||
      password.length === 0 ||
      password.trim().length < 6
    ) {
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
    } else if (
      emailPreenchido &&
      emailValido &&
      senhaPreenchido &&
      senhaValida
    ) {
      //Função de login aqui
      setpasswordState(true);
      setPassword("");
      setEmail("");
      navigation.navigate(navigateWhere());
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
      <View style={styles.containerlogin}>
        <ScrollView
          contentContainerStyle={StyleScrollViewContainer()}
          style={{ flex: 1 }}
        >
          <View>
            <Image
              style={keyboardStatus ? { display: "none" } : styles.logo}
              source={require("../../../assets/FazFin.png")}
            />
            <Text style={styles.title}>Bem-vindo(a)</Text>
          </View>
          <TextInput
            mode="flat"
            style={styles.campoTexto}
            label="Digite seu e-mail"
            activeUnderlineColor={Colors.green}
            textColor={Colors.black}
            placeholder="Ex: seuemail@gmail.com"
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
            mode="flat"
            label={<Text style={{ fontSize: 16 }}>Senha</Text>}
            style={styles.campoTexto}
            right={
              <TextInput.Icon
                icon={passwordState ? "eye" : "eye-off"}
                onPress={() => {
                  setpasswordState(!passwordState);
                }}
              />
            }
            inputMode="text"
            autoCapitalize="none"
            onChangeText={handleSenhaChange}
            value={password}
            secureTextEntry={passwordState}
            activeUnderlineColor={Colors.green}
            textColor={Colors.black}
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
        </ScrollView>
        <View style={StyleFuncKeyboard()}>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => handleUserLogin()}
          >
            <Text style={styles.tituloBotao}>{"Login"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.tituloBotao}>
              {"Clique aqui para cadastrar"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
export default Login;
