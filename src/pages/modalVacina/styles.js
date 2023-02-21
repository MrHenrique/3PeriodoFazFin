import styled from "styled-components/native";
export const Container = styled.SafeAreaView`
  background-color:#00290C ;
  flex: 1;
  
`;
export const Texto = styled.Text`
  padding-top: 40px;  
  font-weight: bold;
  font-size: 18px;
  display: flex;
  text-align: center;
  color: #ffffff;
`;export const AreaCont = styled.View`
align-items: center;
justify-content: center;
`;
export const CampoTexto = styled.TextInput`
  background-color: white;
  color:black;
  width:300px;
  height:40px;
  text-align: center;
  border-radius: 10px;
`;
export const BotaoPress = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background: rgba(15, 109, 0, 0.9);
  width: 360px;
  height: 40px;
  bottom: -70px;
  margin: 10px;
`;
export const TituloBotao = styled.Text`
  font-size: 16px;
  line-height: 21px;
  font-weight: bold;
  letter-spacing: 0.25px;
  color: white;
`;