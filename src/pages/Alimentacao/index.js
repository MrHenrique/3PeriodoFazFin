import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
   
} from "react-native";
import { CampoTexto } from "./styles";
import Header from "../../components/Header";
import { scale, verticalScale } from "react-native-size-matters";
import Select from "../../components/Select";
import { racao } from "../../components/Select/data";
const { height, width } = Dimensions.get("window");
function Alimentacao ({ navigation }) {
  
  return (
    <SafeAreaView style={styles.container}>
      
      <Header title="Olá, Carlos" />
          <TouchableOpacity style={styles.botaoPress2}>
            <Text style={styles.tituloBotao}>
              Selecione o trato</Text>
            <Select
              touchableText="Selecione o trato"
              title="Trato"
              data={racao}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
              }}/>
          </TouchableOpacity>
         
          <TouchableOpacity style={styles.botaoPress3}>
            <Text style={styles.tituloBotao}>
            {"Digite a quntidade sacos"}
            </Text>
            <CampoTexto placeholder=""></CampoTexto>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoPress4}>
            <Text style={styles.tituloBotao}>
            {"Valor por saco"}
            </Text>
            <CampoTexto placeholder=""></CampoTexto>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoPress5}>
            <Text style={styles.tituloBotao}>
            {"Consumo total do rebanho"}
            </Text>
            <CampoTexto placeholder=""></CampoTexto>
            </TouchableOpacity>
          <TouchableOpacity
            style={styles.botaopress}
            onPress={() => navigation.navigate("PagelancaContas")}
          >
            <Text style={styles.tituloBotao}>{"Voltar"}</Text>
          </TouchableOpacity>
        
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#00290C",
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
    height: verticalScale(100),
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
    height: verticalScale(100),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(200),
    position: "absolute",
  },
  botaoPress4: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(100),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(330),
    position: "absolute",
  },
  botaoPress5: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(100),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(460),
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
export default Alimentacao;
