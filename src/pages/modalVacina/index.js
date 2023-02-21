import React, { useState } from "react";
import {
    AreaCont,
    Texto,
    Container,
    CampoTexto,
    
} from "./styles.js";
import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { scale, verticalScale } from "react-native-size-matters";
import Select from "../../components/Select";
import { rebanhos } from "../../components/Select/data";
import Modal from "react-native-modal";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("screen").width;
const ScreenHeight = Dimensions.get("screen").height;

function modalVacina() {

    const [visivel, setVisivel] = useState(false)
    const [visivel2, setVisivel2] = useState(false)
    const [visivel3, setVisivel3] = useState(false)
    const imgbg1 = "../../../assets/bg1.jpg";

    return (
        <View style={styles.containermodal} >

            <Modal
                animationType="fade"


                backdropColor={"#00290C"}
                visible={visivel}
                style={{ margin: 20, borderRadius: 20 }}
                statusBarTranslucent
                deviceHeight={ScreenHeight}
                deviceWidth={ScreenWidth}
                
            >
                

                    <Container>

                        <AreaCont>
                            <View style={styles.stiloModal }>
                                
                                <TouchableOpacity style={styles.botaoPress5}>
                                    <Text style={styles.tituloBotao}>
                                    
                                        {"Preço do Remedio/Vacina"}
                                    </Text>
                                    <CampoTexto placeholder=""></CampoTexto>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.botaoPress6}>
                                    <Text style={styles.tituloBotao}>
                                        
                                        {"Quantidade"}
                                    </Text>
                                        <CampoTexto placeholder=""></CampoTexto>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.botaoPress7}>
                                    <Text style={styles.tituloBotao}>
                                        
                                        {"Volume por frasco(ou ml)"}
                                    </Text>
                                        <CampoTexto placeholder=""></CampoTexto>
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={styles.botaoPress8}>
                                <Texto>Selecionar rebanho vacinado</Texto>
                                <Select
                                    touchableText="Selecione seu rebanho"
                                    title="Rebanhos"
                                    objKey="code"
                                    objValue="name"
                                    data={rebanhos}
                                />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.botaovoltar}
                                    onPress={() => { setVisivel(false) }}
                                >
                                    <Text style={styles.textovoltar}>Voltar</Text>
                                </TouchableOpacity>
                            </View>    
                        </AreaCont>

                    </Container>
                
            </Modal>
            <Modal
                animationType="fade"


                backdropColor={"#00290C"}
                visible={visivel2}
                style={{ margin: 20, borderRadius: 20 }}
                statusBarTranslucent
                deviceHeight={ScreenHeight}
                deviceWidth={ScreenWidth}
            >
                <Container>
                    <AreaCont>
                        
                        <TouchableOpacity style={styles.botaoPress5}>
                            <Text style={styles.tituloBotao}>
                               
                                {"Quantidade"}
                            </Text>
                            <CampoTexto placeholder=""></CampoTexto>
                        </TouchableOpacity>
                       
                        <TouchableOpacity style={styles.botaoPress6}>
                        <Text style={styles.tituloBotao}>
                               
                               {"Serviço prestado"}
                        </Text>
                            <CampoTexto placeholder=""></CampoTexto>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.botaoPress7}>
                        <Text style={styles.tituloBotao}>
                               
                               {"Total Gasto"}
                        </Text>
                            <CampoTexto placeholder=""></CampoTexto>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.botaovoltar}
                            onPress={() => { setVisivel2(false) }}
                        >
                            <Text style={styles.textovoltar}>Voltar</Text>
                        </TouchableOpacity>
                    </AreaCont>
              
                </Container>
            </Modal>
            <Modal
                animationType="fade"


                backdropColor={"#00290C"}
                visible={visivel3}
                style={{ margin: 20, borderRadius: 20 }}
                statusBarTranslucent
                deviceHeight={ScreenHeight}
                deviceWidth={ScreenWidth}
               
            >
               <Container>
                    
                    <AreaCont>
                        <TouchableOpacity style={styles.botaoPress5}>
                            <Text style={styles.tituloBotao}>
                               
                                {"Serviço Prestado"}
                            </Text>
                            <CampoTexto placeholder=""></CampoTexto>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botaoPress6}>
                        <Text style={styles.tituloBotao}>
                               
                               {"Total Gasto"}
                        </Text>
                            <CampoTexto placeholder=""></CampoTexto>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botaoPress7}>
                        <Text style={styles.tituloBotao}>
                               
                               {"Descrição"}
                        </Text>
                            <CampoTexto placeholder=""></CampoTexto>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.botaovoltar}
                            onPress={() => { setVisivel3(false) }}
                        >
                            <Text style={styles.textovoltar}>Voltar</Text>
                        </TouchableOpacity>
                    </AreaCont>
                   
                </Container>

            </Modal>


            <TouchableOpacity
                style={styles.botaoPress2}
                onPress={() => { setVisivel(true) }}
            >
                <Text style={styles.tituloBotao2}>
                    <MaterialCommunityIcons
                        name="hospital-box-outline"
                        size={scale(30)}
                        color="white"
                    />
                    {"Vacina e Remedios"}
                </Text>

            </TouchableOpacity>
            <TouchableOpacity
                style={styles.botaoPress3}
                onPress={() => { setVisivel2(true) }}
            >
                <Text style={styles.tituloBotao2}>
                    <MaterialCommunityIcons
                        name="hammer-screwdriver"
                        size={scale(30)}
                        color="white"
                    />
                    {"Mão de obra"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.botaoPress4}
                onPress={() => { setVisivel3(true) }}
            >
                <Text style={styles.tituloBotao2}>
                    <FontAwesome5 name="tractor" size={scale(30)} color="white" />
                    {"Outros"}
                </Text>
            </TouchableOpacity>


        </View>
    );
}
const styles = StyleSheet.create({
    stiloModal: { 
        padding:9,
        height:"100%",
        
        width: "100%",
        alignItems: "center",
    },
    containermodal: {
        
    },
    containerVacas: {
        margin: 5,
        alignItems: "center",
    },
    container: {
        flex: 1,
        backgroundColor: "#006773",
    },
    imgbg: {
        flex: 1,
        objectFit: "cover",
        width: "100%",
    },
    botaoPress2: {
        borderRadius: 20,
        backgroundColor: "rgba(15, 109, 0, 0.9)",
        width: scale(300),
        height: verticalScale(150),
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        top: verticalScale(50),
        position: "absolute",
    },
    botaoPress3: {
        borderRadius: 20,
        backgroundColor: "rgba(15, 109, 0, 0.9)",
        width: scale(300),
        height: verticalScale(150),
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        top: verticalScale(220),
        position: "absolute",
    },
    botaoPress4: {
        borderRadius: 20,
        backgroundColor: "rgba(15, 109, 0, 0.9)",
        width: scale(300),
        height: verticalScale(150),
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        top: verticalScale(390),
        position: "absolute",
    },
    botaoPress5: {
        borderRadius: 15,
        backgroundColor: "rgba(15, 109, 0, 0.9)",
        width: scale(300),
        height: verticalScale(100),
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        top: verticalScale(60),
        position: "absolute",
    },
    botaoPress6: {
        borderRadius: 20,
        backgroundColor: "rgba(15, 109, 0, 0.9)",
        width: scale(300),
        height: verticalScale(100),
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        top: verticalScale(195),
        position: "absolute",
    },
    botaoPress7: {
        borderRadius: 20,
        backgroundColor: "rgba(15, 109, 0, 0.9)",
        width: scale(300),
        height: verticalScale(100),
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        top: verticalScale(330),
        position: "absolute",
    },
    botaoPress8:{
        borderRadius: 20,
        backgroundColor: "rgba(15, 109, 0, 0.9)",
        width: scale(300),
        height: verticalScale(100),
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        top: verticalScale(470),
        position: "absolute",
    },
    
    tituloBotao2: {
        fontSize: scale(25),
        fontWeight: "bold",
        color: "#fff",
    },
    botaopress: {
        borderRadius: 20,
        backgroundColor: "rgba(15, 109, 0, 0.9)",
        width: scale(300),
        height: verticalScale(40),
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        top: verticalScale(625),
        position: "absolute",
    },
    tituloBotao: {
        fontSize: verticalScale(14),
        fontWeight: "bold",
        color: "#fff",
    },
    botaovoltar: {
        backgroundColor: "rgba(15, 109, 0, 0.9)",
        width: scale(300),
        height: verticalScale(40),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 18,
        position: "absolute",
        top: ScreenHeight >= 800 ? verticalScale(633) : verticalScale(605),
        left: scale(8),
    },
    textovoltar: {
        fontSize: verticalScale(14),
        fontWeight: "bold",
        color: "#fff",
    },
});
export default modalVacina;