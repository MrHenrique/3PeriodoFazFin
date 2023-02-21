import React from "react";
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import Header from "../../components/Header";
import { scale, verticalScale } from "react-native-size-matters";
import Modal from '../modalVacina/index'
const { height, width } = Dimensions.get("window");
function Manejo({ navigation }) {
  const imgbg1 = "../../../assets/bg10.jpg";
  return (
    <SafeAreaView style={styles.container}>
      
        <ImageBackground
          style={styles.imgbg}
          source={require(imgbg1)}
          imageStyle={{ opacity: 0.6 }}
        >
          
          <Header title="Olá, Carlos" />
          <Modal/> 
          <Modal/>
          <TouchableOpacity
            style={styles.botaopress}
            onPress={() => navigation.navigate("PagelancaContas")}
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
  botaoPress2: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(150),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(75),
    position: "absolute",
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
    fontSize: scale(25),
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
});
export default Manejo;
