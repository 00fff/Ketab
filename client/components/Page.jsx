import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ScrollView, SafeAreaView, View, Image, TouchableOpacity, Text} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const Page = ({ book_id }) => {
  const [pageCount, setPageCount] = useState(0)
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/listPages", {
        params: { book_id },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
      });
      const data = response.data.response;
      console.log('API Response:', data);
      setPages(data);
      setPageCount(data.length)
    } catch (error) {
      console.error(error);
    }
  };
  const NextPage = () => {
    const lastPage = pages.length - 1; // Use pages.length to get the total number of pages
    if (currentPage < lastPage) {
      setCurrentPage(currentPage+1)
    } else {
      setCurrentPage(lastPage)
    }
    
  }
  const BackPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage-1)
    } else {
      setCurrentPage(0)
    }
    
  }
  useEffect(() => {
    fetchBooks();
    const intervalId = setInterval(() => {
      fetchBooks();
    }, 3600000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={{ uri: pages[currentPage]?.img || '' }}
          style={{ width: '80%', height: 600, resizeMode: 'contain' }}
        />
        <View style={{ bottom: 90,flexDirection: 'row', marginTop: 20, width: '25%', justifyContent: 'center', paddingHorizontal: 20 }}>
          <Text>{currentPage}</Text>
          <TouchableOpacity style={{ padding: 5 }} onPress={() => BackPage()}>
            <Ionicons name="caret-back-outline" color={"black"} size={60} />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 5 }}>
            <Ionicons name="sync-circle-outline" color={"black"} size={60} />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 5 }} onPress={() => NextPage()}>
            <Ionicons name="caret-forward-outline" color={"black"} size={60} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page;
