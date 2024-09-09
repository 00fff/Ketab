import React, {useEffect, useState} from 'react';
import { useRouter } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, Platform, Image, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const Settings = () => {
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [pfp, setPfp] = useState('')
  const [username, setUsername] = useState('');

  const LogOut = async () => {
    try {
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        // Clear token from SecureStore for mobile platforms
        await SecureStore.deleteItemAsync('jwt_token');
      } else {
        // Clear token from AsyncStorage for other platforms
        await AsyncStorage.removeItem('jwt_token');
      }

      console.log('Logged out successfully');
      router.push('/'); // Redirect the user to the login page after logout
    } catch (error) {
      console.error('Error logging out:', error); // Log error if logout fails
    }
  };

  const fetchInformation = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/current_user", {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true // Include credentials if needed
      });
      setEmail(response.data.email)
      setUsername(response.data.name)
      setPfp(response.data.pfp)
    } catch (error) {
      console.error('Error fetching user information:', error); // Log error if request fails
    }
  };
  useEffect(() => {
    fetchInformation()
  }, 
    
  )

  return (
    <SafeAreaView style={{backgroundColor: '#357266', flex: 1}}>
      <ScrollView>
        <View>
        </View>
        <View>
          {/* Button to trigger the logout function */}
          <Image source={{ uri: pfp }} style={{ width: 100, height: 100, borderRadius: 7, alignSelf: 'center', paddingTop: 50}}/>
          <Text style={{fontSize: 50, textAlign: 'center'}}>{username}</Text>
          <TouchableOpacity style={{
            backgroundColor: '#0e3b43',
            borderRadius: 8,
            paddingVertical: 15,
            marginTop: 30,
            alignItems: 'center'}} onPress={LogOut}>Log Out</TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
