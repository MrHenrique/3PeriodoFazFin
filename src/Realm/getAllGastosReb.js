import { getRealm } from "./realm";
import { Alert } from "react-native";
async function getAllGastosReb(rebID) {
  let testes = [];
  const realm = await getRealm();
  try {
    const data = realm.objects("RebanhoSchema").filtered(`_id= '${rebID}'`);
    for (var i in data[0].despesas) {
      testes.push(data[0].despesas[i]);
    }
    return testes.sort((a, b) => a.createdAt - b.createdAt);
  } catch (e) {
    Alert.alert("Error", e.message);
  }
  realm.close();
}
export default getAllGastosReb;