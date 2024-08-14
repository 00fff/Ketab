import React from 'react';
import { ScrollView, SafeAreaView, View, TextInput, Text, TouchableOpacity, Image} from 'react-native';
import { CameraView, CameraType, useCameraPermissions} from 'expo-camera';
import { useRoute } from '@react-navigation/native'; // Import useRoute
const Page = (prop) => {
  return (
    <SafeAreaView>
    <ScrollView>
    <Image
            source={{ uri: prop.img }}
            style={{width: 100, height: 100}}
          />
    </ScrollView>
    </SafeAreaView>
    
  );
  
};

export default Page;
