import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ScrollView, SafeAreaView, View, Image, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import EditWords from '../components/EditWords';

const Page = ({ book_id, createPage, updatePages, setUpdatePages }) => {
  const [pageCount, setPageCount] = useState(0); // State to track the total number of pages
  const [translate, setTranslate] = useState(false); // State to toggle translation mode
  const [pages, setPages] = useState([]); // State to store page data
  const [currentPage, setCurrentPage] = useState(0); // State to track the current page
  const [editWords, setEditWords] = useState(false);
  const [fullscreen, setFullscreen] = useState(false); // Fullscreen toggle

  // Function to fetch pages from the API
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/listPages", {
        params: { book_id },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true,
      });

      const data = response.data.response; // Extract data from the response
      setPages(data); // Update the pages state with the fetched data
      setPageCount(data.length); // Update the pageCount state with the number of pages
    } catch (error) {
      console.error(error); // Log any errors that occur during the API request
    }
  };

  useEffect(() => {
    if (updatePages) {
      fetchBooks();
      setUpdatePages();
      createPage();
    }
  }, [updatePages]);

  const changeEditState = () => {
    setEditWords(!editWords);
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
  };

  useEffect(() => {
    fetchBooks();
    setTranslate(true);
    const intervalId = setInterval(() => {
      fetchBooks();
    }, 3600000);
    return () => clearInterval(intervalId);
  }, []);

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#357266" }}>
        {editWords && (
          <EditWords
            id={pages[currentPage].id}
            changeEditState={changeEditState}
            width={300}
            height={500}
            color={'#a3bbad'}
            left={50}
            right={0}
            bottom={155}
            currentText={pages[currentPage]?.translated_img}
          />
        )}

        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{currentPage + 1} / {pageCount}</Text>

          <View style={{ 
            width: fullscreen ? '125%' : '75%', 
            height: fullscreen ? '125%' : 500, 
            overflow: 'hidden', 
            marginVertical: 20 
          }}>
            {translate ? (
              <TouchableOpacity 
                activeOpacity={1} 
                onPress={toggleFullscreen} 
                style={{ backgroundColor: 'transparent', width: '100%', height: '100%' }}>
                <Image
                  source={{ uri: pages[currentPage]?.img || '' }} 
                  style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                />
              </TouchableOpacity>
            ) : (
              <View style={{
                width: '100%',
                borderColor: "#312509",
                borderWidth: 5,
                borderRadius: 20,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: "#f0ead6",
              }}>
                <TouchableOpacity onPress={changeEditState} style={{ position: 'absolute', top: 0, right: 0, padding: 10 }}>
                  <Ionicons name="pencil-outline" color={"black"} size={30} />
                </TouchableOpacity>
                <Text style={{ padding: 2 }}>{pages[currentPage]?.translated_img}</Text>
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

        {translate && !fullscreen && (
          <TouchableOpacity
            onPress={createPage}
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
              bottom: 156,
            }}
          >
            <Ionicons name="add" color={"White"} size={40} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Page;
