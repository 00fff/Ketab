import React from 'react';
import { ScrollView, SafeAreaView, View, TextInput, Text, TouchableOpacity} from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter hook for navigation
import { CameraView, CameraType, useCameraPermissions} from 'expo-camera';
import axios from 'axios';

const Notifications = () => {
  const router = useRouter();
  const FetchFriendRequest = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/friendRequests", {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true // Include credentials if needed
      });
      const data = response.data;
      console.log('API Response:', data);
      setBooks(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: '#357266', flex: 1 }}>
    <ScrollView>
    <View>
      <Text>bob</Text>
    </View>
    </ScrollView>
    </SafeAreaView>
    
  );
  
};

export default Notifications;
