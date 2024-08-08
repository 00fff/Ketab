import React, { useState } from 'react';
import { Redirect, useRouter } from "expo-router";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const LogIn = () => {
  const router = new useRouter;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword)
    console.log(showPassword)
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
          onPress={() => console.log('Sign Up button pressed')}
        >
         
          <Text style={{ color: '#FFF', fontWeight: '900' }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LogIn;
