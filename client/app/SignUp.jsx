import React, { useState } from 'react';
import { Redirect, useRouter } from "expo-router";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
const Signup = () => {
  const router = new useRouter;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const SignUp = async (name, email, password) => {
    try {
      await axios.get("https://192.168.4.196:8080/signUp", {
          params: { name: name, email: email, password: password}, // Pass the URI as a query parameter
          method: 'GET',
          withCredentials: true, // Include cookies in the request
      });
  } catch (error) {
      console.error('Could Not Send Request', error);
  }
};
  
  return (
    <SafeAreaView style={{ backgroundColor: "#0E3B43", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Text style={{ fontWeight: '900', fontSize: 40, color: '#FFF' }}>Sign Up</Text>
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
        <Text style={{ fontWeight: '900', fontSize: 15, color: '#FFF', marginTop: 20 }}>Username:</Text>
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
          value={name}
          onChangeText={setName}
          placeholder="John Doe"
          placeholderTextColor="#888"
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
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#888"
        />
        <TouchableOpacity 
          style={{
            backgroundColor: '#357266',
            borderRadius: 8,
            paddingVertical: 15,
            marginTop: 30,
            alignItems: 'center'
            
          }}
          onPress={() => SignUp(name, email, password)}
        >
          <Text style={{ color: '#FFF', fontWeight: '900' }}>Sign Up</Text>
        </TouchableOpacity>
        <Text />
        <TouchableOpacity onPress={() => router.push('/LogIn')}>
          <Text>                         Already Have An Account?</Text>
          
        </TouchableOpacity >
      </View>
    </SafeAreaView>
  )};

export default Signup;
