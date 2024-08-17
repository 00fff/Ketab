import React, { useState } from 'react';
import { ScrollView, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios'; // Import axios for making HTTP requests
import { useRoute } from '@react-navigation/native'; // Import useRoute for accessing route parameters
import Page from '../components/Page'; // Import Page component
import PageForm from '../components/PageForm'; // Import PageForm component
import { Ionicons } from 'react-native-vector-icons'; // Import Ionicons for icons

const Book = () => {
  const [showForm, setShowForm] = useState(false); // State to toggle the visibility of PageForm

  // Function to toggle the visibility of PageForm and log the current state
  const printMessage = () => {
    setShowForm(!showForm);
    console.log(showForm);
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

      const data = response.data.response;
      console.log(data); // Log the response for debugging
    } catch (error) {
      console.error(error); // Log any errors that occur during the request
    }
  };

  const route = useRoute(); // Get the route object to access route parameters
  const { param1, param2, param3 } = route.params; // Destructure the parameters from the route

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ position: 'relative', flex: 1 }}>
          {showForm && (
            // Conditionally render the PageForm component if showForm is true
            <View style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 100,
              backgroundColor: 'blue',
              zIndex: 1, // Ensure the blue box is on top of other content
            }} />
          )}
          <Page book_id={param3} createPage={printMessage} /> {/* Render the Page component */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Book;
