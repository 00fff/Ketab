import React, { useState } from 'react';
import { ScrollView, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios'; // Import axios for making HTTP requests
import Page from '../components/Page'; // Import Page component
import PageForm from '../components/PageForm'; // Import PageForm component
import SettingsForm from '../components/SettingsForm'; // Import SettingsForm component
import { Ionicons } from 'react-native-vector-icons'; // Import Ionicons for icons

const Book = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { param1, param2, param3 } = route.params; // Destructure the parameters from the route
  const [showForm, setShowForm] = useState(false); // State to toggle the visibility of PageForm
  const [updatePages, setupdatePages] = useState(false)
  const [toggleSettings, settoggleSettings] = useState(false)
  // Function to toggle the visibility of PageForm and log the current state
  const ToggleShowForm = () => {
    setShowForm(!showForm);

  };
  const ToggleSettings = () => {
    settoggleSettings(!toggleSettings)
  }
  const DeleteBook = async () => {
    
    try {
      const response = await axios.post("http://127.0.0.1:8080/deleteBook", {
        id: param3,
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set the content type to JSON
        },
        withCredentials: true, // Include credentials in the request
        
      });
      navigation.goBack()
      
    } catch (error) {
      console.error(error); // Log any errors that occur during the request
    }
  };
  // Function to create a new page via an API request
  const CreateNewPage = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8080/addPage", {
        book_id: param3 // Pass the book_id parameter
      }, {
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        withCredentials: true, // Include credentials in the request
      });
      fetchBooks();
      ToggleShowForm();
      const data = response.data.response;
      console.log(data); // Log the response for debugging
    } catch (error) {
      console.error(error); // Log any errors that occur during the request
    }
  };
  const UpdatePages = () => {
    setupdatePages(!updatePages)
    console.log(updatePages)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
      <TouchableOpacity onPress={() => ToggleSettings()} style={{
          backgroundColor: 'transparent',
          position: 'absolute', // Use absolute positioning
          right: 10,            // Adjust right distance from the edge
          top: 10,              // Adjust top distance from the top
          zIndex:2,
        }}><Ionicons name="settings-outline"  color={'#a3bbad'} size={25}/></TouchableOpacity>
        {toggleSettings && (<SettingsForm  width={300} height={350} color={'#a3bbad'} left={50} right={0} bottom={250} onPressFunction={DeleteBook}/>)}
        <View style={{ position: 'relative', flex: 1 }} >
          {showForm && (
            // Conditionally render the PageForm component if showForm is true
            <PageForm width={300} height={350} color={'#a3bbad'} left={50} right={0} bottom={250} id={param3} toggleform={ToggleShowForm} updatePages={UpdatePages}/>
          )}
          
          <Page book_id={param3} createPage={ToggleShowForm} updatePages={updatePages} setUpdatePages={UpdatePages}/> {/* Render the Page component */}
          
        </View>
        
      </ScrollView>
    
    </SafeAreaView>
  );
};

export default Book;
