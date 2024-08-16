import React from 'react';
import { ScrollView, SafeAreaView, View, TextInput, Text, TouchableOpacity} from 'react-native';
import { CameraView, CameraType, useCameraPermissions} from 'expo-camera';
import { useRoute } from '@react-navigation/native'; // Import useRoute
import Page from './Page'
import { Ionicons } from 'react-native-vector-icons';
const PageForm = () => {
  return (
    <SafeAreaView>
    <ScrollView>
    <View style={{width: 100, height: 100, backgroundColor: 'rgba(33, 14, 102)', position: 'absolute'} }>
      <Text>Hello</Text>
    </View>
    </ScrollView>
    </SafeAreaView>
    
  );
  
};

export default PageForm;
