import * as React from "react";
import { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  FlatList,
  TextInput,
  Platform,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BezierChartFaturamentoReb from "../../../components/Graficos/BezierChartFaturamentoReb";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropdownComponentMes from "../../../components/Dropdown/FiltroMes";
import { scale, verticalScale } from "react-native-size-matters";
import Modal from "react-native-modal";
import { AuthContext } from "../../../contexts/auth";
function FaturamentoReb() {
  const { precoCFReb, listaAliReb, listaLeiteReb, precoLeiteReb } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [lista, setLista] = useState(listaLeiteReb);
  const [startDate, setStartDate] = useState('');  //Filtro Intervalo entre datas
  const [textStartDate, setTextStartDate] = useState('Data Inicial'); //Filtro Intervalo entre datas
  const [endDate, setEndDate] = useState(''); //Filtro Intervalo entre datas
  const [textEndDate, setTextEndDate] = useState('Data Final'); //Filtro Intervalo entre datas
  const [specificDate, setSpecificDate] = useState(null);
  const [textSpecificDate, setTextSpecificDate] = useState('Data Especifica'); //Filtro data especifica
  const [isStartDatePickerVisible, setIsStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);
  const [isSpecificDatePickerVisible, setIsSpecificDatePickerVisible] = useState(false);
  const { filtroMes } = useContext(AuthContext); 

  //Filtro por mês
  useEffect(() => {
    const listaFiltradaMes = listaLeiteReb.filter((item) =>{ //pega todos os itens da lista que foi puxada da (listaLeiteReb)
      const itemDataDeCriacao = new Date(item.createdAt); //cria uma nova data com a data do (createdAt do item) e atribui a variavel itemDataDeCriacao
      return itemDataDeCriacao.getMonth() === filtroMes - 1; // verifica se o mês do item é igual ao escolhido pelo usuário
    });
    setLista(listaFiltradaMes);
  }, [filtroMes]);

  //Codigo do DateTimePickerModal 
  //Data Inicial
  const showStartDatePicker = () => {
    setIsStartDatePickerVisible(true);
  };
  const hideStartDatePicker = () => {
    setIsStartDatePickerVisible(false);
  };
  const handleStartDateConfirm = (dateStart) => {
    let tempDateStart = new Date(dateStart);
    let fDateStart = tempDateStart.getDate().toString().padStart(2, '0') + 
    '/' + 
    (tempDateStart.getMonth() + 1).toString().padStart(2, '0') + 
    '/' + 
    tempDateStart.getFullYear();
    setTextStartDate(fDateStart)
    setStartDate(dateStart);
    hideStartDatePicker();
  };

  //Data Final
  const showEndDatePicker = () => {
    setIsEndDatePickerVisible(true);
  };
  const hideEndDatePicker = () => {
    setIsEndDatePickerVisible(false);
  };
  const handleEndDateConfirm = (dateEnd) => {
    let tempDateEnd = new Date(dateEnd);
    let fDateEnd = tempDateEnd.getDate().toString().padStart(2, '0') + 
      '/' + 
      (tempDateEnd.getMonth() + 1).toString().padStart(2, '0') + 
      '/' + 
      tempDateEnd.getFullYear();
    setTextEndDate(fDateEnd)
    setEndDate(dateEnd);
    hideEndDatePicker();
  };

  //Data especifica
  const showSpecificDatePicker = () => {
    setIsSpecificDatePickerVisible(true);
  };
  const hideSpecificDatePicker = () => {
    setIsSpecificDatePickerVisible(false);
  };
  const handleSpecificDateConfirm = (selectedDate) => {
    let tempSpecificDate = new Date(selectedDate);
    let fSpecificDate = tempSpecificDate.getDate().toString().padStart(2, '0') + 
    '/' + 

    (tempSpecificDate.getMonth() + 1) .toString().padStart(2, '0') + 
    '/' + 
    tempSpecificDate.getFullYear().toString().padStart(2, '0');
    setTextSpecificDate(fSpecificDate);
    setSpecificDate(selectedDate);
    hideSpecificDatePicker();
  };
  //FIM

  //Código para retornar uma lista do intevalo selecionado pelo usuário (FILTRO INTERVALO ENTRE DATAS)
  const filtrarIntervalo = () => {
    const listaFiltradaIntervalo = listaLeiteReb.filter((item) =>{ //pega todos os itens da lista que foi puxada da (listaLeiteReb)
      const itemDataDeCriacao = new Date(item.createdAt); //cria uma nova data com a data do (createdAt do item) e atribui a variavel itemDataDeCriacao
      const dataInicio = new Date(startDate); //pega a data de inicio escolhida pelo usuario
        dataInicio.setHours(0, 0, 0);  //ajusta o horario para 00:00:00 para garantir que a data de inicio seja no começo do dia.
      const dataFim = new Date(endDate); //pega a data final escolhida pelo usuario
        dataFim.setHours(23, 59, 59); //ajusta o horario para 23:59:59 para garantir que a data final sejá no final do dia.
      return (itemDataDeCriacao.getTime() >= dataInicio.getTime() &&
        itemDataDeCriacao.getTime() <= dataFim.getTime());
    });
    setLista(listaFiltradaIntervalo);
  }

  //Código para retornar uma lista com a data Especifica selecionada pelo usuario (FILTRO POR DATA ESPECIFICA)
  useEffect(() => {
    if (specificDate === null) {
      setLista(listaLeiteReb);
    } else {
      setLista(
        listaLeiteReb.filter(item => {
          const itemDataDeCriacao = new Date(item.createdAt); // converte a string de data do item para um objeto Date
          const specificDateObj = new Date(specificDate); // converte a string de busca para um objeto Date
          return itemDataDeCriacao.getDate() === specificDateObj.getDate() // verifica se o dia é igual
            && itemDataDeCriacao.getMonth() === specificDateObj.getMonth() // verifica se o mês é igual
            && itemDataDeCriacao.getFullYear() === specificDateObj.getFullYear(); // verifica se o ano é igual
        })
      );
    }
  }, [specificDate]);
  //FIM

  function toggleModal() {
    setModalVisible(!isModalVisible);
  }
  const imgbg1 = "../../../../assets/bg2.jpg";
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.listaDet}>
        <Text style={styles.tituloBotao}>
          {item.createdAt.getDate().toString().padStart(2, 0)}/
          {(item.createdAt.getMonth() + 1 ).toString().padStart(2, 0)}/
          {item.createdAt.getFullYear().toString()} - {item.description} - R$ {(item.prodL * item.precoL).toFixed(2)}
        </Text>
      </TouchableOpacity>
    );
  };
  function getReceitas() {
    if (typeof precoLeiteReb !== "undefined") {
      return Number(precoLeiteReb);
    } else {
      return 0;
    }
  }
  const receitas = getReceitas();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgbg}
        source={require(imgbg1)}
        imageStyle={{ opacity: 0.3 }}
      >
        <TouchableOpacity
          onPress={() => {
            toggleModal();
          }}
        >
          <Text style={styles.texto}>Total de receitas:</Text>
          <Text style={styles.textoValorPos}>R${receitas.toFixed(2)}</Text>
          <View style={styles.lineStyle} />
          <Text style={styles.preGraf}>Clique no gráfico para mais detalhes.</Text>
          <View style={styles.containerChart}>
            <BezierChartFaturamentoReb />
          </View>
          <Modal
            isVisible={isModalVisible}
            coverScreen={true}
            backdropColor={"rgba(234,242,215,0.8)"}
            animationIn="slideInUp"
            animationOut="slideOutDown"
          >
            <View style={styles.modalContainer}>
              <Text style={styles.tituloModal}>Detalhes de receitas:</Text>


            <DropdownComponentMes />
              {/*Filtro intervalo entre datas*/}
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity 
                  style={{flex: 1, backgroundColor: "gray", borderRadius: 30, width: '50%', height: 30}}
                  onPress={showStartDatePicker}>
                  <Text style={{ textAlign: "center"}} >{textStartDate}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isStartDatePickerVisible}
                  mode="date"
                  onConfirm={handleStartDateConfirm}
                  onCancel={hideStartDatePicker}
                />

                <TouchableOpacity 
                  style={{flex: 1, backgroundColor: "#888", borderRadius: 30, width: '50%', height: 30}}
                  onPress={showEndDatePicker}>
                  <Text style={{ textAlign: "center"}} >{textEndDate}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isEndDatePickerVisible}
                  mode="date"
                  onConfirm={handleEndDateConfirm}
                  onCancel={hideEndDatePicker}
                />
                <TouchableOpacity 
                  style={{flex: 1, backgroundColor: "gray", borderRadius: 30, width: '50%', height: 30}}
                  onPress={filtrarIntervalo}>
                  <Text style={{ textAlign: "center"}} >Filtrar</Text>
                </TouchableOpacity>
              </View>

              {/*Filtro data especifica*/}
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity 
                  style={{flex: 1, backgroundColor: "gray", borderRadius: 30, width: '50%', height: 30}}
                  onPress={showSpecificDatePicker}>
                  <Text style={{ textAlign: "center"}} >{textSpecificDate}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isSpecificDatePickerVisible}
                  mode="date"
                  onConfirm={handleSpecificDateConfirm}
                  onCancel={hideSpecificDatePicker}
                />
                <TouchableOpacity 
                  style={{flex: 1, backgroundColor: "gray", borderRadius: 30, width: '50%', height: 30}}
                  onPress={() => {
                    setSpecificDate(null);
                    setTextSpecificDate('Selecione a Data');
                    setLista(listaLeiteReb);
                    }
                  }>
                  <Text style={{ textAlign: "center"}} >Limpar</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                style={styles.scroll}
                data={lista}
                renderItem={renderItem}
                keyExtractor={item => item._id}
              />
            </View>
            <TouchableOpacity
              style={styles.botaopressM}
              onPress={() => {
                toggleModal();
              }}
            >
              <Text style={styles.tituloBotao}>{"Voltar"}</Text>
            </TouchableOpacity>
          </Modal>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaopress}
          onPress={() => navigation.navigate("GeralReb")}
        >
          <Text style={styles.tituloBotao}>{"Voltar"}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  preGraf:{
    color: 'white',
    alignSelf: 'center',

  },
  modalContainer: {
    backgroundColor: "rgba(234,242,215,1)",
    position: "absolute",
    top: verticalScale(0),
    alignSelf: "center",
    width: scale(330),
    borderRadius: 20,
  },
  modalScroll: {
    height: verticalScale(500),
    marginVertical: verticalScale(10),
  },
  container: {
    backgroundColor: "#006773",
    flex: 1,
  },
  lineStyle: {
    backgroundColor: "#FFF",
    padding: verticalScale(0.4),
    width: scale(310),
    alignSelf: "center",
    margin: verticalScale(6),
  },
  containerChart: {
    position: "absolute",
    top: verticalScale(150),
  },
  botaopress: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(530),
    position: "absolute",
  },
  tituloBotao: {
    fontSize: verticalScale(14),
    fontWeight: "bold",
    color: "#fff",
  },
  tituloModal: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: "rgba(0, 69, 19, 0.95)",
    margin: verticalScale(5),
    alignSelf: "center",
  },
  imgbg: {
    flex: 1,
    resizeMode: "cover",
    padding: verticalScale(10),
  },
  textoValorNeg: {
    color: "#FF3131",
    fontWeight: "bold",
    fontSize: verticalScale(30),
    marginLeft: scale(20),
  },
  texto: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: verticalScale(25),
    marginLeft: scale(20),
  },
  textoValorPos: {
    color: "#0FFF50",
    fontWeight: "bold",
    fontSize: verticalScale(30),
    marginLeft: scale(20),
  },
  botaopressM: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: verticalScale(583),
    position: "absolute",
  },
  listaDet: {
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.95)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: verticalScale(5),
  },
  listaDet2: {
    borderRadius: 20,
    backgroundColor: "rgba(0, 69, 19, 0.95)",
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: verticalScale(5),
  },
  scroll: {
    height: verticalScale(525),
  },
});
export default FaturamentoReb;
