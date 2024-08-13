import React from 'react';
import { ScrollView, SafeAreaView, View, TextInput, Text, TouchableOpacity} from 'react-native';
import { CameraView, CameraType, useCameraPermissions} from 'expo-camera';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
const Book = () => {
    const router = useNavigation();
  return (
    <SafeAreaView>
    <ScrollView>
    <View>
      <Text>Book</Text>
    </View>
    </ScrollView>
    </SafeAreaView>
    
  );
  
};

export default Book;
