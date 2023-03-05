import { getRealm } from "./realm";
import { Alert } from "react-native";
let createdEstoqueEntrada;
const writeEstoqueEntrada = async (data,fazID) => {
  const realm = await getRealm();
  try {
    realm.write(() => {
      const farm = realm.objects("Farm").filtered(`_id= '${fazID}'`);
      createdEstoqueEntrada = realm.create("EstoqueEntradaSchema", data);
      farm[0].entradaEstoque.push(createdEstoqueEntrada);
    });
    Alert.alert("Dados cadastrados com sucesso!");
    return createdEstoqueEntrada;
  } catch (e) {
    Alert.alert("Erro", e.message);
  }realm.close()
};
export default writeEstoqueEntrada;
