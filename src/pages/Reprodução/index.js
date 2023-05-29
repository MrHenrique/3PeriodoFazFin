import React, { useState, useContext } from "react";
import {
  Dimensions,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Button
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { scale, verticalScale } from "react-native-size-matters";
import { Feather } from "@expo/vector-icons";
import { useLinkBuilder } from "@react-navigation/native";
import uuid from "react-native-uuid";
import ReproducaoSchema from "../../Realm/ReproducaoSchema";
import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import DatePicker from 'react-native-date-picker'

const EventRegistration = () => {
  const [coverageDate, setCoverageDate] = useState(new Date());
  const [creationDate, setCreationDate] = useState(new Date());
  const [heatDate, setHeatDate] = useState(new Date());

  const handleCoverageDateChange = (selectedDate) => {
    setCoverageDate(selectedDate);
  };

  const handleCreationDateChange = (selectedDate) => {
    setCreationDate(selectedDate);
  };

  const handleHeatDateChange = (selectedDate) => {
    setHeatDate(selectedDate);
  };

  const registerEvents = () => {
    // Implementar a lógica para registrar os eventos aqui
    console.log('Evento de Cobertura:', coverageDate);
    console.log('Evento de Criação:', creationDate);
    console.log('Evento de Cio:', heatDate);
  };

  return (
    <View>
      <Text>Registro de Eventos</Text>
      <Text>Data de Cobertura:</Text>
      <DatePicker date={coverageDate} onDateChange={handleCoverageDateChange} />

      <Text>Data de Criação:</Text>
      <DatePicker date={creationDate} onDateChange={handleCreationDateChange} />

      <Text>Data de Cio:</Text>
      <DatePicker date={heatDate} onDateChange={handleHeatDateChange} />

      <Button title="Registrar Eventos" onPress={registerEvents} />
    </View>
  );
};

export default EventRegistration;


