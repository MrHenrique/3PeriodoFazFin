import { getRealm } from "./realm";
import { Alert } from "react-native";

async function getRebVacas(rebID) {
    const realm = await getRealm();
    console.log(rebID);
    try {
        const pesquisado = await realm.objects("RebanhoSchema").filtered(`_id= '${rebID}'`);
        //console.log(pesquisado[0].vacas, "eae");
        return pesquisado[0].vacas;
    } catch (e) {
        Alert.alert("Error", e.message);
    } realm.close();
}
export default getRebVacas;
