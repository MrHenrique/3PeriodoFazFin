import { getRealm } from "./realm";
import { Alert } from "react-native";
async function getAllLeite(fazID) {
  let testes = [];
  const realm = await getRealm();
  try {
    const data = realm.objects("Farm").filtered(`_id= '${fazID}'`);
    for (var i in data[0].rebanhos) {
      for (var j in data[0].rebanhos[i].vacas) {
        for (var k in data[0].rebanhos[i].vacas[j].receitas)
          testes.push(data[0].rebanhos[i].vacas[j].receitas[k]);
      }
    }
    return testes;
  } catch (e) {
    Alert.alert("Error", e.message);
  }
  realm.close();
}
export default getAllLeite;
