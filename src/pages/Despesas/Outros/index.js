import * as React from "react";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import EstoqueOptions from "../../../components/Dropdown/EstoqueOptions";
import { useState, useContext } from "react";
import uuid from "react-native-uuid";
import { AuthContext } from "../../../contexts/auth";
import writeGastos from "../../../Realm/writeGastos";
import { useNavigation } from "@react-navigation/native";

export default function Outros() {
  const navigation = useNavigation();
  const [valorProdString, setValorProd] = useState("");
  const [nomeProd, setNomeProd] = useState("");
  const { rebID} = useContext(AuthContext);
  async function handleAddGastos() {
      const valorProd = Number(valorProdString);
      await writeGastos(
        {
          _id: uuid.v4(),
          createdAt: new Date(),
          nomeProd,
          valorProd,
          qtdProd: 1,
        },
        rebID
      );
      navigation.navigate("PagelancaContas");
  }
  return (
    <>
      <View>
        <Text>Cadastro de outras despesas.</Text>
        <View>
          <Text>{"Descrição:"}</Text>
          <TextInput
            value={nomeProd}
            onChangeText={setNomeProd}
            placeholder="Exemplo: Reforma pasto"
          />
        </View>
        <View>
          <Text>{"Total pago:"}</Text>
          <TextInput
            value={valorProdString}
            keyboardType="number-pad"
            onChangeText={setValorProd}
            placeholder="Exemplo: 10000.20"
          />
        </View>
      </View>
      <TouchableOpacity onPress={handleAddGastos}>
        <Text>{"Cadastrar"}</Text>
      </TouchableOpacity>
    </>
  );
}
