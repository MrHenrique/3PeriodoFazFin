import { View, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { Color } from "./styles";
import { useMainContext } from "../../contexts/RealmContext";
import { ReceitasTotais } from "../../components/Calculos DB/ReceitasTotais";
import { DespesasTotais } from "../../components/Calculos DB/DespesasTotais";
import { scale, verticalScale } from "react-native-size-matters";
//--
import { AuthContext } from "../../contexts/auth";

function PreviewFinanceiro({ Titulo, Id }) {
  const [Total, setTotal] = useState(0);

  const realm = useMainContext();
  const navigation = useNavigation();

  useEffect(() => {
    if (realm) {
      //receita Farm
      let dataReceitas = realm.objectForPrimaryKey("Farm", fazID);
      let receitas = [];
      dataReceitas.rebanhos.forEach((rebanho) => {
        receitas.push(...rebanho.receitas);
      });
      PrecoLeite(ReceitasTotais(receitas));
      dataReceitas.rebanhos.addListener((rebanhoResults) => {
        let newReceitas = [];
        rebanhoResults.forEach((rebanho) => {
          newReceitas.push(...rebanho.receitas);
        });
        PrecoLeite(ReceitasTotais(newReceitas));
      });
    }
    //receita Reb
    let dataReceitasreb = realm.objectForPrimaryKey("RebanhoSchema", rebID);
    PrecoLeiteReb(ReceitasTotais(dataReceitasreb.receitas));
    dataReceitasreb.receitas.addListener((values) => {
      PrecoLeiteReb(ReceitasTotais([...values]));
    });
    //despesas Farm
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
    //despesas Reb
    let dataDespesasReb = realm.objectForPrimaryKey("RebanhoSchema", rebID);
    PrecoCFReb(DespesasTotais(dataDespesasReb.despesas));
    dataDespesasReb.despesas.addListener((values) => {
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
    ShouldGoPageFinanceiro,
  } = useContext(AuthContext);

  //Funcoes para validar e renderizar
  function getDespesas() {
    if (Id === 1) {
      if (typeof precoCF !== "undefined") {
        return Number(precoCF);
      } else {
        return 0;
      }
    } else {
      if (typeof precoCFReb !== "undefined") {
        // console.log(precoCFReb);
        return Number(precoCFReb);
      } else {
        return 0;
      }
    }
  }
  function getReceitas() {
    if (Id === 1) {
      if (typeof precoLeite !== "undefined") {
        return Number(precoLeite);
      } else {
        return 0;
      }
    } else {
      if (typeof precoLeiteReb !== "undefined") {
        return Number(precoLeiteReb);
      } else {
        return 0;
      }
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
              ShouldGoPageFinanceiro(0);
              navigation.navigate("PageFinanceiro");
              break;
            case 2:
              ShouldGoPageFinanceiro(1);
              navigation.navigate("PageFinanceiro");
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
                { fontSize: setSize(formattedTotal, verticalScale(250)) },
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
                { fontSize: setSize(formattedReceitas, verticalScale(200)) },
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
                { fontSize: setSize(formattedDespesas, verticalScale(200)) },
              ]}
            >
              {formattedDespesas}
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
