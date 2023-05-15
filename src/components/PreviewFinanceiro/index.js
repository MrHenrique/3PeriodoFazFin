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
    if (realm) {
      let dataReceitas = realm.objectForPrimaryKey("Farm", fazID);
      let receitas = [];
      dataReceitas.rebanhos.forEach((rebanho) => {
        rebanho.vacas.forEach((vaca) => {
          receitas.push(...vaca.receitas);
        });
      });
      PrecoLeite(ReceitasTotais(receitas));
      dataReceitas.rebanhos.addListener((rebanhoResults) => {
        let newReceitas = [];
        rebanhoResults.forEach((rebanho) => {
          rebanho.vacas.forEach((vaca) => {
            newReceitas.push(...vaca.receitas);
          });
        });
        PrecoLeite(ReceitasTotais(newReceitas));
      });
    }
    let dataReceitasreb = realm.objectForPrimaryKey("RebanhoSchema", rebID);
    let receitasreb = [];
    dataReceitasreb.vacas.forEach((vaca) => {
      receitasreb.push(...vaca.receitas);
    });
    PrecoLeiteReb(ReceitasTotais(receitasreb));
    let newReceitasreb = [];
    dataReceitasreb.vacas.addListener((values) => {
      values.forEach((vaca) => {
        newReceitasreb.push(...vaca.receitas);
      });
      PrecoLeiteReb(ReceitasTotais(newReceitasreb));
    });
    let dataDespesas = realm.objectForPrimaryKey("Farm", fazID);
    let despesas = [];
    dataDespesas.rebanhos.forEach((rebanhos) => {
      despesas.push(...rebanhos.despesas);
    });
    PrecoCF(DespesasTotais(despesas));
    dataDespesas.rebanhos.addListener((rebanhoResults) => {
      let newDespesas = [];
      rebanhoResults.forEach((rebanhos) => {
        newDespesas.push(...rebanhos.despesas);
      });
      PrecoCF(DespesasTotais(newDespesas));
    });
    let dataGastos = realm.objectForPrimaryKey("RebanhoSchema", rebID);
    PrecoCFReb(DespesasTotais(dataGastos.despesas));
    dataGastos.despesas.addListener((values) => {
      PrecoCFReb(DespesasTotais([...values]));
    });
  }, [realm]);

  const {
    precoCF,
    PrecoCF,
    fazID,
    rebID,
    precoLeite,
    PrecoLeite,
    PrecoCFReb,
    precoCFReb,
    PrecoLeiteReb,
    precoLeiteReb,
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
  const total = getTotal(getDespesas(), getReceitas()).toFixed(2);
  const formattedTotal = `${total.replace(".", ",")}`;
  const despesas = getDespesas().toFixed(2);
  const formattedDespesas = `R$ ${despesas.replace(".", ",")}`;
  const receitas = getReceitas().toFixed(2);
  const formattedReceitas = `R$ ${receitas.replace(".", ",")}`;
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
              { borderBottomColor: Color(formattedTotal) },
            ]}
          >
            <Text style={styles.textoRS}>R$ </Text>
            <Text
              style={[
                styles.textResultsPrice,
                { fontSize: setSize(formattedTotal, 250) },
              ]}
            >
              {formattedTotal}
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
                { fontSize: setSize(formattedReceitas, 200) },
              ]}
            >
              {formattedReceitas}
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
                { fontSize: setSize(formattedDespesas, 200) },
              ]}
            >
              {formattedDespesas}</Text>
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
