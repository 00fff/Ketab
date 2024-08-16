import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ScrollView, SafeAreaView, View, Image, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const Page = ({ book_id }) => {
  const [pageCount, setPageCount] = useState(0);
  const [translate, setTranslate] = useState(false);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/listPages", {
        params: { book_id },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true,
      });

      const data = response.data.response;
      console.log('API Response:', data);
      setPages(data);
      setPageCount(data.length);
    } catch (error) {
      console.error(error);
    }
  };

  const NextPage = () => {
    const lastPage = pages.length - 1;
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(lastPage);
    }
  };

  const BackPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(0);
    }
  };

  const Translate = () => {
    setTranslate(!translate);
    console.log(translate);
  };

  const CreateNewPage = () => {
    console.log("hello");
  };

  useEffect(() => {
    fetchBooks();
    setTranslate(true);
    const intervalId = setInterval(() => {
      fetchBooks();
    }, 3600000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#357266" }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{currentPage + 1} / {pageCount}</Text>
          <View style={{ 
            width: '75%', 
            height: 500, 
            overflow: 'hidden', 
            marginVertical: 20 
          }}>
            {translate ? (
              <Image
                source={{ uri: pages[currentPage]?.img || '' }}
                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
              />
            ) : (
              <View style={{
                width: '100%',
                borderColor: "red", 
                borderWidth: 5, 
                borderRadius: 20,  
                height: '100%', 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: "#f0ead6",
              }}>
                <Text>{pages[currentPage]?.translated_img}</Text>
              </View>
            )}
          </View>
          <View style={{ flexDirection: 'row', marginTop: 20, width: '60%', justifyContent: 'space-between', paddingHorizontal: 20 }}>
            <TouchableOpacity style={{ padding: 5 }} onPress={BackPage}>
              <Ionicons name="caret-back-outline" color={"black"} size={60} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 5 }} onPress={Translate}>
              <Ionicons name="sync-circle-outline" color={"black"} size={60} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 5 }} onPress={NextPage}>
              <Ionicons name="caret-forward-outline" color={"black"} size={60} />
            </TouchableOpacity>
          </View>
        </ScrollView>
        {translate && (
          <TouchableOpacity
            onPress={CreateNewPage}
            style={{ 
              backgroundColor: "#0E3B43", 
              width: '75%', 
              height: 50, 
              borderBottomLeftRadius: 25, 
              borderBottomRightRadius: 25, 
              justifyContent: 'center', 
              alignItems: 'center', 
              alignSelf: 'center',
              position: 'absolute', 
              bottom: 116, // Positioned 30px from the bottom of the screen
            }}
          >
            <Ionicons name="add" color={"black"} size={40} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Page;
