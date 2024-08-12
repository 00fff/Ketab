import React, {useEffect, useState} from 'react';
import { useRouter } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, Platform } from 'react-native';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const Settings = () => {
  const router = useRouter();
  const [email, setEmail] = useState('')

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
    } catch (error) {
      console.error('Error fetching user information:', error); // Log error if request fails
    }
  };
  useEffect(() => {
    fetchInformation()
  }, 
    
  )

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>Settings</Text> {/* Displaying the title of the page */}
        </View>
        <View>
          {/* Button to trigger the logout function */}
          <Text>{email}</Text>
          <CustomButton text={'Log Out'} onPress={LogOut} />
          <CustomButton text={'Information'} onPress={fetchInformation} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
