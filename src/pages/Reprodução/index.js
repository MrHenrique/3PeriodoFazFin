import React, { useState, useContext } from "react";
import {
  Dimensions,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  DatePickerIOS, Button
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { scale, verticalScale } from "react-native-size-matters";
import { AuthContext } from "../../contexts/auth";
import { Feather } from "@expo/vector-icons";
import { useLinkBuilder } from "@react-navigation/native";
import uuid from "react-native-uuid";
import ReproducaoSchema from "../../Realm/ReproducaoSchema";
import React, { useState } from 'react';
import { StyleSheet, View, Text, DatePickerIOS, Button } from 'react-native';

const DateForm = () => {
    const [date1, setDate1] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [date3, setDate3] = useState(new Date());
  
    const handleDate1Change = (newDate) => {
      setDate1(newDate);
    };
  
    const handleDate2Change = (newDate) => {
      setDate2(newDate);
    };
  
    const handleDate3Change = (newDate) => {
      setDate3(newDate);
    };
  
    const handleSubmit = () => {
      console.log('Date 1:', date1);
      console.log('Date 2:', date2);
      console.log('Date 3:', date3);
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Date 1:</Text>
        <DatePickerAndroid date={date1} onDateChange={handleDate1Change} />
  
        <Text style={styles.label}>Date 2:</Text>
        <DatePickerAndroid date={date2} onDateChange={handleDate2Change} />
  
        <Text style={styles.label}>Date 3:</Text>
        <DatePickerAndroid date={date3} onDateChange={handleDate3Change} />
  
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  });
  
  export default DateForm;