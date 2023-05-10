import React, { useState, useContext, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import DropdownComponent from "../../../components/Dropdown/TipoProd";
import uuid from "react-native-uuid";
import { AuthContext } from "../../../contexts/auth";
import writeEstoqueEntrada from "../../../Realm/writeEstoqueEntrada";
import writeEstoque from "../../../Realm/writeEstoque";
import { useMainContext } from "../../../contexts/RealmContext";

function EntradaEstoque() {
  const realm = useMainContext();
  const navigation = useNavigation();
  //estados
  const [listaEstoqueFiltered, setListaEstoqueFiltered] = useState([]);
  const [nomeProd, setNomeProd] = useState("");
  const [valorProdI, setValorProd] = useState("");
  const [volumeProdI, setVolumeProd] = useState("");
  const [pesoProdI, setPesoProd] = useState("");
  const [obserProd, setObserProd] = useState("");
  const [qtdProdI, setQtdProd] = useState(0);
  const { tipoProd } = useContext(AuthContext);
  const { fazID } = useContext(AuthContext);
  //Gravar dados em Estoque principal
  async function handleAddEstoque() {
    //checar se produto já existe
    if (listaEstoqueFiltered.length === 0) {
      //se não existe checar se cadastro é relacionado a tipo 1 ou 2 (farmácia/alimentos)
      if (tipoProd == 1) {
        let valorProd = Number(valorProdI);
        let volumeProd = Number(volumeProdI);
        let pesoProd = 0;
        let qtdProd = Number(qtdProdI);
        if (realm) {
          try {
            realm.write(() => {
              let farm = realm.objectForPrimaryKey("Farm", fazID);
              let createdEstoque = realm.create("AtualEstoqueSchema", {
                nomeProd: nomeProd,
                _id: uuid.v4(),
                valorProd,
                qtdProd,
                pesoProd,
                volumeProd,
                obserProd,
                createdAt: new Date(),
              });
              let createdEstoqueEntrada = realm.create("EstoqueEntradaSchema", {
                nomeProd: nomeProd,
                _id: uuid.v4(),
                valorProd,
                qtdProd,
                pesoProd,
                volumeProd,
                obserProd,
                createdAt: new Date(),
              });
              farm.entradaEstoque.push(createdEstoqueEntrada);
              farm.atualEstoque.push(createdEstoque);
              Alert.alert("Dados cadastrados com sucesso!");
            });
          } catch (e) {
            Alert.alert("Não foi possível cadastrar.");
          } finally {
            resetStates();
          }
        }
      } else if (tipoProd == 2) {
        let valorProd = Number(valorProdI);
        let pesoProd = Number(pesoProdI);
        let volumeProd = 0;
        let qtdProd = Number(qtdProdI);
        if (realm) {
          try {
            realm.write(() => {
              let farm = realm.objectForPrimaryKey("Farm", fazID);
              let createdEstoque = realm.create("AtualEstoqueSchema", {
                nomeProd: nomeProd,
                _id: uuid.v4(),
                valorProd,
                qtdProd,
                pesoProd,
                volumeProd,
                obserProd,
                createdAt: new Date(),
              });
              let createdEstoqueEntrada = realm.create("EstoqueEntradaSchema", {
                nomeProd: nomeProd,
                _id: uuid.v4(),
                valorProd,
                qtdProd,
                pesoProd,
                volumeProd,
                obserProd,
                createdAt: new Date(),
              });
              farm.entradaEstoque.push(createdEstoqueEntrada);
              farm.atualEstoque.push(createdEstoque);
              Alert.alert("Dados cadastrados com sucesso!");
            });
          } catch (e) {
            Alert.alert("Não foi possível cadastrar.");
          } finally {
            resetStates();
          }
        }
      }
    }
    //se produto existe
    else {
      if (tipoProd == 1 && listaEstoqueFiltered[0].volumeProd > 0) {
        let valorProd = Number(valorProdI);
        let volumeProd = Number(volumeProdI);
        let qtdProd = Number(qtdProdI);
        let pesoProd = 0;
        valorProdF = valorProd + listaEstoqueFiltered[0].valorProd;
        volumeProdF = volumeProd + listaEstoqueFiltered[0].volumeProd;
        qtdProdF = qtdProd + listaEstoqueFiltered[0].qtdProd;
        if (realm) {
          try {
            realm.write(() => {
              let updateEstoque = realm
                .objects("AtualEstoqueSchema")
                .filtered(`_id= '${listaEstoqueFiltered[0]._id}'`)[0];
              updateEstoque.valorProd = valorProdF;
              updateEstoque.pesoProd = pesoProd;
              updateEstoque.volumeProd = volumeProdF;
              updateEstoque.qtdProd = qtdProdF;
              updateEstoque.obserProd = obserProd;
              updateEstoque.createdAt = new Date();

              let farm = realm.objectForPrimaryKey("Farm", fazID);
              let createdEstoqueEntrada = realm.create("EstoqueEntradaSchema", {
                nomeProd: nomeProd,
                _id: uuid.v4(),
                valorProd,
                qtdProd,
                pesoProd,
                volumeProd,
                obserProd,
                createdAt: new Date(),
              });
              farm.entradaEstoque.push(createdEstoqueEntrada);
              Alert.alert("Dados cadastrados com sucesso!");
            });
          } catch (e) {
            Alert.alert("Não foi possível cadastrar.", e.message);
          } finally {
            resetStates();
          }
        }
      } else if (tipoProd == 2 && listaEstoqueFiltered[0].pesoProd > 0) {
        let valorProd = Number(valorProdI);
        let pesoProd = Number(pesoProdI);
        let qtdProd = Number(qtdProdI);
        let volumeProd = 0;
        valorProd = valorProd + listaEstoqueFiltered[0].valorProd;
        pesoProd = pesoProd + listaEstoqueFiltered[0].pesoProd;
        qtdProd = qtdProd + listaEstoqueFiltered[0].qtdProd;
        if (realm) {
          try {
            realm.write(() => {
              let updateEstoque = realm
                .objects("AtualEstoqueSchema")
                .filtered(`_id= '${listaEstoqueFiltered[0]._id}'`)[0];
              updateEstoque.valorProd = valorProdF;
              updateEstoque.pesoProd = pesoProd;
              updateEstoque.volumeProd = volumeProdF;
              updateEstoque.qtdProd = qtdProdF;
              updateEstoque.obserProd = obserProd;
              updateEstoque.createdAt = new Date();

              let farm = realm.objectForPrimaryKey("Farm", fazID);
              let createdEstoqueEntrada = realm.create("EstoqueEntradaSchema", {
                nomeProd: nomeProd,
                _id: uuid.v4(),
                valorProd,
                qtdProd,
                pesoProd,
                volumeProd,
                obserProd,
                createdAt: new Date(),
              });
              farm.entradaEstoque.push(createdEstoqueEntrada);
              Alert.alert("Dados cadastrados com sucesso!");
            });
          } catch (e) {
            Alert.alert("Não foi possível cadastrar.");
          } finally {
            resetStates();
          }
        }
      } else {
        Alert.alert(
          "Produto com mesmo nome encontrado em outra categoria, cadastro sem sucesso."
        );
        resetStates();
      }
    }
  }
  //reset estados
  const resetStates = () => {
    setNomeProd("");
    setValorProd("");
    setVolumeProd("");
    setPesoProd("");
    setObserProd("");
    setQtdProd(0);
  };
  //botões de + e -
  //mais
  const maisButton = () => {
    setQtdProd((parseInt(qtdProdI) + 1).toString());
  };
  //menos
  const menosButton = () => {
    if (qtdProdI >= 1) {
      setQtdProd((parseInt(qtdProdI) - 1).toString());
    }
  };
  //Buscar no banco filtrando por nome
  async function fetchDataEstoqueFiltered(realm, fazID) {
    let dataEstoque = realm.objectForPrimaryKey("Farm", fazID);
    let filteredEstoque = dataEstoque.atualEstoque.filter(
      (produto) => produto.nomeProd === nomeProd
    );
    setListaEstoqueFiltered(filteredEstoque);
    dataEstoque.atualEstoque.addListener((values) => {
      let filteredValues = values.filter(
        (produto) => produto.nomeProd === nomeProd
      );
      setListaEstoqueFiltered(filteredValues);
    });
  }
  useEffect(() => {
    if (realm) {
      fetchDataEstoqueFiltered(realm, fazID);
    }
  }, [realm, nomeProd]);
  //Checar tipo de input farmacia/alimentos e deixar visivel somente o campo relacionado (volume/peso)
  const TextInputTipo = () => {
    if (tipoProd == 1) {
      return (
        <View>
          <Text style={styles.font}>Volume do produto:</Text>
          <TextInput
            style={styles.font}
            value={volumeProdI}
            onChangeText={setVolumeProd}
            placeholder="200"
            keyboardType="decimal-pad"
            inputMode="decimal"
          />
        </View>
      );
    }
    return (
      <View>
        <Text style={styles.font}>Peso do produto:</Text>
        <TextInput
          style={styles.font}
          value={pesoProdI}
          onChangeText={setPesoProd}
          placeholder="60"
          keyboardType="decimal-pad"
          inputMode="decimal"
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.font}>Cadastro de Produto</Text>
      <View>
        <Text style={styles.font}>Nome do produto:</Text>
        <TextInput
          style={styles.font}
          value={nomeProd}
          onChangeText={setNomeProd}
          placeholder="Prata"
          keyboardType="default"
          inputMode="text"
        />
        <DropdownComponent />
        <Text style={styles.font}>Preço da compra:</Text>
        <TextInput
          style={styles.font}
          value={valorProdI}
          onChangeText={setValorProd}
          placeholder="50,00"
          keyboardType="decimal-pad"
          inputMode="decimal"
        />
        <Text style={styles.font}>Quantidade de produtos comprados:</Text>
        <View style={styles.containerMaisMenos}>
          <TouchableOpacity style={styles.button} onPress={menosButton}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.font}
            value={qtdProdI}
            onChangeText={(valor) => setQtdProd(valor)}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={maisButton}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        {TextInputTipo()}
        <Text style={styles.font}>Observações:</Text>
        <TextInput
          style={styles.font}
          value={obserProd}
          onChangeText={setObserProd}
          placeholder="Produto comprado em ..."
          keyboardType="default"
          inputMode="text"
        />
        <TouchableOpacity style={styles.botao} onPress={handleAddEstoque}>
          <Text style={styles.font}>{"Cadastrar"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.font}>{"Voltar"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#004513",
  },
  font: {
    color: "white",
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
  },
  botao: {
    backgroundColor: "green",
    alignSelf: "center",
    height: "100%",
    width: "100%",
    maxHeight: 50,
    maxWidth: 200,
  },
  containerMaisMenos: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  button: {
    backgroundColor: "lightgray",
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
export default EntradaEstoque;
