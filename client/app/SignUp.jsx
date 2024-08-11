import React, { useState } from 'react';
import { Redirect, useRouter } from "expo-router";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import qs from 'qs'; // Needed to stringify the form data
import axios from 'axios';
const Signup = () => {
  const router = new useRouter;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const SignUp = async (username, email, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8080/signUp", 
        {
          username: username,
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
      router.push('/home'); // Redirect to Home Page IF SignUp Is Succeful
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
          secureTextEntry={showPassword ? false : true}
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
          onPress={() => SignUp(name, email, password)
            
          }
        >
          <Text style={{ color: '#FFF', fontWeight: '900' }}>Sign Up</Text>
        </TouchableOpacity>
        <Text />
        <TouchableOpacity onPress={() => router.push('/LogIn')}
          >
          <Text>                         Already Have An Account?</Text>
          
        </TouchableOpacity >
      </View>
    </SafeAreaView>
  )};

export default Signup;
