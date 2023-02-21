import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import Header from "../../components/Header";
import { scale, verticalScale } from "react-native-size-matters";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("screen").width;
const ScreenHeight = Dimensions.get("screen").height;

function Leite({ navigation }) {
  const imgbg1 = "../../../assets/bg10.jpg";
  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Olá Carlos"} />
      <ScrollView>
        {/*Preco do leite*/}
        <View style={styles.containerinfos}>
          <Text style={styles.tituloinfo}>Preço atual do Leite:</Text>
          <TextInput
            style={styles.detalhe}
          />
        </View>
        {/*Produção diaria*/}
        <View style={styles.containerinfos}>
          <Text style={styles.tituloinfo}>Produção diaria:</Text>
          <TextInput
            style={styles.detalhe}
          />
          <TouchableOpacity style={styles.botaoselecionaranimal}>
            <Text style={styles.selecionaranimal}>
              Selecionar Animal
            </Text>
          </TouchableOpacity>
        </View>
        {/*Descrição*/}
        <View style={styles.containerinfos}>
          <Text style={styles.tituloinfo}>Descrição:</Text>
          <TextInput
            style={styles.detalhe}
            multiline={true} />
        </View>

      </ScrollView>
      <TouchableOpacity
        style={styles.botaovoltar}
        onPress={() => navigation.navigate("PagelancaContas")}
      >
        <Text style={styles.textovoltar}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#004513",
  },
  contvoltar: {
    position: 'absolute',
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    color: "rgba(15, 109, 0, 0.9)",
    top: verticalScale(625),


  },
  botaovoltar: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    position: "absolute",
    top: ScreenHeight >= 800 ? verticalScale(633) : verticalScale(605),
    left: (ScreenWidth - scale(300)) / 2
  },
  textovoltar: {
    fontSize: verticalScale(14),
    fontWeight: "bold",
    color: "#fff",
  },
  tituloinfo: {
    color: "#c4c4c4ff",
    fontSize: scale(20),
    marginBottom: scale(10),
    textAlign: "center",
  },
  detalhe: {
    fontSize: scale(20),
    color: "black",
    backgroundColor: "white",
    borderRadius: scale(5),
    marginBottom: scale(20),
  },
  containerinfos: {
    marginTop: verticalScale(10),
    padding: scale(10),
    backgroundColor: "rgba(15, 109, 0, 0.7)",
    borderRadius: scale(8),
  },
  botaoselecionaranimal: {
    backgroundColor: "#004513",
    width: scale(215),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 18,
    color: "white",
  },
  selecionaranimal: {
    color: "white",
    fontSize: scale(20),

  },


});

export default Leite;
