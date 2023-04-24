import * as React from "react";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import EstoqueOptions from "../../../components/Dropdown/EstoqueOptions";
import { useState, useContext, useCallback, useEffect } from "react";
import uuid from "react-native-uuid";
import { AuthContext } from "../../../contexts/auth";
import writeGastos from "../../../Realm/writeGastos";
import writeEstoque from "../../../Realm/writeEstoque";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import getAllEstoque from "../../../Realm/getAllEstoque";
import { CheckBox } from "react-native-elements";

export default function SaidaEstoque() {
  const navigation = useNavigation();
  const [qtdProd, setQtdProd] = useState("");
  const [obserProd, setObserProd] = useState("");
  const [listaEstoque, setListaEstoque] = useState([]);
  const [shouldShow, setShouldShow] = useState(false);
  const [newListaEstoque, setNewListaEstoque] = useState([]);
  const [idSelected, setIdSelected] = useState("");
  const [tipo, setTipo] = useState(0);
  const { fazID, rebID, idEstoqueSaida, TipoEstoqueSaida } =
    useContext(AuthContext);

  //Buscar no banco estoque
  async function fetchDataEstoque(fazID) {
    const dataEstoque = await getAllEstoque(fazID);
    setListaEstoque(dataEstoque);
  }
  //Chama funcao buscando dados do estoque ao focar em página
  useFocusEffect(
    useCallback(() => {
      fetchDataEstoque(fazID);
    }, [])
  );
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
    setShouldShow(true);
    if (idEstoqueSaida != "") {
      setNewListaEstoque(
        listaEstoque.filter((estoque) => estoque._id === idEstoqueSaida)
      );
    }
  };

  async function handleAddGastos() {
    const qtdProdFinal = newListaEstoque[0].qtdProd - Number(qtdProd);
    const valorProdFinal =
      (newListaEstoque[0].valorProd / newListaEstoque[0].qtdProd) *
      qtdProdFinal;
    const valorMedioTransacao =
      newListaEstoque[0].valorProd / newListaEstoque[0].qtdProd;
    await writeGastos(
      {
        _id: uuid.v4(),
        createdAt: new Date(),
        nomeProd: newListaEstoque[0].nomeProd,
        valorProd: valorMedioTransacao,
        qtdProd: Number(qtdProd),
      },
      rebID
    );
    await writeEstoque(
      {
        nomeProd: newListaEstoque[0].nomeProd,
        _id: newListaEstoque[0]._id,
        valorProd: valorProdFinal,
        qtdProd: qtdProdFinal,
        createdAt: new Date(),
        obserProd: obserProd,
        pesoProd: newListaEstoque[0].pesoProd,
        volumeProd: newListaEstoque[0].volumeProd,
      },
      fazID,
      newListaEstoque[0].nomeProd
    );
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
          title="Alimento"
          checked={tipo === 1}
          onPress={() => setTipo(1)}
        />
        <CheckBox
          title="Remédios"
          checked={tipo === 2}
          onPress={() => setTipo(2)}
        />
      </View>
      <EstoqueOptions />
      <View>
        {shouldShow ? (
          <View>
            {newListaEstoque.length > 0 ? (
              <Text>
                Preço Médio : R${" "}
                {newListaEstoque[0].valorProd / newListaEstoque[0].qtdProd}{" "}
                Quantidade em Estoque : {newListaEstoque[0].qtdProd}
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
    </>
  );
}
