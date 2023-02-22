import { getRealm } from "./realm";
import { Alert } from "react-native";
let createdFarm;
const writeFarm = async (data) => {
  const realm = await getRealm();
  try {
    realm.write(() => {
      createdFarm = realm.create("Farm", data);
    });
    Alert.alert("Dados cadastrados com sucesso!");
    return createdFarm;
  } catch (e) {
    Alert.alert("Erro", e.message);
  }realm.close()
};
export default writeFarm;
