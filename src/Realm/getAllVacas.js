import { getRealm } from "./realm";
import { Alert } from "react-native";

async function getAllVacas(rebID) {
  let testes = [];
  const realm = await getRealm();
  try {
    const data = realm.objects("RebanhoSchema").filtered(`_id= '${rebID}'`);
    for (var i in data[0].vacas) {
      testes.push(data[0].vacas[i]);
    }
    return testes;
  } catch (e) {
    Alert.alert("Error", e.message);
  }
  realm.close();
}
export default getAllVacas;
