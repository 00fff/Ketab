import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const CustomButton = ({ onPress, color, text }) => {
  return (
    <View style={{
      borderRadius: 8,
      marginTop: 30,
    }}>
      <TouchableOpacity 
        onPress={onPress} 
        style={{
          backgroundColor: '#357266',
          borderRadius: 8,
          paddingVertical: 15,
          
          alignItems: 'center',
          width: 100,
        }}>
        <Text style={{ color: '#FFF' }}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
