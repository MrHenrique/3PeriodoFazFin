import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { dataVacas } from "./vacas";
import Graficodetalhesvacas from "../Graficos/Graficodetalhesvacas"
import Modal from "react-native-modal";
import { scale, verticalScale } from "react-native-size-matters";
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("screen").width;
const ScreenHeight = Dimensions.get("screen").height;

function Lista_vacas({ textobarrapesquisa }) {
  const [List, setList] = useState(dataVacas);
  const [Searchtext, setSearchtext] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const [isInfoeditable, setisInfoeditable] = useState(false);
  const [Details, setDetails] = useState([]);

  {/*Verifica a barra de pesquisa e salva na state*/ }
  useEffect(() => {
    setSearchtext(textobarrapesquisa)
  }, [textobarrapesquisa]);
  {/*Verifica o state da barra de pesquisa, se ouver mudanca atualiza a lista*/ }
  useEffect(() => {
    setSearchtext(textobarrapesquisa)
    if (Searchtext === '') {
      setList(dataVacas);
    } else {
      setList(
        dataVacas.filter(item => {
          if (item.name.toLowerCase().indexOf(Searchtext.toLowerCase()) > -1 || item.etiqueta.toLowerCase().indexOf(Searchtext.toLowerCase()) > -1) {
            return true;
          } else {
            return false;
          }
        })
      );
    }
  }, [Searchtext]);


  function toggleModal() {
    setModalVisible(!isModalVisible);
  }
  function editarinfos() {
    setisInfoeditable(!isInfoeditable);
  }
  function verificagenero(a) {
    if (Details.genero === a) { return "check-square" }
    return "square"
  }
  function Contasvaca(a) {
    if (a == 1) return Details.lucro;
    else if (a == 2) return Details.gasto;
    else if (a == 3) return Details.media;
  }


  return (
    <View style={styles.Tudocont}>
      <View>
        <Modal
          isVisible={isModalVisible}
          coverScreen={true}
          backdropColor={"#00290C"}
          deviceHeight={ScreenHeight}
          deviceWidth={ScreenWidth}
          onBackButtonPress={() => {
            toggleModal();
          }}
          onBackdropPress={() => {
            toggleModal();
          }}
          Style={{ margin: 0 }}
          statusBarTranslucent
        ><ScrollView>
            <View style={{ paddingBottom: verticalScale(70), }}>
              <View style={styles.containermodal}>
                {/*NOME DA VACA E IMAGEM*/}
                <View style={styles.Vacaavatar}>
                  <TextInput
                    style={styles.textavatar}
                    value={Details.name}
                    editable={isInfoeditable} />
                  <MaterialCommunityIcons name="cow" size={verticalScale(60)} color="white" />
                </View>
                {/*Sexo*/}
                <View style={[styles.containerinfos, { flexDirection: "row", justifyContent: "space-around" }]}>
                  <View>
                    <Text style={styles.tituloinfo} >Macho</Text>
                    <Feather name={verificagenero(1)} size={scale(25)} color="white" />
                  </View>
                  <View>
                    <Text style={styles.tituloinfo} >Fêmea</Text>
                    <Feather name={verificagenero(0)} size={scale(25)} color="white" />
                  </View>
                </View>
                {/*Data de Nascimento*/}
                <View style={styles.containerinfos}>
                  <Text style={styles.tituloinfo}>Data de Nascimento:</Text>
                  <TextInput
                    style={styles.detalhe}
                    value={Details.anonasc}
                    editable={isInfoeditable} />
                </View>
                {/*Indentificação*/}
                <View style={styles.containerinfos}>
                  <Text style={styles.tituloinfo}>Indentificação(brinco):</Text>
                  <TextInput
                    style={styles.detalhe}
                    value={Details.etiqueta}
                    editable={isInfoeditable} />
                </View>
                {/*Descrição*/}
                <View style={styles.containerinfos}>
                  <Text style={styles.tituloinfo}>Descrição:</Text>
                  <TextInput
                    style={styles.detalhe}
                    value={Details.descricao}
                    editable={isInfoeditable}
                    multiline={true} />
                </View>

                <View style={{ backgroundColor: "rgba(15, 109, 0, 0.7)", marginTop: verticalScale(10), }}>
                  <Graficodetalhesvacas />
                </View>

                <TouchableOpacity
                  style={styles.botaoeditar}
                  onPress={() => {
                    editarinfos();
                  }}
                >
                  <Text style={styles.texteditar}>Editar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            style={styles.botaovoltar}
            onPress={() => {
              toggleModal();
            }}
          >
            <Text style={styles.textovoltar}>Voltar</Text>
          </TouchableOpacity>
        </Modal>
      </View>
      <FlatList
        data={List}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.containerVacas}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[styles.cardVacas, { backgroundColor: index % 2 === 0 ? "#0F6D00" : "#004513" }]}
              onPress={() => {
                toggleModal();
                setDetails(item);
              }}
            >
              <Text style={styles.textVacas}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerVacas: {
    margin: 5,
    alignItems: "center",
  },
  cardVacas: {
    padding: 15,
    alignItems: "center",
    borderRadius: windowHeight * 0.015,
    width: "90%",
  },
  textVacas: {
    color: "#f2f2f2",
    fontSize: windowWidth * 0.06,
    fontWeight: "bold",
  },
  Tudocont: {
    flex: 1,
    paddingTop: "5%",
    paddingBottom: "1%",
    width: windowWidth,
    paddingBottom: verticalScale(80),
  },
  containermodal: {
    backgroundColor: "#005f1d",
    borderRadius: 5,
    height: "100%",
    padding: 20,
    marginBottom: 11,
  },
  Vacaavatar: {
    backgroundColor: "#00290C",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(15),
  },
  textavatar: {
    fontSize: 24,
    paddingLeft: scale(10),
    color: "white",
  },
  tituloinfo: {
    color: "#c4c4c4ff",
    fontSize: scale(15),
  },
  detalhe: {
    fontSize: scale(20),
    color: "white",
  },
  containerinfos: {
    marginTop: verticalScale(10),
    padding: scale(10),
    backgroundColor: "rgba(15, 109, 0, 0.7)",
    borderRadius: scale(8),
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
    left: scale(8),
  },
  textovoltar: {
    fontSize: verticalScale(14),
    fontWeight: "bold",
    color: "#fff",
  },
  botaoeditar: {
    backgroundColor: "rgba(255, 30, 0, 1)",
    marginTop: verticalScale(10),
    width: scale(280),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  texteditar: {
    fontSize: verticalScale(16),
    color: 'white',
  },
  contasvaca: {
    width: "100%",
    padding: 10,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    backgroundColor: "#f2f2f2",
  },
  rendimento: {
    fontSize: 25,
    textAlign: "center",
  },
  rendimentototal: {
    fontSize: 25,
    textAlign: "center",
    color: "#080",
  },
});

export default Lista_vacas;
