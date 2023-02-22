import { getRealm } from "./realm";
import { Alert } from "react-native";

async function getAllFarm() {
  const realm = await getRealm();
  try {
    return realm.objects("Farm").sorted("createdAt");
  } catch (e) {
    Alert.alert("Error", e.message);
  } realm.close();
}
export default getAllFarm;
