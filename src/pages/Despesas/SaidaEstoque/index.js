import * as React from "react";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import EstoqueOptions from "../../../components/Dropdown/EstoqueOptions";
import { useState, useContext, useEffect } from "react";
import uuid from "react-native-uuid";
import { AuthContext } from "../../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";
import { useMainContext } from "../../../contexts/RealmContext";
import { Alert } from "react-native";

export default function SaidaEstoque() {
  const realm = useMainContext();
  const navigation = useNavigation();
  const [qtdProd, setQtdProd] = useState("");
  const [obserProd, setObserProd] = useState("");
  const [listaEstoque, setListaEstoque] = useState([]);
  const [shouldShow, setShouldShow] = useState(false);
  const [newListaEstoque, setNewListaEstoque] = useState([]);
  const [idSelected, setIdSelected] = useState("");
  const [tipo, setTipo] = useState(1);
  const { fazID, rebID, idEstoqueSaida, TipoEstoqueSaida, IdEstoqueSaida } =
    useContext(AuthContext);

  //Buscar no banco estoque
  useEffect(() => {
    if (realm) {
      let dataEstoque = realm.objectForPrimaryKey("Farm", fazID);
      setListaEstoque(dataEstoque.atualEstoque.sorted("nomeProd"));
      dataEstoque.atualEstoque.sorted("nomeProd").addListener((values) => {
        setListaEstoque([...values]);
      });
    }
  }, [realm]);
  useEffect(() => {
    setIdSelected(idEstoqueSaida);
  }, [idEstoqueSaida]);
  //chama funcao de filtrar estoque caso estado filterestoque mude
  useEffect(() => {
    FilterEstoqueData(idSelected);
  }, [idSelected]);

  useEffect(() => {
    setShouldShow(false);
    TipoEstoqueSaida(tipo);
  }, [tipo]);
  //funcao filtrar estoque
  const FilterEstoqueData = () => {
    if (idEstoqueSaida != "") {
      setShouldShow(true);
      setNewListaEstoque(
        listaEstoque.filter((estoque) => estoque._id === idEstoqueSaida)
      );
    } else {
      setShouldShow(false);
    }
  };

  async function handleAddGastos() {
    if (realm) {
      const qtdProdFinal = newListaEstoque[0].qtdProd - Number(qtdProd);
      const valorProdFinal =
        (newListaEstoque[0].valorProd / newListaEstoque[0].qtdProd) *
        qtdProdFinal;
      const valorMedioTransacao =
        newListaEstoque[0].valorProd / newListaEstoque[0].qtdProd;

      try {
        realm.write(() => {
          let updateEstoque = realm
            .objects("AtualEstoqueSchema")
            .filtered(`_id= '${idEstoqueSaida}'`)[0];
          updateEstoque.qtdProd = qtdProdFinal;
          updateEstoque.obserProd = obserProd;
          updateEstoque.createdAt = new Date();
          updateEstoque.valorProd = valorProdFinal;

          let reb = realm.objectForPrimaryKey("RebanhoSchema", rebID);
          let createdGastos = realm.create("DespesasSchema", {
            _id: uuid.v4(),
            createdAt: new Date(),
            nomeProd: newListaEstoque[0].nomeProd,
            valorProd: valorMedioTransacao,
            qtdProd: Number(qtdProd),
            obserProd: obserProd,
            pesoProd: 0,
            volumeProd: 0,
          });
          reb.despesas.push(createdGastos);
          Alert.alert("Dados cadastrados com sucesso!");
        });
      } catch (e) {
        Alert.alert("Não foi possível cadastrar.");
      } finally {
        setObserProd("");
        setQtdProd("");
        IdEstoqueSaida("");
      }
    }
  }
  function averagePrice() {
    if (newListaEstoque[0].qtdProd > 0) {
      const valor = (
        newListaEstoque[0].valorProd / newListaEstoque[0].qtdProd
      ).toFixed(2);
      const formattedValor = `R$ ${valor.replace(".", ",")}`;
      return formattedValor;
    } else {
      return "-";
    }
  }
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <CheckBox
          title="Remédios"
          checked={tipo === 1}
          onPress={() => {
            setTipo(1);
            IdEstoqueSaida("");
          }}
        />
        <CheckBox
          title="Alimento"
          checked={tipo === 2}
          onPress={() => {
            setTipo(2);
            IdEstoqueSaida("");
          }}
        />
      </View>
      <EstoqueOptions />
      <View>
        {shouldShow ? (
          <View>
            {newListaEstoque.length > 0 ? (
              <Text>
                Preço Médio : {averagePrice()} Quantidade em Estoque :{" "}
                {newListaEstoque[0].qtdProd}
              </Text>
            ) : (
              <></>
            )}
          </View>
        ) : null}
        <Text>Cadastro de outras despesas.</Text>
        <View>
          <Text>Quantidade utilizada: </Text>
          <TextInput
            value={qtdProd}
            onChangeText={setQtdProd}
            placeholder="50"
          />
        </View>
        <View>
          <Text>Observações: </Text>
          <TextInput
            value={obserProd}
            onChangeText={setObserProd}
            placeholder="Observação sobre produto"
          />
        </View>
      </View>
      <TouchableOpacity onPress={handleAddGastos}>
        <Text>{"Cadastrar"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
          IdEstoqueSaida("");
        }}
      >
        <Text>{"Voltar"}</Text>
      </TouchableOpacity>
    </>
  );
}
