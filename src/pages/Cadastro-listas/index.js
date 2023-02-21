import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, StyleSheet, ScrollView } from 'react-native';
import { getRealm } from '../../database/realm';
import uuid from 'react-native-uuid';

function Cadastrolista({ navigations, route }) {


  const { idfaz } = route.params;

  const [Precoleite, setPrecoleite] = useState(null);
  const [Litros, setLitros] = useState(null);
  const [Descricao, setDescricao] = useState("");
  const [aLista, setLista] = useState([]);

  const teste = [
    {
      "_id": " 1",
      "precoleite": "32",
      "litros": "3",
      "descricao": " asdasdas",
    },
    {
      "_id": " 2",
      "precoleite": " 32",
      "litros": "3",
      "descricao": "asdasdas",
    },
  ]

  async function fetchLeite() {
    const realm = await getRealm();
    try {
      const result = realm.objects("Farm").filtered(`_id = '${idfaz}'`).toJSON();
      alert(aLista.name)
      setLista(result)

    } catch (e) {
      console.log(e)

    } finally {
      realm.close();
    }

  }
  useEffect(() => {
    fetchLeite();
  }, [aLista])


  async function handleNewLeite() {
    const realm = await getRealm();
    const leite = parseFloat(Precoleite);
    const litross = parseFloat(Litros);


    const tabela = {
      _id: idfaz,
      contaleite: [{
        _id: uuid.v4(),
        precoleite: leite,
        litros: litross,
        descricao: Descricao,
        createdAt: new Date(),
      }]
    }
    try {
      realm.write(() => {

        const created = realm.create(
          "Farm",
          tabela,
          "modified"
        );
        console.log(created.contaleite);
      })
      Alert.alert("Chamado1", "Cadastro efetuado com sucesso!");

    } catch (e) {
      console.log(e)
      Alert.alert("Chamado2", "Cadastro Não efetuado!")

    } finally {
      realm.close();
    }

  }

  const renderitem = (item) => (
    <Text>{item._id}</Text>
  );

  return (
    <View style={{ flex: 1, }}>
      <View>
        <Text>
          CRIAÇÃO DO DATABASE
        </Text>
        <TextInput onChangeText={(e) => setPrecoleite(parseFloat(e))}
          keyboardType={"number-pad"}
          placeholder='Preco do leite' />

        <TextInput onChangeText={(e) => setLitros(parseFloat(e))}
          keyboardType={"number-pad"}
          placeholder='Litros do leite' />

        <TextInput onChangeText={setDescricao}
          placeholder='Litros do leite' />

        <TouchableOpacity onPress={handleNewLeite}>
          <Text>
            SALVAR DATABASE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
        >
          <Text>
            Mostrar salvos
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, backgroundColor: "red" }}>
        <FlatList
          data={aLista}
          keyExtractor={item => item._id}
          renderItem={renderitem} />

      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    color: "white",
    fontSize: 20,
  },
  card: {
    backgroundColor: "blue",
    color: "#f2f2f2",
  },
});

export default Cadastrolista;
