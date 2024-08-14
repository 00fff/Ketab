import React from 'react';
import { ScrollView, SafeAreaView, View, TextInput, Text, TouchableOpacity} from 'react-native';
import { CameraView, CameraType, useCameraPermissions} from 'expo-camera';
import { useRoute } from '@react-navigation/native'; // Import useRoute
import Page from '../components/Page'
const Book = () => {
    const route = useRoute(); // Get the route object
  const { param1, param2, param3 } = route.params; // Access the parameters
  return (
    <SafeAreaView>
    <ScrollView>
    <View>
      <Text>{param1}</Text>
      <Text>{param2}</Text>
      <Text>{param3}</Text>
      <Page book_id={param3}/>
    </View>
    </ScrollView>
    </SafeAreaView>
    
  );
  
};

export default Book;
