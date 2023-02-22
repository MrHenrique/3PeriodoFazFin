import { getRealm } from "./realm";
import { Alert } from "react-native";
async function getAllGastos(fazID) {
  let testes = [];
  const realm = await getRealm();
  try {
    const data = realm.objects("Farm").filtered(`_id= '${fazID}'`);
    for (var i in data[0].rebanhos) {
      for (var j in data[0].rebanhos[i].gastos) {
        testes.push(data[0].rebanhos[i].gastos[j]);
      }
    }
    return testes;
  } catch (e) {
    Alert.alert("Error", e.message);
  }
  realm.close();
}
export default getAllGastos;
