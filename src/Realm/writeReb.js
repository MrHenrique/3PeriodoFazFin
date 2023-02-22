import { getRealm } from "./realm";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { Alert } from "react-native";
let createdReb;
const writeReb = async (data, fazID) => {
  const realm = await getRealm();
  try {
    realm.write(() => {
      const farm = realm.objects("Farm").filtered(`_id= '${fazID}'`);
      createdReb = realm.create("RebanhoSchema", data);
      farm[0].rebanhos.push(createdReb);
    });
    Alert.alert("Dados cadastrados com sucesso!");
    return createdReb;
  } catch (e) {
    Alert.alert("Erro", e.message);
  }
  realm.close();
};
export default writeReb;
