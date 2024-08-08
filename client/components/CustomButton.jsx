import React from 'react';
import { Redirect, router } from "expo-router";
import { TouchableOpacity, ScrollView, SafeAreaView, View, TextInput, Text} from 'react-native';


const CustomButton = (prop) => {
  return (
    <View>
      <TouchableOpacity onPress={prop.onPress} style={{borderRadius: 12, borderColor: "black", backgroundColor: '#357266', padding: 15, }}>
        <Text>{prop.text}</Text>
      </TouchableOpacity>
    </View>
  );
  
};

export default CustomButton;
