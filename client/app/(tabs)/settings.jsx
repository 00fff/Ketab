import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Platform } from 'react-native'; // Importing necessary components
import CustomButton from '../../components/CustomButton'; // Importing a custom button component
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importing AsyncStorage for data storage on non-mobile platforms
import * as SecureStore from 'expo-secure-store'; // Importing SecureStore for secure data storage on mobile platforms

// Function to handle user logout
const LogOut = async () => {
  try {
    // Check platform to determine which storage method to use
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      // Clear token from SecureStore for mobile platforms
      await SecureStore.deleteItemAsync('jwt_token');
    } else {
      // Clear token from AsyncStorage for other platforms
      await AsyncStorage.removeItem('jwt_token');
    }
    
    console.log('Logged out successfully'); // Log success message
    // Optionally, redirect the user or update the state
  } catch (error) {
    console.error('Error logging out:', error); // Log error if logout fails
  }
};

// Settings component
const Settings = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>Settings</Text> {/* Displaying the title of the page */}
        </View>
        <View>
          {/* Button to trigger the logout function */}
          <CustomButton text={'Log Out'} onPress={() => LogOut()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings; // Exporting the Settings component
