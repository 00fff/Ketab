import React from 'react';
import { Redirect, useRouter } from "expo-router";
import { TouchableOpacity, ScrollView, View, Text, SafeAreaView} from 'react-native';
import CustomButton from '../components/CustomButton' 

const StartPage = () => {
  const router = useRouter(); // Initialize router
  return (
  <SafeAreaView style={{ backgroundColor: "#0E3B43", flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <View>
  <Text style={{ fontWeight: 900, fontSize: 40}}>Welcome To Ketab</Text>
  </View>
  <CustomButton text="Sign In" onPress={() => router.push('/SignUp')}></CustomButton>
  </SafeAreaView>
  );
  
  

};

export default StartPage

