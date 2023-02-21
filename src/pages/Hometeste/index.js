import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, TextInput, Button, Alert, ScrollView } from 'react-native';
import { getRealm } from '../../database/realm';
import uuid from 'react-native-uuid';

export default function Hometeste({ navigation, route }) {

    const [Dono, setDono] = useState("");
    const [Fazenda, setFazenda] = useState("");
    const [ListaFazenda, setListaFazenda] = useState([]);
    const [IDFAZ, setIDFAZ] = useState();


    const teste = [
        {
            "_id": "1",
            "name": "Fazenda1",
            "owner": "rafael",
            "ContaLeite": [
                {
                    "_id": "1",
                    "precoleite": "1",
                    "litros": "4",
                    "descricao": "augbfiyasgvfiyasfgv"
                },
                {
                    "_id": "14",
                    "precoleite": "4",
                    "litros": "6",
                    "descricao": "augbfiyasgvfiyasfgv"
                },
                {
                    "_id": "62",
                    "precoleite": "7",
                    "litros": "10",
                    "descricao": "augbfiyasgvfiyasfgv"
                },
            ],
        },
        {
            "_id": "2",
            "name": "Fazenda1",
            "owner": "rafael",
            "ContaLeite": [
                {
                    "_id": "1",
                    "precoleite": "1",
                    "litros": "4",
                    "descricao": "augbfiyasgvfiyasfgv"
                },
                {
                    "_id": "14",
                    "precoleite": "4",
                    "litros": "6",
                    "descricao": "augbfiyasgvfiyasfgv"
                },
                {
                    "_id": "62",
                    "precoleite": "7",
                    "litros": "10",
                    "descricao": "augbfiyasgvfiyasfgv"
                },
            ],
        },
        {
            "_id": "3",
            "name": "Fazenda1",
            "owner": "rafael",
            "ContaLeite": [
                {
                    "_id": "1",
                    "precoleite": "1",
                    "litros": "4",
                    "descricao": "augbfiyasgvfiyasfgv"
                },
                {
                    "_id": "14",
                    "precoleite": "4",
                    "litros": "6",
                    "descricao": "augbfiyasgvfiyasfgv"
                },
                {
                    "_id": "62",
                    "precoleite": "7",
                    "litros": "10",
                    "descricao": "augbfiyasgvfiyasfgv"
                },
            ],
        },
        {
            "_id": "4",
            "name": "Fazenda1",
            "owner": "rafael",
            "ContaLeite": [
                {
                    "_id": "1",
                    "precoleite": "1",
                    "litros": "4",
                    "descricao": "augbfiyasgvfiyasfgv"
                },
                {
                    "_id": "14",
                    "precoleite": "4",
                    "litros": "6",
                    "descricao": "augbfiyasgvfiyasfgv"
                },
                {
                    "_id": "62",
                    "precoleite": "7",
                    "litros": "10",
                    "descricao": "augbfiyasgvfiyasfgv"
                },
            ],
        },
    ]


    async function handleNewFazenda() {
        const realm = await getRealm();
        try {
            realm.write(() => {
                const created = realm.create("Farm", {
                    _id: uuid.v4(),
                    name: Fazenda,
                    owner: Dono,
                    createdAt: new Date(),
                    ContaLeite: [
                    ]

                });
                console.log(created);
            })
            Alert.alert("Chamado1", "Cadastro efetuado com sucesso!");

        } catch (e) {
            console.log(e)
            Alert.alert("Chamado2", "Cadastro Não efetuado!")

        } finally {
            realm.close();
        }

    }

    async function fetchfazendas() {
        const realm = await getRealm();
        try {
            const result = realm.objects("Farm").sorted("createdAt").toJSON();
            setListaFazenda(result)

        } catch (e) {
            console.log(e)

        } finally {
            realm.close();
        }

    }

    const renderItem = ({ item }) => {
        var idfazenda = item._id
        const contaleite = item.contaleite?.map((i) => {
            return (
                <View>
                    <Text>Contas:</Text>
                    <View >
                        <Text >
                            precoleite: {i.precoleite}, Litro de leite: {i.litros} descricao: {i.descricao}
                        </Text>
                    </View>
                </View>
            );
        });
        return (
            <View style={{ flex: 1, backgroundColor: "#f80", margin: 10, }}>
                <TouchableOpacity
                    onPress={() => {
                        /* 1. Navigate to the Details route with params */
                        navigation.navigate('Cadastro', {
                            idfaz: idfazenda,
                        });
                    }}
                >
                    <Text>Fazenda</Text>
                    <View>
                        <Text>
                            Nome: {item.name}, Dono: {item.owner}
                        </Text>
                    </View>
                    {contaleite}
                </TouchableOpacity>
            </View>
        );
    };

    useEffect(() => {
        fetchfazendas();
    }, [ListaFazenda])

    return (
        <View style={{ flex: 1, }}>
            <TextInput onChangeText={setFazenda}
                placeholder='Nome da Fazenda' />
            <TextInput onChangeText={setDono}
                placeholder='Nome do proprietario' />
            <Button onPress={handleNewFazenda} color={"#f2f"} title={"Cadastrar Fazenda"} />
            <Text>Selecionar Fazenda</Text>
            <FlatList
                data={ListaFazenda}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
        </View>
    );
}