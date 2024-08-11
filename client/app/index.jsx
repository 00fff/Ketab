import React, { useState, useEffect } from 'react'; // Import React and hooks
import { useRouter } from 'expo-router'; // Import useRouter hook for navigation
import { View, Text, SafeAreaView, Platform } from 'react-native'; // Import necessary components from React Native
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for non-mobile platforms
import * as SecureStore from 'expo-secure-store'; // Import SecureStore for secure data storage on mobile platforms
import CustomButton from '../components/CustomButton'; // Import CustomButton component for user interactions

const StartPage = () => {
  const router = useRouter(); // Initialize router for navigation
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track user authentication status

  // useEffect to check token on component mount
  useEffect(() => {
    const checkToken = async () => {
      try {
        let token;
        // Check platform and retrieve token from the appropriate storage
        if (Platform.OS === 'android' || Platform.OS === 'ios') {
          token = await SecureStore.getItemAsync('jwt_token');
        } else {
          token = await AsyncStorage.getItem('jwt_token');
        }

        // If a token is found, consider the user authenticated
        if (token) {
          setIsAuthenticated(true);
          // Redirect to home or another page if the user is already authenticated
          router.push('/home'); // Adjust the route based on your needs
        }
      } catch (error) {
        console.error('Error fetching token', error); // Log any errors encountered during token retrieval
      }
    };

    checkToken(); // Call the function to check token status
  }, [router]); // Dependency array to re-run effect if router changes

  // Render the StartPage component
  return (
    <SafeAreaView style={{ backgroundColor: "#0E3B43", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Text style={{ fontWeight: '900', fontSize: 40, color: '#FFF' }}>Welcome To Ketab</Text> {/* Display a welcome message */}
      </View>
      {/* Custom button to navigate to the Sign Up page */}
      <CustomButton text="Sign In" onPress={() => router.push('/SignUp')} />
    </SafeAreaView>
  );
};

export default StartPage; // Export the StartPage component
