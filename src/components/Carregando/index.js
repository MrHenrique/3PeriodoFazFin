import React, { useState, useContext, useRef } from "react";
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import styles from "./styles";

function Carregando({title}) {
  const imgbg1 = "../../../assets/bg5.jpg";
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgbg}
        source={require(imgbg1)}
        imageStyle={{ opacity: 0.6 }}
      >
      <View style={styles.tabviewShadow}></View>
        <View style={styles.containergeral}>
          <View style={styles.containercarregando}>
            <Text style={styles.textcarregando}>Carregando {title}</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
export default Carregando;
