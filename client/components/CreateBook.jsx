import React, { useState }from 'react';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput, Button, Image } from 'react-native';

const CreateBook = ({ width, height, color, onPressFunction, fetchBooks,  toggleCreateBook}) => {
  const [image, setImage] = useState(null)
  const [BookName, setBookName] = useState('')
  const [BookDescription, setDescription] = useState('')
  const CreateBooklink = async (name, description, img_url) => {
    try {
      const response = await axios.post("http://127.0.0.1:8080/createBook", 
        {
          title: BookName,
          description: BookDescription,
          img: image,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          withCredentials: true // Include credentials if needed
          
        }
        
      );
      fetchBooks()
      toggleCreateBook()

    } catch (error) {
      console.error('There was an error!', error);
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
    <SafeAreaView style={[styles.container, { width, height, backgroundColor: color }]}>
      <View style={styles.innerContainer}>
        <Text style={{fontSize: 30, color: "white"}}>Create Book:</Text>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={BookName}
          onChangeText={setBookName}
          placeholder="My Diary"
          placeholderTextColor="#888"
          keyboardType="ascii-capable"
        />
        
        <Text style={styles.label}>Description:</Text>
        
        <TextInput
          style={styles.input}
          value={BookDescription}
          onChangeText={setDescription}
          placeholder="For My Crushes and Dream GUY!!!"
          placeholderTextColor="#888"
          keyboardType="default"
        />

        
        <Text style={styles.label}>Choose An Image For Your New Page:</Text>
        <Button title="Choose Image" onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{width: 200, height: 100, margin: 10}} />
        )}
        <TouchableOpacity 
          onPress={() => {CreateBooklink(BookName, BookDescription)}}
          style={styles.button}
        >
          <Text style={{ fontWeight: '900', fontSize: 15, color: '#FFF' }}>Create Book</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center', 
    position: 'absolute',
    top: '150%', 
    left: '50%', 
    transform: [{ translateX: -150 }, { translateY: -250 }], 
    zIndex: 1,
    borderRadius: 10,
    padding: 25,
  },
  innerContainer: {
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#357266',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    color: '#FFF',
    backgroundColor: '#1A4D56',
    width: 200, // Adjusted to ensure the input fields are centered properly
  },
  label: {
    fontWeight: '900',
    fontSize: 15,
    color: '#FFF',
  },
  button: {
    backgroundColor: '#708d81',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 30,
    alignItems: 'center',
  },
});

export default CreateBook;
