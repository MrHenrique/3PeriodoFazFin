import React, { useState, useContext, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import Header from "../../components/Header";
import PreviewFinanceiro from "../../components/PreviewFinanceiro";
import { AuthContext } from "../../contexts/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";

function Home({ navigation }) {
  const [Pos, setPos] = useState(0);
  const [PosText, setPosText] = useState("do Rebanho");

  const scrollRef = useRef();
  const onPressTouch = () => {
    if (Pos == 0) {
      scrollRef.current?.scrollTo({
        y: 400,
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

  const imgbg1 = "../../../assets/bg3.jpg";
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ImageBackground
        style={styles.imgbg}
        source={require(imgbg1)}
        imageStyle={{ opacity: 0.6 }}
      >
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
                onPress={() => navigation.navigate("SelectRebPage")}
              >
                <Text style={styles.tituloBotao}>{"Voltar"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
export default Home;
