import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, Image, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'; // Import axios for making HTTP requests

const SettingsForm = ({ width, height, left, right, color, bottom, id, onPressFunction}) => {
  const [Privacy, setPrivacy] = useState(false)
  const [newPrivacyState, setnewPrivacyState] = useState("lock-closed-outline")
  const changePrivacy = () => {
    setPrivacy(!Privacy)
    const newPrivacyState = Privacy ? "lock-open-outline" : "lock-closed-outline";
    setnewPrivacyState(newPrivacyState); // Assuming you have a state hook for PrivacyState
  }
  const ChangePrivacyAPI =  async ( state, book_id ) => {
    try {
      changePrivacy();
      const response = await axios.post("http://127.0.0.1:8080/changePrivacy", {
        state: state,
        book_id: book_id,
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
      });
      
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <SafeAreaView style={[styles.container, { width, height, left, right, backgroundColor: color, bottom }]}>
      <View style={styles.innerContainer}>
        <Text style={{fontSize: 30,}}>Settings</Text>
        <TouchableOpacity onPress={() => ChangePrivacyAPI(Privacy, id)}>
        <Ionicons name={newPrivacyState} size={25}/>
        </TouchableOpacity>
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
        ><Text>Delete Book</Text></TouchableOpacity>
        
      
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
    borderColor: 'black',
    borderWidth: 2,
    
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
  }
});

export default SettingsForm;
