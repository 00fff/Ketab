import React, {useState, useEffect} from 'react';
import { ScrollView, View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import { SafeAreaFrameContext } from 'react-native-safe-area-context';
import { Ionicons } from 'react-native-vector-icons';
import axios from 'axios'
import BookIcon from "../../components/BookIcon"
const home = () => {
  const [books, setBooks] = useState([])
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/listBooks",
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          withCredentials: true // Include credentials if needed
        }
      );
      const data = response.data.response;
      console.log('API Response:', data); // Inspect the structure here
      setBooks(data)
      console.log(books)
    } catch (error) {
      throw error
    }
  }
  const showBook = (title) => {
    console.log(title)
  }
  useEffect(() => {
    fetchBooks();
  }, []); // Empty dependency array to run only once on mount
  return (
    <SafeAreaView style={{backgroundColor: '#357266', flex: 1, display: "flex", flexDirection: 'row'}}>
    <ScrollView>
      <View>
      <Text style={{fontSize: 50, textAlign: 'center', padding: 20}}>Books</Text>
      </View>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
        {books.map((book, index) => (
        <BookIcon title={book.title} onPressed={() => showBook(book.title)}/>
      ))}
      </View>
      
      <TouchableOpacity>
    <View style={{backgroundColor: '#312509', width: 80, height: 80, borderRadius: 15, justifyContent: 'center', alignItems: 'center', padding: 20}}>
      <Ionicons name="add-outline" color={"white"} size={25}/>
    </View>
    </TouchableOpacity>
    
    </ScrollView>
    </SafeAreaView>
  );
};
export default home;
