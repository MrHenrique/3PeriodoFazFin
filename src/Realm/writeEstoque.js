import { getRealm } from "./realm";
import { Alert } from "react-native";
let createdEstoque;
const writeEstoque = async (data,fazID,nomeProd) => {
  const realm = await getRealm();
  try {
    realm.write(() => {
      const farm = realm.objects("Farm").filtered(`_id= '${fazID}'`);
      realm.delete(realm.objects("AtualEstoqueSchema").filtered(`nomeProd= '${nomeProd}'`))
      createdEstoque = realm.create("AtualEstoqueSchema", data,);
      farm[0].atualEstoque.push(createdEstoque);
    });
    return createdEstoque;
  } catch (e) {
    Alert.alert("Erro", e.message);
  }realm.close()
};
export default writeEstoque;
