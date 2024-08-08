import React from 'react';
import { ScrollView, SafeAreaView, View, TextInput, Text, TouchableOpacity} from 'react-native';
import { CameraView, CameraType, useCameraPermissions} from 'expo-camera';

const camera = () => {
  return (
    <SafeAreaView>
    <ScrollView>
    <View>
      <Text>Camera</Text>
    </View>
    </ScrollView>
    </SafeAreaView>
    
  );
  
};

export default camera;
