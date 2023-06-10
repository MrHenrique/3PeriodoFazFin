import { StyleSheet } from "react-native";
import { Buttons, Colors, Fonts, TextInput } from "../../../styles";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  teste: {
    paddingHorizontal: scale(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  containerTextList: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.darkgreen,
  },
  filtros: {
    alignSelf: "center",
    width: scale(300),
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 10,
    margin: 10,
    position: "absolute",
    top: verticalScale(65),
  },
  filtrosBotao: {
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  lista: {
    flex: 1,
    marginTop: 10,
    marginBottom: 40,
  },
  botaopress: {
    borderRadius: 20,
    backgroundColor: Colors.green,
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
    color: Colors.white,
  },
  listaDet: {
    borderRadius: 20,
    backgroundColor: Colors.green,
    width: scale(300),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: verticalScale(5),
    elevation: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: scale(10),
  },
  editButton: {
    paddingHorizontal: scale(2),
    //backgroundColor: "red",
  },
  deleteButton: {
    paddingHorizontal: scale(2),
    //backgroundColor: "blue",
  },
  itemText: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    fontSize: verticalScale(14),
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  indicador: {
    padding: scale(8),
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    width: scale(10),
    height: scale(34),
  },

  textovoltar: {
    fontSize: verticalScale(14),
    fontWeight: "bold",
    color: "#fff",
  },
  tituloinfo: {
    color: "white",
    fontSize: scale(20),
    fontWeight: "bold",
  },
  tituloDetalhes: {
    color: "black",
    fontSize: verticalScale(20),
    marginBottom: verticalScale(10),
    textAlign: "center",
    fontWeight: "bold",
  },

  detalhe: {
    fontSize: verticalScale(20),
    color: "black",
    backgroundColor: "white",
    borderRadius: verticalScale(5),
    marginBottom: verticalScale(20),
    textAlign: "center",
  },
  containerinfos: {
    marginVertical: verticalScale(5),
    padding: verticalScale(5),
    backgroundColor: Colors.green,
    borderRadius: 20,
    alignSelf: "center",
    width: scale(280)
  },

  textavatar: {
    borderWidth: 1,
    borderColor: "red",
    fontSize: 24,
    paddingLeft: scale(10),
  },
  modalContainer: {
    flex: 1,
    borderRadius: 10,
    margin: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "18%",
  },
  containerDetalhes: {
    width: scale(300),
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  modalContainerBotoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContent: {
    fontSize: 20,
  },
  modalContainerText: {
    width: "100%",
    padding: 5,
  },
  botaopressM: {
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: "rgba(15, 109, 0, 0.9)",
    width: "50%",
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  containergeral: {
    flex: 1,
    margin: scale(15),
    backgroundColor: Colors.darkgreen,
  },
  containergeralmodal: {
    flex: 1,
    padding: scale(20),
    backgroundColor: Colors.darkgreen,
  },
});
// estilo tab
export const estilo = {
  tabarlabel: {
    color: Colors.white,
    ...Fonts.txtMedium,
  },
  tabBarIndicator: {
    backgroundColor: Colors.white,
  },
};
export default styles;
