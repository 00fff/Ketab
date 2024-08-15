import React from 'react';
import { ScrollView, SafeAreaView, View, TextInput, Text, TouchableOpacity} from 'react-native';
import { CameraView, CameraType, useCameraPermissions} from 'expo-camera';
import { useRoute } from '@react-navigation/native'; // Import useRoute
import Page from '../components/Page'
import { Ionicons } from 'react-native-vector-icons';
const Book = () => {
    const route = useRoute(); // Get the route object
  const { param1, param2, param3 } = route.params; // Access the parameters
  return (
    <SafeAreaView>
    <ScrollView>
    <View style={{display: 'flex'}}>
      <Page book_id={param3}/>
    </View>
    </ScrollView>
    </SafeAreaView>
    
  );
  
};

export default Book;
