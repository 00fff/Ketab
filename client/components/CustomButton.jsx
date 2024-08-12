import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const CustomButton = ({ onPress, color, text }) => {
  return (
    <View style={{
      borderColor: 'black', // Apply border color to the View
      borderWidth: 1, // Make sure the border width is set to a numeric value
      borderRadius: 8,
      marginTop: 30,
    }}>
      <TouchableOpacity 
        onPress={onPress} 
        style={{
          backgroundColor: color, // Use color prop for background color
          borderRadius: 4,
          paddingVertical: 15,
          alignItems: 'center',
        }}>
        <Text style={{ color: '#FFF' }}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
