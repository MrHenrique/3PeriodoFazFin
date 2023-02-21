import React from "react";
import {
  Text,
  Dimensions,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import Header from "../../components/Header";
import { scale, verticalScale } from "react-native-size-matters";
const ImgLeite = "../../../assets/milk-bottle.png"; 
const ImgAliment = "../../../assets/cow.png";
const ImgManejo = "../../../assets/smart-farm.png";
function PageLancavacas({ navigation }) {
  const imgbg1 = "../../../assets/bg11.jpg";
  return (
    <SafeAreaView style={styles.ContainerTudo}>
      <ImageBackground
        style={styles.imgbg}
        source={require(imgbg1)}
        imageStyle={{ opacity: 0.6 }}
      >
        <Header title="Produção e despesas" />

        <View style={styles.areabotao}>
          <TouchableOpacity style={styles.botaos}
           onPress={() => navigation.navigate("Leite")}>
            <Text style={styles.Texto}>
              <Image style={styles.imagem} source={require(ImgLeite)} />
              Leite
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaos2}
          onPress={() => navigation.navigate("Alimentacao")}>
            <Text style={styles.Texto}>
              <Image style={styles.imagem} source={require(ImgAliment)} />
              Alimentação
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaos3}
            onPress={() => navigation.navigate("Manejo")}
          >
            <Text style={styles.Texto}>
              <Image style={styles.imagem} source={require(ImgManejo)} />
              Manejo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.voltar}
            onPress={() => navigation.navigate("GeralReb")}
          >
            <Text style={styles.tituloBotao}>{"Voltar"}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  botaos: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(150),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(25),
    position: "absolute",
  },
  botaos2: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(150),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(200),
    position: "absolute",
  },
  botaos3: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(150),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(375),
    position: "absolute",
  },
  Texto: {
    fontSize: scale(35),
    fontWeight: "bold",
    color: "#fff",
  },
  imagem: {
    width: scale(40),
    height: scale(40),
  },
  voltar: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(575),
    position: "absolute",
  },
  ContainerTudo: {
    flex: 1,
    backgroundColor: "#006773",
  },
  imgbg: {
    flex: 1,
    objectFit: "cover",
    width: "100%",
  },

  tituloBotao: {
    fontSize: verticalScale(14),
    fontWeight: "bold",
    color: "#fff",
  },
});

export default PageLancavacas;
