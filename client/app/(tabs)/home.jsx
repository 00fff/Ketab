import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import axios from 'axios';
import BookIcon from "../../components/BookIcon";
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const Home = () => {
  const [books, setBooks] = useState([]);
  const navigation = useNavigation(); // Get the navigation object

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/listBooks", {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true // Include credentials if needed
      });
      const data = response.data.response;
      console.log('API Response:', data);
      setBooks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const showBook = (title, description) => {
    console.log(title);
    navigation.navigate('Book', { // Pass the name of the screen (route) as a string
      param1: title,
      param2: description,
    });
  };
  

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#357266', flex: 1 }}>
      <ScrollView>
        <View>
          <Text style={{ fontSize: 50, textAlign: 'center', padding: 20 }}>Books</Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {books.map((book, index) => (
            <BookIcon key={index} title={book.title} onPressed={() => showBook(book.title, book.description)} />
          ))}
        </View>
        <TouchableOpacity>
          <View style={{ backgroundColor: '#312509', width: 80, height: 80, borderRadius: 15, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Ionicons name="add-outline" color={"white"} size={25} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
