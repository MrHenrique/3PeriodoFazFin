import { getRealm } from "./realm";
import { Alert } from "react-native";

let createdReceitas;
const writeLeite = async (data, vacaID) => {
  const realm = await getRealm();
  try {
    realm.write(() => {
      console.log(vacaID)
      const vaca = realm.objects("VacasSchema").filtered(`_id= '${vacaID}'`);
      createdReceitas = realm.create("LeiteSchema", data);
      vaca[0].receitas.push(createdReceitas);
    });
    Alert.alert("Dados cadastrados com sucesso!");
    return createdReceitas;
  } catch (e) {
    Alert.alert("Erro", e.message);
  }
  realm.close();
};
export default writeLeite;
