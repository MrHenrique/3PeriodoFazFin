import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";

const ModalFiltro = ({ modalState, onChange }) => {
  const [modalVisible, setModalVisible] = useState(modalState);
  useEffect(() => {
    setModalVisible(modalState);
  }, [modalState]);
  //enviar para o pai
  function ChangeState(e) {
    onChange(e);
    // console.log("asd")
  }
  // fim
  function closeModal() {
    setModalVisible(false);
    ChangeState(!modalVisible);
    console.log("checkpoint");
  }
  return (
    <View>
      <Modal
        style={styles.modal}
        coverScreen={true}
        visible={modalVisible}
        onBackButtonPress={() => {
          closeModal();
        }}
        onBackdropPress={() => {
          closeModal();
        }}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.container}
          start={{ x: 0.2, y: 0.125 }}
        >
          <View style={styles.containervoltar}>
            <TouchableOpacity onPress={() => closeModal()} style={styles.botao}>
              <Text style={styles.txtbotao}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
};
export default ModalFiltro;
