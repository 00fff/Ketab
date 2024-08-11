import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const CustomButton = (prop) => {
  return (
    <View style={{
            borderColor: 'black', // Apply border color to the View
            borderWidth: '#0e3b43', // Make sure the border width is set
            borderRadius: 8,
            marginTop: 30,
          }}>
      <TouchableOpacity 
        onPress={prop.onPress} 
        style={{
          backgroundColor: '#357266',
          borderRadius: 4,
          paddingVertical: 15,
          alignItems: 'center',
        }}>
        <Text style={{ color: '#FFF' }}>{prop.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
