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
import getAllEstoqueFiltered from "../../../Realm/getAllEstoqueFiltered";
function EntradaEstoque() {
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
    if (listaEstoqueFiltered == undefined) {
      //se não existe checar se cadastro é relacionado a tipo 1 ou 2 (farmácia/alimentos)
      if (tipoProd == 1) {
        let valorProd = Number(valorProdI);
        let volumeProd = Number(volumeProdI);
        let qtdProd = Number(qtdProdI);
        await writeEstoque(
          {
            nomeProd,
            _id: uuid.v4(),
            valorProd,
            qtdProd,
            volumeProd,
            obserProd,
            createdAt: new Date(),
          },
          fazID,
          nomeProd
        );
      } else if (tipoProd == 2) {
        let valorProd = Number(valorProdI);
        let pesoProd = Number(pesoProdI);
        let qtdProd = Number(qtdProdI);
        await writeEstoque(
          {
            nomeProd,
            _id: uuid.v4(),
            valorProd,
            pesoProd,
            qtdProd,
            obserProd,
            createdAt: new Date(),
          },
          fazID,
          nomeProd
        );
      }
    }
    //se produto existe
    else {
      if (tipoProd == 1 && listaEstoqueFiltered.volumeProd > 0) {
        let valorProd = Number(valorProdI);
        let volumeProd = Number(volumeProdI);
        let qtdProd = Number(qtdProdI);
        valorProd = valorProd + listaEstoqueFiltered.valorProd;
        volumeProd = volumeProd + listaEstoqueFiltered.volumeProd;
        qtdProd = qtdProd + listaEstoqueFiltered.qtdProd;
        await writeEstoque(
          {
            nomeProd,
            _id: uuid.v4(),
            valorProd,
            qtdProd,
            volumeProd,
            obserProd,
            createdAt: new Date(),
          },
          fazID,
          nomeProd
        );
      } else if (tipoProd == 2 && listaEstoqueFiltered.pesoProd > 0) {
        let valorProd = Number(valorProdI);
        let pesoProd = Number(pesoProdI);
        let qtdProd = Number(qtdProdI);
        valorProd = valorProd + listaEstoqueFiltered.valorProd;
        pesoProd = pesoProd + listaEstoqueFiltered.pesoProd;
        qtdProd = qtdProd + listaEstoqueFiltered.qtdProd;
        await writeEstoque(
          {
            nomeProd,
            _id: uuid.v4(),
            valorProd,
            pesoProd,
            qtdProd,
            obserProd,
            createdAt: new Date(),
          },
          fazID,
          nomeProd
        );
      } else {
        Alert.alert(
          "Produto com mesmo nome encontrado em outra categoria, cadastro sem sucesso."
        );
      }
    }
  }
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
  async function fetchDataEstoqueFiltered(fazID, nomeProd) {
    const dataEstoqueFiltered = await getAllEstoqueFiltered(fazID, nomeProd);
    setListaEstoqueFiltered(dataEstoqueFiltered);
  }
  useEffect(() => {
    fetchDataEstoqueFiltered(fazID, nomeProd);
  }, [nomeProd]);
  //Gravar dados de transações de entrada no banco
  async function handleAddEstoqueEntrada() {
    //checar se produto já existe
    if (listaEstoqueFiltered == undefined) {
      //se n existe checar se cadastro é relacionado a tipo 1 ou 2 (farmácia/alimentos)
      if (tipoProd == 1) {
        let valorProd = Number(valorProdI);
        let volumeProd = Number(volumeProdI);
        let qtdProd = Number(qtdProdI);
        await writeEstoqueEntrada(
          {
            _id: uuid.v4(),
            nomeProd,
            valorProd,
            qtdProd,
            volumeProd,
            obserProd,
            createdAt: new Date(),
          },
          fazID
        );
      } else if (tipoProd == 2) {
        let valorProd = Number(valorProdI);
        let pesoProd = Number(pesoProdI);
        let qtdProd = Number(qtdProdI);
        await writeEstoqueEntrada(
          {
            _id: uuid.v4(),
            nomeProd,
            valorProd,
            pesoProd,
            qtdProd,
            obserProd,
            createdAt: new Date(),
          },
          fazID
        );
      } //se existe checar se cadastro é relacionado a tipo 1 ou 2 (farmácia/alimentos)
    } else {
      if (tipoProd == 1 && listaEstoqueFiltered.volumeProd > 0) {
        let valorProd = Number(valorProdI);
        let volumeProd = Number(volumeProdI);
        let qtdProd = Number(qtdProdI);
        await writeEstoqueEntrada(
          {
            _id: uuid.v4(),
            nomeProd,
            valorProd,
            qtdProd,
            volumeProd,
            obserProd,
            createdAt: new Date(),
          },
          fazID
        );
      } else if (tipoProd == 2 && listaEstoqueFiltered.pesoProd > 0) {
        let valorProd = Number(valorProdI);
        let pesoProd = Number(pesoProdI);
        let qtdProd = Number(qtdProdI);
        await writeEstoqueEntrada(
          {
            _id: uuid.v4(),
            nomeProd,
            valorProd,
            pesoProd,
            qtdProd,
            obserProd,
            createdAt: new Date(),
          },
          fazID
        );
      }
    }
    handleAddEstoque();
  }
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
        <TouchableOpacity
          style={styles.botao}
          onPress={handleAddEstoqueEntrada}
        >
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
    textAlign: 'center',
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
