import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, Image, StyleSheet, Touchable, TouchableOpacity, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from 'react-native-vector-icons';
import axios from 'axios'; // Import axios for making HTTP requests

const EditWords = ({ width, height, left, right, color, bottom, id, currentText, changeEditState}) => {
  const [text, onChangeText] = React.useState(currentText);
  const [editWords, seteditWords] = useState(false)


  return (
    <SafeAreaView style={[styles.container, { width, height, left, right, backgroundColor: color, bottom }]}>
      <TouchableOpacity onPress={() => changeEditState()} style={{position: 'absolute', top: 0, right: 0, padding: 10, }}><Ionicons name="pencil-outline" color={"black"} size={30} /></TouchableOpacity>
      <View style={styles.innerContainer}>
      
        <TextInput  style={{height: 350, width: 200}} onChangeText={onChangeText}  value={text}
          multiline={true} // Allows multiline input
          textAlignVertical="top" // Aligns text to the top
          autoCapitalize="none" // Prevents automatic capitalization
          autoCorrect={false} />
          <TouchableOpacity style={{ margin: 10, height: 40, width: 200, backgroundColor: '#0e3b43', justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>Submit</TouchableOpacity>
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

export default EditWords;
