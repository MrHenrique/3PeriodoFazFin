import { getRealm } from "./realm";
import { Alert } from "react-native";
let createdvaca;
const writenewVaca = async (idrebanho, newVaca) => {
    const realm = await getRealm();
    try {
        const pesquisado = await realm.objects("RebanhoSchema").filtered(`_id= '${idrebanho}'`);
        let vacasnovas = [...pesquisado[0].vacas]
        vacasnovas.push(newVaca)
        //console.log(vacasnovas)
        realm.write(() => {
            createdvaca = realm.create("RebanhoSchema",
                {
                    _id: idrebanho,
                    vacas: vacasnovas,
                }
                , "modified");
        });
        Alert.alert("Informação alterada com sucesso!!")
    } catch (e) {
        Alert.alert("Erro", e.message);
    }
};
export default writenewVaca;
