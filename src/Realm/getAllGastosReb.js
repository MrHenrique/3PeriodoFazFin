import { getRealm } from "./realm";
import { Alert } from "react-native";
async function getAllGastos(rebID) {
  let testes = [];
  const realm = await getRealm();
  try {
    const data = realm.objects("RebanhoSchema").filtered(`_id= '${rebID}'`);
    for (var i in data[0].gastos) {
      testes.push(data[0].gastos[i]);
    }
    return testes;
  } catch (e) {
    Alert.alert("Error", e.message);
  }
  realm.close();
}
export default getAllGastos;