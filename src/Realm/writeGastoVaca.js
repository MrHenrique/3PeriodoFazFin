import { getRealm } from "./realm";
import { Alert } from "react-native";

const writeGastoVaca = async (rebID, gastos2) => {
  const realm = await getRealm();
  try {
    realm.write(() => {
      const rebanho = realm
        .objects("RebanhoSchema")
        .filtered(`_id= '${rebID}'`)[0];
      for (const cows of rebanho.vacas) {
        for (var i in rebanho.vacas) {
          cows.gastosV = gastos2[i];
          console.log(rebanho.vacas[i].gastosV);
        }
      }
    });

    Alert.alert("Dados cadastrados com sucesso!");
  } catch (e) {
    Alert.alert("Erro", e.message);
  }
  realm.close();
};
export default writeGastoVaca;
