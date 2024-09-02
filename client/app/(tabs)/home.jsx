import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router'; // Import useRouter hook for navigation
import BookIcon from "../../components/BookIcon";
import CreateBook from "../../components/CreateBook";
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const Home = () => {
  const [books, setBooks] = useState([]);
  const [toggleCreate, settoggleCreate] = useState(false)
  const navigation = useNavigation(); // Get the navigation object
  const router = useRouter();

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

  const showBook = (title, description, id, cover) => {
    console.log(`Navigating to Book with ID: ${id}`);
    navigation.navigate('Book', {
      param1: title,
      param2: description,
      param3: id,
      param4: cover,
    });
  };
  const notification = () => {
    router.push("/Notifications")
  }
  const toggleCreateBook = () => {
    console.log(toggleCreate);
    settoggleCreate(!toggleCreate);
    console.log(toggleCreate);
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#357266', flex: 1 }}>
      <ScrollView>
        
      
        {toggleCreate && (<CreateBook width={300} height={500} color={'#001427'} toggleCreateBook={toggleCreateBook} fetchBooks id={books.id}/>)}
        <View>
          <TouchableOpacity onPress={notification} style={{position: 'absolute', right: 0, margin: 20}}>
          <Ionicons name="notifications-circle-outline" size={35}/>
        </TouchableOpacity>
          <Text style={styles.title}>Books</Text>
        </View>
        
        <View style={{  flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'  }}>
          
          {books.map((book, index) => (
            <BookIcon key={index} title={book.title} cover={book.cover} onPressed={() => showBook(book.title, book.description, book.id, fetchBooks)} />
          ))}
          
        </View>
        
      </ScrollView>
      <TouchableOpacity 
    onPress={toggleCreateBook}
    style={{ 
      bottom: 20,
      marginRight: 'auto',
      marginLeft: 'auto',
      padding: 20, 
      backgroundColor: '#312509', 
      alignItems: 'center',
      justifyContent: 'center', 
      width: 100, 
      height: 40,
      borderRadius: 20,
    }}>
    <Ionicons name="add-outline" color="white" size={25} />
  </TouchableOpacity>
    </SafeAreaView>
  );
  
};
const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    textAlign: 'center',
    padding: 20,
    backgroundColor: '#a3bbad',
    marginHorizontal: 'auto',
    marginTop: 20,
    height: 100,
    width: 200,
    borderRadius: 10,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0.1, height: 0.1 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
})

export default Home;
