import React from 'react';
import { ScrollView, SafeAreaView, View, TextInput, Text, TouchableOpacity} from 'react-native';
import { CameraView, CameraType, useCameraPermissions} from 'expo-camera';

const camera = () => {
  return (
    <SafeAreaView style={{backgroundColor: "#0e3b43", flex: 1,}}>
    <ScrollView>
    <View>
      <Text></Text>
    </View>
    </ScrollView>
    </SafeAreaView>
    
  );
  
};

export default camera;
