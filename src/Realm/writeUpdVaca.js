import { getRealm } from "./realm";
import { Alert } from "react-native";
let createdvaca;
const writeUpdVaca = async (data) => {
  const realm = await getRealm();
  try {
    realm.write(() => {
      createdvaca = realm.create("VacasSchema", data, "modified");
    });
    Alert.alert("Informação alterada com sucesso!!")
  } catch (e) {
    Alert.alert("Erro", e.message);
  }
};
export default writeUpdVaca;
