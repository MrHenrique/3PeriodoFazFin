import { getRealm } from "./realm";
import { Alert } from "react-native";
async function getAllEstoqueFiltered(fazID, name) {
  let testes = [];
  let stringNome = name
  const realm = await getRealm();
  try {
    const data = realm.objects("Farm").filtered(`_id= '${fazID}'`);
    const dataEstoque = data[0].atualEstoque.filter(function (nome) {
      return nome.nomeProd == stringNome;
    });
    testes.push(dataEstoque[0]);
    console.log(testes[0])
    return testes[0];
  } catch (e) {
    Alert.alert("Error", e.message);
  }
  realm.close();
}
export default getAllEstoqueFiltered;
