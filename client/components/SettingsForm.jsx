import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, Image, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'; // Import axios for making HTTP requests

const SettingsForm = ({ width, height, left, right, color, bottom, id, onPressFunction}) => {


  return (
    <SafeAreaView style={[styles.container, { width, height, left, right, backgroundColor: color, bottom }]}>
      <View style={styles.innerContainer}>
        <Text style={{fontSize: 30,}}>Settings</Text>
          <TouchableOpacity 
          onPress = {onPressFunction}
          style={{
            backgroundColor: '#bf0603',
            borderRadius: 8,
            paddingVertical: 15,
            paddingHorizontal: 20,
            marginTop: 30,
            alignItems: 'center',
            
            
          }}
        >Delete Book</TouchableOpacity>
      
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 10,
    padding: 25,
  },
  innerContainer: {
    alignItems: 'center',
  },
  label: {
    fontWeight: '900',
    fontSize: 15,
    color: '#FFF',
    marginBottom: 10,
  },
  image: {
    width: 280,
    height: 150,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#EEE',
  },
});

export default SettingsForm;
