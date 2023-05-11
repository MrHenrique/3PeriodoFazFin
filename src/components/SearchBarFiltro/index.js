import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import ModalFiltro from "../ModalFiltro";
import { scale, verticalScale } from "react-native-size-matters";
import { TextInput } from "react-native-gesture-handler";
import styles from "./styles";
import { Colors } from "../../styles";

function SearchBarFiltro({ setChange }) {
  // Implementacao para receber e mandar de componentes pais p/ filhos
  const [StateFiltro, setStateFiltro] = useState(false);
  function changeStateFiltro(e){
    // console.log(e);
    setStateFiltro(e);
  }
  // --Fim--
  function toggleFiltro() {
    setStateFiltro(!StateFiltro);
    // console.log(StateFiltro);
  }
  return (
    // INPUT DE PESQUISA
    <SafeAreaView style={styles.container}>
    {/* Modal Filtro */}
    <ModalFiltro modalState={StateFiltro} onChange={changeStateFiltro}/>
      <View style={styles.containergeral}>
        {/*Barra de pesquisa*/}
        <View style={styles.containerTxtInput}>
          <TextInput
            placeholder="Pesquisar"
            placeholderTextColor="rgb(82, 82, 82)"
            style={styles.statusbar}
            cursorColor="#000"
            // onChangeText={(e) => setChange(e)}
          />
        </View>

        <View style={styles.containerBotoes}>
          {/* BOTAO ADICIONAR */}
          <TouchableOpacity style={styles.botao}>
            <View style={styles.containerImg}>
              <MaterialIcons name="add" size={28} color="white" />
            </View>
            <Text style={styles.TextoBotao}>Adicionar</Text>
          </TouchableOpacity>
          {/* BOTAO FILTRO */}
          <TouchableOpacity
            style={[
              styles.botao,
              {
                backgroundColor:
                  StateFiltro == false ? Colors.green : Colors.darkgreen,
              },
            ]}
            onPress={() => toggleFiltro()}
          >
            <View style={styles.containerImg}>
              <MaterialCommunityIcons
                name="filter-menu-outline"
                size={28}
                color="white"
              />
            </View>
            <Text style={styles.TextoBotao}>Filtros</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default SearchBarFiltro;
