import { View, TouchableOpacity, Text, Alert } from "react-native";
import React, { useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { Color } from "./styles";
import { useMainContext } from "../../contexts/RealmContext";
import { ReceitasTotais } from "../../components/Calculos DB/ReceitasTotais";
import { DespesasTotais } from "../../components/Calculos DB/DespesasTotais";
//--
import { AuthContext } from "../../contexts/auth";

function PreviewFinanceiro({ Titulo, Id }) {
  const realm = useMainContext();
  const navigation = useNavigation();
  useEffect(() => {
    switch (Id) {
      case 1:
        if (realm) {
          let dataReceitas = realm.objectForPrimaryKey("Farm", fazID);
          let receitas = [];
          dataReceitas.rebanhos.forEach((rebanho) => {
            rebanho.vacas.forEach((vaca) => {
              receitas.push(...vaca.receitas);
            });
          });
          PrecoLeite(ReceitasTotais(receitas));
          ListaLeite(receitas);
          dataReceitas.rebanhos.addListener((rebanhoResults) => {
            let newReceitas = [];
            rebanhoResults.forEach((rebanho) => {
              rebanho.vacas.forEach((vaca) => {
                newReceitas.push(...vaca.receitas);
              });
            });
            PrecoCF(ReceitasTotais(newReceitas));
            ListaLeite(newReceitas);
          });
        }
        break;
      case 2:
        if (realm) {
          let dataReceitas = realm.objectForPrimaryKey("RebanhoSchema", rebID);
          let receitas = [];
          dataReceitas.vacas.forEach((vaca) => {
            receitas.push(...vaca.receitas);
          });
          PrecoLeiteReb(ReceitasTotais(receitas));
          ListaLeiteReb(receitas);
          let newReceitas = [];
          dataReceitas.vacas.addListener((values) => {
            values.forEach((vaca) => {
              newReceitas.push(...vaca.receitas);
            });
            PrecoCFReb(ReceitasTotais(newReceitas));
            ListaLeiteReb(newReceitas);
          });
        }
        break;
      default:
        Alert.alert("erro na busca de dados, consultar desenvolvedor");
        break;
    }
  }, [realm]);
  useEffect(() => {
    switch (Id) {
      case 1:
        if (realm) {
          let dataDespesas = realm.objectForPrimaryKey("Farm", fazID);
          let despesas = [];
          dataDespesas.rebanhos.forEach((rebanho) => {
            despesas.push(...rebanho.despesas);
          });
          PrecoCF(DespesasTotais(despesas));
          ListaAli(despesas);
          dataDespesas.rebanhos.addListener((rebanhoResults) => {
            let newDespesas = [];
            rebanhoResults.forEach((rebanho) => {
              newDespesas.push(...rebanho.despesas);
            });
            PrecoCF(DespesasTotais(newDespesas));
            ListaAli(newDespesas);
          });
        }
        break;
      case 2:
        if (realm) {
          let dataGastos = realm.objectForPrimaryKey("RebanhoSchema", rebID);
          PrecoCFReb(DespesasTotais(dataGastos.despesas));
          ListaAliReb(dataGastos.despesas);
          dataGastos.despesas.addListener((values) => {
            PrecoCFReb(DespesasTotais([...values]));
          });
          ListaAliReb(dataGastos.despesas);
        }
        break;
      default:
        Alert.alert("erro na busca de dados, consultar desenvolvedor");
        break;
    }
  }, [realm]);

  const {
    precoCF,
    PrecoCF,
    ListaAli,
    fazID,
    rebID,
    ListaLeite,
    precoLeite,
    PrecoLeite,
    ListaAliReb,
    PrecoCFReb,
    precoCFReb,
    ListaLeiteReb,
    PrecoLeiteReb,
    precoLeiteReb,
    idPageFinanceiro,
    IdPageFinanceiro,
  } = useContext(AuthContext);

  //Funcoes para validar e renderizar
  function getDespesas() {
    switch (Id) {
      case 1:
        if (typeof precoCF !== "undefined") {
          return Number(precoCF);
        } else {
          return 0;
        }
        break;
      case 2:
        if (typeof precoCFReb !== "undefined") {
          // console.log(precoCFReb);
          return Number(precoCFReb);
        } else {
          return 0;
        }
        break;
    }
  }
  function getReceitas() {
    switch (Id) {
      case 1:
        if (typeof precoLeite !== "undefined") {
          return Number(precoLeite);
        } else {
          return 0;
        }
        break;
      case 2:
        if (typeof precoLeiteReb !== "undefined") {
          return Number(precoLeiteReb);
        } else {
          return 0;
        }
        break;
    }
  }
  function getTotal(despesas, receitas) {
    if (despesas !== "0" || receitas !== "0") {
      return Number(receitas - despesas);
    } else {
      return 0;
    }
  }
  // variaveis para rendering
  const total = getTotal(getDespesas(), getReceitas());
  const despesas = getDespesas();
  const receitas = getReceitas();
  function setSize(text, width) {
    var fontSize = width / text.toString().length;
    var maxSize = width / 10;
    fontSize = Math.min(fontSize, maxSize);
    return fontSize;
  }
  return (
    <View style={styles.geralfaz}>
      <TouchableOpacity
        style={styles.bannerButton}
        onPress={() => {
          switch (Id) {
            case 1:
              navigation.navigate("PageFinanceiro");
              IdPageFinanceiro(0);
              break;
            case 2:
              navigation.navigate("PageFinanceiro");
              IdPageFinanceiro(1);
              break;
          }
        }}
      >
        <Text style={styles.textoBannerTitulo}>{Titulo}</Text>
        <View style={styles.containerGeralFinan}>
          <Text style={styles.textoBannerRes}>{"Saldo Total: "}</Text>

          <View
            style={[
              styles.containerSaldoTotal,
              { borderBottomColor: Color(total) },
            ]}
          >
            <Text style={styles.textoRS}>R$ </Text>
            <Text
              style={[
                styles.textResultsPrice,
                { fontSize: setSize(total.toFixed(2), 250) },
              ]}
            >
              {total.toFixed(2)}
            </Text>
          </View>
          <View style={styles.textoBannerCat}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.bolareceita}></View>
              <Text style={styles.textoBanner}>{"Receitas"}</Text>
            </View>
            <Text
              style={[
                styles.textoBannerRec,
                { fontSize: setSize(receitas.toFixed(2), 200) },
              ]}
            >
              {receitas.toFixed(2)}
            </Text>
          </View>
          <View style={styles.textoBannerCat}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.boladespesa}></View>
              <Text style={styles.textoBanner}>{"Despesas "}</Text>
            </View>
            <Text
              style={[
                styles.textoBannerDes,
                { fontSize: setSize(despesas.toFixed(2), 200) },
              ]}
            >
              {despesas.toFixed(2)}
            </Text>
          </View>
          <Text style={styles.bannerText}>
            {"Clique aqui para mais detalhes"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default PreviewFinanceiro;
