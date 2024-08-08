import React from 'react';
import { Redirect, router } from "expo-router";
import { TouchableOpacity, ScrollView, View, Text, SafeAreaView} from 'react-native';
import CustomButton from '../components/CustomButton' 

const signup = () => {
  return (
  <SafeAreaView style={{ backgroundColor: "#0E3B43", flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <View>
  <Text style={{ fontWeight: 900, fontSize: 40}}>Sign Up</Text>
  </View>
  <CustomButton text="Sign Up" onPress={() => {}}></CustomButton>
  </SafeAreaView>
  );
  
  

};

export default signup

