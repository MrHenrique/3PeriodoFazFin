import React, { useState, useContext, useRef, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  View,
  Alert,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import Header from "../../components/Header";
import PreviewFinanceiro from "../../components/PreviewFinanceiro";
import { AuthContext } from "../../contexts/auth";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import { useMainContext } from "../../contexts/RealmContext";

function Home({ navigation }) {
  const realm = useMainContext();
  const [listaAlerts, setListaAlerts] = useState([]);
  const { RebanhoID, PrecoCF, PrecoLeite, rebID, fazID } =
    useContext(AuthContext);
  const [Pos, setPos] = useState(0);
  const [loadpage, setloadpage] = useState(0);
  const [PosText, setPosText] = useState("do Rebanho");
  const scrollRef = useRef();
  function backAndClear() {
    RebanhoID("");
    PrecoCF(0);
    PrecoLeite(0);
    navigation.reset({
      index: 2,
      routes: [{ name: "SelectRebPage" }],
    });
  }
  useEffect(() => {
    if (realm) {
      let dataFarm = realm.objectForPrimaryKey("Farm", fazID);
      setListaAlerts(dataFarm.atualEstoque);
      const savedItems = [];

      dataFarm.atualEstoque.forEach((item) => {
        if (
          item.alert[0].alertMin > 0 &&
          item.alert[0].alertMin <=
            (item.pesoProd > 0 ? item.pesoProd : item.volumeProd)
        ) {
          savedItems.push({
            nomeProd: item.nomeProd,
          });
        }
      });
      const nameList = savedItems.map((item) => item.nomeProd);
      const nameString = nameList.join(", ");
      setloadpage(2);
      if (nameString.length > 0) {
        Alert.alert("Itens abaixo do estoque mínimo", nameString);
      }
    }
  }, [realm, loadpage]);
  const onPressTouch = () => {
    if (Pos == 0) {
      scrollRef.current?.scrollTo({
        y: 1000,
        animated: true,
      });
      setPos(!Pos);
      setPosText("da Fazenda");
    } else if (Pos == 1) {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
      setPos(!Pos);
      setPosText("do Rebanho");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.imgbg}>
        <View style={styles.containergeral}>
          <View style={styles.containerPreview}>
            <View style={styles.containerScrollPreview}>
              <ScrollView
                style={styles.Preview}
                horizontal={true}
                ref={scrollRef}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.previewteste}>
                  <PreviewFinanceiro Titulo={"Visão geral da Fazenda"} Id={1} />
                </View>
                <View style={styles.previewteste}>
                  <PreviewFinanceiro Titulo={"Visão geral do Rebanho"} Id={2} />
                </View>
              </ScrollView>
            </View>
            <TouchableOpacity onPress={onPressTouch} style={styles.nextPreview}>
              <Text style={styles.textPreview}>Ver resumo {PosText}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerBotoes}>
            <View style={styles.BTN_route}>
              <TouchableOpacity
                style={styles.botaoPress4}
                onPress={() => navigation.navigate("PageAnimais")}
              >
                <Text style={styles.tituloBotao2}>
                  <MaterialCommunityIcons
                    name={"cow"}
                    size={scale(30)}
                    color={"white"}
                  />
                  {"Animais"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.BTN_route}>
              <TouchableOpacity
                style={styles.botaoPress4}
                onPress={() => navigation.navigate("Despesas")}
              >
                <Text style={styles.tituloBotao2}>
                  <MaterialCommunityIcons
                    name={"calculator-variant"}
                    size={scale(30)}
                    color={"white"}
                  />
                  {"Despesas"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.BTN_route}>
              <TouchableOpacity
                style={styles.botaoPress4}
                onPress={() => navigation.navigate("Estoque")}
              >
                <Text style={styles.tituloBotao2}>
                  <MaterialCommunityIcons
                    name={"package"}
                    size={scale(30)}
                    color={"white"}
                  />
                  {"Estoque"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.containerVoltar}>
              <TouchableOpacity
                style={styles.botaopress}
                onPress={() => backAndClear()}
              >
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text style={styles.tituloBotao}>{"Voltar"}</Text>
                </View>
                <MaterialIcons
                  name="arrow-back"
                  size={scale(24)}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default Home;
