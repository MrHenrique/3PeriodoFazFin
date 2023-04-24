import { getRealm } from "./realm";
import { Alert } from "react-native";
let createdGastos;
const writeGastos = async (data, rebID) => {
  const realm = await getRealm();
  try {
    realm.write(() => {
      const reb = realm.objects("RebanhoSchema").filtered(`_id= '${rebID}'`)[0];
      createdGastos = realm.create("DespesasSchema", data);
      reb.despesas.push(createdGastos);
    });
    Alert.alert("Dados cadastrados com sucesso!");
    console.log(createdGastos);
    return createdGastos;
  } catch (e) {
    Alert.alert("Erro", e.message);
  } realm.close();
};
export default writeGastos;
