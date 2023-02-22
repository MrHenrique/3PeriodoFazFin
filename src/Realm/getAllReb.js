import { getRealm } from "./realm";
import { Alert } from "react-native";
import { AuthContext } from "../contexts/auth";
import { useContext } from "react";
async function getAllReb(fazID) {
  const realm = await getRealm();
  try {
    const data = realm.objects("Farm").filtered(`_id= '${fazID}'`);
    return data[0].rebanhos
  } catch (e) {
    Alert.alert("Error", e.message);
  } realm.close();
}
export default getAllReb;
