import { getRealm } from "./realm";
import { Alert } from "react-native";
async function getAllEstoque(fazID) {
  let testes = [];
  const realm = await getRealm();
  try {
    const data = realm.objects("Farm").filtered(`_id= '${fazID}'`);
    for (var i in data[0].atualEstoque) {
      {
        testes.push(data[0].atualEstoque[i]);
      }
    }
    return testes;
  } catch (e) {
    Alert.alert("Error", e.message);
  }
  realm.close();
}
export default getAllEstoque;
