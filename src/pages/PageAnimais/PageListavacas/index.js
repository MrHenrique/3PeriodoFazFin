import React, { useState, useContext } from "react";
import {
  Dimensions,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { scale, verticalScale } from "react-native-size-matters";
import Lista_vacas from "../../../components/Lista_Vacas";
import SearchBar from "../../../components/SearchBar";
import { AuthContext } from "../../../contexts/auth";
import SearchBarFiltro from "../../../components/SearchBarFiltro";

const imgbg1 = "../../../../assets/listavacas-bg.jpg";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function PageListavacas({ navigation }) {
  const [Barrapesquisa, setBarrapesquisa] = useState("");
  const [Lista, setLista] = useState();
  const { rebID } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ImageBackground
          style={styles.imgbg}
          source={require(imgbg1)}
          imageStyle={{ opacity: 0.6 }}
        >
          <SearchBarFiltro/>
          {/* <SearchBar setChange={(data) => setBarrapesquisa(data)} /> */}
          <Lista_vacas textobarrapesquisa={Barrapesquisa} idrebanho={rebID} />

          <View style={styles.contcad}>
            <TouchableOpacity
              style={styles.botaovoltar}
              onPress={() => navigation.navigate("CadastroVaca")}
            >
              <Text style={styles.textovoltar}>Cadastrar Vaca</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contvoltar}>
            <TouchableOpacity
              style={styles.botaovoltar}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.textovoltar}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 138, 161, 0.9)",
  },
  contvoltar: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    color: "rgba(15, 109, 0, 0.9)",
    top: verticalScale(625),
  },
  contcad: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    color: "rgba(15, 109, 0, 0.9)",
    top: verticalScale(582),
  },
  botaovoltar: {
    backgroundColor: "rgba(36, 105, 25, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  textovoltar: {
    fontSize: verticalScale(14),
    fontWeight: "bold",
    color: "#fff",
  },
});

export default PageListavacas;
