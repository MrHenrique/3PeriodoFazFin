import React from "react";

import {
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import Header from "../../components/Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
function GeralReb({ navigation }) {
  const imgbg1 = "../../../assets/bg3.jpg";
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgbg}
        source={require(imgbg1)}
        imageStyle={{ opacity: 0.6 }}
      >
        <Header title="Olá, Carlos" />
        <TouchableOpacity style={styles.bannerButton}>
          <Text style={styles.bannerText}>
            {"Verificar o balanço do rebanho."}
          </Text>
          <Text style={styles.textoBannerT}>
            <Text style={styles.textoBanner}>{"Receita Mensal: "}</Text>
            <Text style={styles.textoBannerRec}>{"R$ 1500,00"}</Text>
          </Text>
          <Text style={styles.textoBannerT}>
            <Text style={styles.textoBanner}>{"Gasto Mensal: "}</Text>
            <Text style={styles.textoBannerDes}>{"R$ 500,00"}</Text>
          </Text>
          <Text style={styles.textoBannerT}>
            <Text style={styles.textoBanner}>{"Total Mensal: "}</Text>
            <Text style={styles.textoBannerRec}>{"R$ 1000,00"}</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoPress3}
          onPress={() => navigation.navigate("PageListavacas")}
        >
          <Text style={styles.tituloBotao2}>
            <MaterialCommunityIcons
              name={"cow"}
              size={scale(35)}
              color={"white"}
            />
            {"Animais"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoPress4}
          onPress={() => navigation.navigate("PagelancaContas")}
        >
          <Text style={styles.tituloBotao2}>
            <MaterialCommunityIcons
              name={"calculator-variant"}
              size={scale(35)}
              color={"white"}
            />
            {"Despesas"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaopress}
          onPress={() => navigation.navigate("GeralFaz")}
        >
          <Text style={styles.tituloBotao}>{"Voltar"}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#006773",
  },
  imgbg: {
    flex: 1,
    objectFit: "cover",
    width: "100%",
  },
  bannerButton: {
    borderRadius: 30,
    height: verticalScale(150),
    width: scale(300),
    alignSelf: "center",
    backgroundColor: "rgba(15,109,0,0.9)",
    justifyContent: "center",
    position: "absolute",
    top: verticalScale(75),
  },
  bannerText: {
    color: "#fff",
    fontSize: scale(20),
    fontWeight: "bold",
    margin: verticalScale(5),
    alignSelf: "center",
  },
  textoBannerT: {
    textAlign: "center",
    fontSize: scale(17),
  },
  textoBanner: {
    color: "#fff",
    fontSize: scale(15),
  },
  textoBannerRec: {
    color: "#0FFF50",
    fontSize: scale(17),
  },
  textoBannerDes: {
    color: "#FF3131",
    fontSize: scale(17),
  },
  botaoPress3: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(150),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(250),
    position: "absolute",
  },
  botaoPress4: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(150),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(425),
    position: "absolute",
  },
  tituloBotao2: {
    fontSize: scale(35),
    fontWeight: "bold",
    color: "#fff",
  },
  botaopress: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(625),
    position: "absolute",
  },
  tituloBotao: {
    fontSize: verticalScale(14),
    fontWeight: "bold",
    color: "#fff",
  },
  viewtext: {
    alignSelf: "center",
    position: "absolute",
    top: verticalScale(400),
  },
  texto: {
    fontSize: verticalScale(20),
    color: "#ffffff",
    alignSelf: "center",
  },
});
export default GeralReb;
