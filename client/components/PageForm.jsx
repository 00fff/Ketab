import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, Image, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'; // Import axios for making HTTP requests

const PageForm = ({ width, height, left, right, color, bottom, id}) => {
  const [image, setImage] = useState(null);
  const CreateNewPage = async ( image, id) => {
    try {
      const response = await axios.post("http://127.0.0.1:8080/addPage", {
        image: image, // Pass the book_id parameter
        id: id,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to JSON
        },
        withCredentials: true, // Include credentials in the request
      });
    } catch (error) {
      console.error(error); // Log any errors that occur during the request
    }
  };
  const pickImage = async () => {
    // Request permissions if needed
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(image)
    }
  };

  return (
    <SafeAreaView style={[styles.container, { width, height, left, right, backgroundColor: color, bottom }]}>
      <View style={styles.innerContainer}>
        <Text style={styles.label}>Choose An Image For Your New Page:</Text>
        <Button title="Choose Image" onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={styles.image} />
        )}
        <TouchableOpacity 
          style={{
            backgroundColor: '#357266',
            borderRadius: 8,
            paddingVertical: 15,
            paddingHorizontal: 20,
            marginTop: 30,
            alignItems: 'center'
            
          }}
          onPress={() => CreateNewPage(image, id)}
        >Submit</TouchableOpacity>
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

export default PageForm;
