import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { ScrollView, SafeAreaView, View, TextInput, Text, TouchableOpacity, Image} from 'react-native';
import { CameraView, CameraType, useCameraPermissions} from 'expo-camera';
import { useRoute } from '@react-navigation/native'; // Import useRoute
const Page = (book_id) => {
  const [pages, setPages] = useState([])
  const fetchBooks = async () => {
    
    try {
      const response = await axios.get("http://127.0.0.1:8080/listPages", {
        params: book_id ,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
      });
      const data = response.data.response;
      console.log('API Response:', data);
      setPages(response.data.response)
      console.log(pages[0].img)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBooks(); // Fetch pages when component mounts
  }, []);


  return (
    <SafeAreaView>
    <ScrollView>
    <Image
            source={{ uri: pages[0].img }}
            style={{width: 100, height: 100}}
          /> 
    </ScrollView>
    </SafeAreaView>
    
  );
  
};

export default Page;
