import React, { useState } from 'react';
import { Redirect, useRouter } from "expo-router";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

const LogIn = () => {
  const router = new useRouter;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const Login = async (email, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8080/signIn", 
        {
          email: email,
          password: password
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          withCredentials: true // Include credentials if needed
        }
      );
      const jwt_token = response.data.jwt_token; // Adjust if the token is nested differently
      if (Platform.OS === 'android' || Platform.OS === 'ios') {

        key = await SecureStore.setItemAsync('jwt_token', jwt_token);
        console.log(key)
      } else {
        key = await AsyncStorage.setItem('jwt_token', jwt_token);
        console.log(key)
      }
      router.push('/home'); // Redirect to Home Page IF LogIn Is Succeful
      console.log(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };
  const togglePassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <SafeAreaView style={{ backgroundColor: "#0E3B43", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Text style={{ fontWeight: '900', fontSize: 40, color: '#FFF' }}>Log In</Text>
      </View>
      <View style={{ padding: 20, width: '80%' }}>
        <Text style={{ fontWeight: '900', fontSize: 15, color: '#FFF' }}>Email:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#357266',
            borderRadius: 8,
            padding: 10,
            marginVertical: 10,
            color: '#FFF',
            backgroundColor: '#1A4D56'
          }}
          value={email}
          onChangeText={setEmail}
          placeholder="example@mail.com"
          placeholderTextColor="#888"
          keyboardType="email-address"
        />
        <Text style={{ fontWeight: '900', fontSize: 15, color: '#FFF', marginTop: 20 }}>Password:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#357266',
            borderRadius: 8,
            padding: 10,
            marginVertical: 10,
            color: '#FFF',
            backgroundColor: '#1A4D56'
          }}
          
          value={password}
          secureTextEntry={showPassword ? false : true}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#888"
          
        />
            <TouchableOpacity onPress={togglePassword}>
            <MaterialCommunityIcons
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              color="#FFF"
            />
          </TouchableOpacity>
          <TouchableOpacity
          style={{
            backgroundColor: '#357266',
            borderRadius: 8,
            paddingVertical: 15,
            marginTop: 30,
            alignItems: 'center'
          }}
          onPress={() => Login(email, password)}
        >
         
          <Text style={{ color: '#FFF', fontWeight: '900' }}>Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LogIn;
