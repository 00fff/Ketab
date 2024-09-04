import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import BookIconSelect from "../components/BookIconSelect";
const BookSelect = ({ width, height, left, right, color, bottom, submitData, closeTab, choice, friend_id}) => {
  const [books, setBooks] = useState([]);
  const addBook = ( id ) => {
    console.log(id)
  }
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
  const fetchBooks_friend = async ( friend_id ) => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/listFriendBooks", {
        params: { friend_id },
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
  useEffect(() => {
    if (choice == 2 && friend_id) {
      fetchBooks_friend(friend_id);
      console.log("friend")
    } else {
      fetchBooks();
      console.log("dw")
    };
    
    console.log(choice)
  }, []);

  return (
    <SafeAreaView style={[styles.container, { width, height, left, right, backgroundColor: color, bottom }]}>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={closeTab} style={styles.closeButton}>
          <Ionicons name="close-outline" size={25} />
        </TouchableOpacity>
        <Text style={styles.title}>Select Book!</Text>
        <View style={styles.BookRow}>
           {books.map((book, index) => (
            <TouchableOpacity onPress={() => submitData(book.id, book.cover)} style={{margin: 10}}><BookIconSelect key={book.id} title={book.title} cover={book.cover} /></TouchableOpacity>
          ))}
        
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
    padding: 25,
    borderColor: 'black',
    borderWidth: 2,
  },
  BookRow: {
    flexDirection: 'row',
    overflow: 'scroll',
    
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%', // Ensures full width for better alignment
  },
  closeButton: {
    position: 'absolute',
    top: 10, // Adjust as needed
    right: 10, // Adjust as needed
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  sendRequest: {
    width: 100, 
    height: 50, 
    backgroundColor: '#357266',
    justifyContent: 'center',
    margin: 'auto',
    paddingLeft: 6,
    borderRadius: 10,
  },
  books: {
    width: 66,
    height: 66,
    backgroundColor: '#357266',
    borderRadius: 10,
    margin: 10,
    
  }
});

export default BookSelect;
