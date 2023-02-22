import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  FlatList,
  List,
} from "react-native";
import uuid from "react-native-uuid";
import Header from "../../components/Header";
import writeLeite from "../../Realm/writeLeite";
import getAllVacas from "../../Realm/getAllVacas";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";
import Modal from "react-native-modal";
import { scale, verticalScale } from "react-native-size-matters";

function Leite({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [vacaID, setVacaID] = useState("");
  function toggleModal() {
    setModalVisible(!isModalVisible);
    setSearchText("");
    setLista(listaVaca);
  }
  const renderItem = ({ item }) => {
    return (
      <View style={styles.modalContainer2}>
        <TouchableOpacity
          onPress={function ReturnID() {
            const VacaID = item._id;
            setVacaID(VacaID);
            toggleModal();
          }}
          style={[
            styles.cardVacas,
            {
              backgroundColor:
                item.brincoVaca % 2 === 0 ? "#0F6D00" : "#004513",
            },
          ]}
        >
          <Text style={styles.tituloBotao}>
            Nome: {item.nomeVaca} - Brinco: {item.brincoVaca}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  //Escrever no Banco
  async function handleAddLeite() {
    const precoL = Number(precoLV);
    const prodL = Number(prodLV);
    await writeLeite(
      {
        _id: uuid.v4(),
        precoL,
        prodL,
        description,
        createdAt: new Date(),
      },
      vacaID
    );
    navigation.navigate("Contas");
  }
  //Buscar no banco
  async function fetchData(rebID) {
    const dataVaca = await getAllVacas(rebID);
    setListaVaca(dataVaca);
  }
  useFocusEffect(
    useCallback(() => {
      fetchData(rebID);
    }, [])
  );
  const { ListaLeite, PrecoLeite, rebID, fazID } = useContext(AuthContext);
  //Background
  const imgbg1 = "../../../assets/bg10.jpg";
  //States para salvar o input
  const [description, setDescription] = useState("");
  const [precoLV, setPrecoLV] = useState("");
  const [prodLV, setProdLV] = useState("");
  const [listaVaca, setListaVaca] = useState([]);
  const [lista, setLista] = useState(listaVaca);
  const [searchText, setSearchText] = useState("");
  //-----------------------------
  function CanContinue(vacaID) {
    if (typeof vacaID == "undefined" || vacaID == "") {
      const CanContinue = true;
      return CanContinue;
    } else {
      const CanContinue = false;
      return CanContinue;
    }
  }
  function DisabledStyle(vacaID) {
    if (typeof vacaID == "undefined" || vacaID == "") {
      const Style = styles.botaopressdisabled;
      return Style;
    } else {
      const Style = styles.botaopress6;
      return Style;
    }
  }
  useEffect(() => {
    if (searchText === "") {
      setLista(listaVaca);
    } else {
      setLista(
        listaVaca.filter(
          (item) =>
            item.nomeVaca.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [searchText]);

  const handleFilterNome = () => {
    let newList = [...lista];
    newList.sort((a, b) =>
      a.nomeVaca > b.nomeVaca ? 1 : b.nomeVaca > a.nomeVaca ? -1 : 0
    );
    setLista(newList);
  };
  return (
    <View style={styles.container}>
      <Header />
      {/*Descrição*/}
      <ScrollView>
        <View style={styles.containerinfos}>
          <Text style={styles.tituloinfo}>Descrição:</Text>
          <TextInput
            style={styles.detalhe}
            value={description}
            onChangeText={setDescription}
            placeholder="Exemplo: Leite 22/11 Vaca Araçá"
          />
        </View>
        {/*Preco do leite*/}
        <View style={styles.containerinfos}>
          <Text style={styles.tituloinfo}>Preço atual do leite(R$):</Text>
          <TextInput
            style={styles.detalhe}
            value={precoLV}
            keyboardType="number-pad"
            onChangeText={setPrecoLV}
            placeholder="Exemplo: 3.1"
          />
        </View>
        {/*Produção diaria*/}
        <View style={styles.containerinfos}>
          <Text style={styles.tituloinfo}>Produção da vaca hoje(litros):</Text>
          <TextInput
            style={styles.detalhe}
            value={prodLV}
            keyboardType="number-pad"
            onChangeText={setProdLV}
            placeholder="Exemplo: 10.2"
          />
        </View>
        {/*Descrição*/}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          toggleModal();
        }}
        style={styles.botaoselecionaranimal}
      >
        <Text style={styles.tituloBotao}>Selecionar animal</Text>
        <Modal
          isVisible={isModalVisible}
          coverScreen={true}
          backdropColor={"rgba(234,242,215,0.8)"}
          animationIn="slideInUp"
          animationOut="slideOutDown"
        >
          <View style={styles.modalContainer}>
            <Text style={styles.TituloM}>Selecione um animal</Text>
            <TouchableOpacity
              style={styles.filtroNome}
              onPress={handleFilterNome}
            >
              <Text style={styles.tituloBotao}>Filtrar por nome</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.search}
              placeholder="Pesquise pelo nome."
              value={searchText}
              onChangeText={(t) => setSearchText(t)}
            ></TextInput>
            <FlatList
              style={styles.scroll}
              data={lista}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
            />
          </View>
          <TouchableOpacity
            style={styles.botaopressM}
            onPress={() => {
              toggleModal();
            }}
          >
            <Text style={styles.tituloBotao}>{"Voltar"}</Text>
          </TouchableOpacity>
        </Modal>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={CanContinue(vacaID)}
        style={DisabledStyle(vacaID)}
        onPress={handleAddLeite}
      >
        <Text style={styles.textovoltar}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.botaopress}
        onPress={() => navigation.navigate("Contas")}
      >
        <Text style={styles.textovoltar}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  filtroNome: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    borderRadius: 20,
    width: scale(140),
    height: verticalScale(30),
    margin: verticalScale(5),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  search: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    fontSize: verticalScale(15),
    color: "white",
    textAlign: "center",
    alignSelf: "center",
    height: verticalScale(40),
    width: scale(300),
    margin: verticalScale(20),
    borderRadius: 20,
  },
  modalContainer: {
    backgroundColor: "rgba(234,242,215,1)",
    position: "absolute",
    top: verticalScale(10),
    alignSelf: "center",
    height: verticalScale(550),
    width: scale(330),
    borderRadius: 20,
  },
  cardVacas: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    marginVertical: verticalScale(4),
    position: "relative",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#004513",
  },
  contvoltar: {
    position: "absolute",
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
    marginVertical: verticalScale(5),
    position: "relative",
    alignSelf: "center",
  },
  botaovoltar2: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    marginVertical: verticalScale(5),
    position: "relative",
    alignSelf: "center",
  },
  botaovoltar3: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    marginVertical: verticalScale(5),
    position: "relative",
    alignSelf: "center",
  },
  textovoltar: {
    fontSize: verticalScale(14),
    fontWeight: "bold",
    color: "#fff",
  },
  tituloinfo: {
    color: "white",
    fontSize: verticalScale(20),
    marginBottom: verticalScale(10),
    textAlign: "center",
    fontWeight: "bold",
  },
  detalhe: {
    fontSize: verticalScale(20),
    color: "black",
    backgroundColor: "white",
    borderRadius: verticalScale(5),
    marginBottom: verticalScale(20),
    textAlign: "center",
    width: scale(280),
  },
  containerinfos: {
    marginVertical: verticalScale(10),
    padding: verticalScale(20),
    width: scale(320),
    backgroundColor: "rgba(15, 109, 0, 0.7)",
    borderRadius: 20,
    alignSelf: "center",
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
    fontSize: verticalScale(20),
  },
  container2: {
    flex: 1,
    height: verticalScale(100),
    backgroundColor: "white",
  },
  lista2: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    alignSelf: "center",
    marginVertical: verticalScale(5),
    color: "white",
    textAlign: "center",
    fontSize: verticalScale(20),
    fontWeight: "bold",
  },
  container3: {
    height: verticalScale(300),
  },
  botaopressM: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(580),
    position: "absolute",
  },

  tituloBotao: {
    fontSize: verticalScale(14),
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

  botaopress6: {
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
  TituloM: {
    justifyContent: "center",
    alignSelf: "center",
    color: "#004513",
    fontSize: verticalScale(30),
    fontWeight: "bold",
  },
  botaoselecionaranimal: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    top: verticalScale(525),
    position: "absolute",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  botaopressdisabled: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.4)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(575),
    position: "absolute",
  },
});

export default Leite;
