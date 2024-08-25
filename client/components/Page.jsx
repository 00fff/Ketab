import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ScrollView, SafeAreaView, View, Image, TouchableOpacity, Text} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import EditWords from '../components/EditWords'

const Page = ({ book_id, createPage, updatePages, setUpdatePages}) => {
  const [pageCount, setPageCount] = useState(0); // State to track the total number of pages
  const [translate, setTranslate] = useState(false); // State to toggle translation mode
  const [pages, setPages] = useState([]); // State to store page data
  const [currentPage, setCurrentPage] = useState(0); // State to track the current page
  const [editWords, seteditWords] = useState(false)

  // Function to fetch pages from the API
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/listPages", {
        params: { book_id },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true, // Include credentials with the request
      });

      const data = response.data.response; // Extract data from the response
      console.log('API Response:', data); // Log the API response for debugging
      setPages(data); // Update the pages state with the fetched data
      setPageCount(data.length); // Update the pageCount state with the number of pages
    } catch (error) {
      console.error(error); // Log any errors that occur during the API request
    }
  };
  useEffect(() => {
    if (updatePages === true) {
      fetchBooks();
      setUpdatePages();
      createPage()
    }

  }, [updatePages]); // Dependency array includes updatePages

  
  const changeEditState = () => {
    seteditWords(!editWords)
  }
  // Function to go to the next page
  const NextPage = () => {
    const lastPage = pages.length - 1; // Calculate the index of the last page
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1); // Move to the next page
    } else {
      setCurrentPage(lastPage); // Stay on the last page
    }
  };

  // Function to go to the previous page
  const BackPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1); // Move to the previous page
    } else {
      setCurrentPage(0); // Stay on the first page
    }
  };

  // Function to toggle translation mode
  const Translate = () => {
    setTranslate(!translate); // Toggle the translate state
    console.log(translate); // Log the current translation state for debugging
  };
  
  // Fetch books data on component mount and set up an interval to refresh every hour
  useEffect(() => {
    fetchBooks(); // Fetch initial data
    setTranslate(true); // Set initial translate state
    const intervalId = setInterval(() => {
      fetchBooks(); // Refresh data every hour
    }, 3600000);
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#357266" }}>
        {editWords && (<EditWords id={pages[currentPage].id} changeEditState={changeEditState} width={300} height={500} color={'#a3bbad'} left={50} right={0} bottom={155} currentText={pages[currentPage]?.translated_img}/>)}
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* Display current page number and total page count */}
          <Text>{currentPage + 1} / {pageCount}</Text>
          
          <View style={{ 
            width: '75%', 
            height: 500, 
            overflow: 'hidden', 
            marginVertical: 20 
          }}>
            
            {translate ? (
              // Render image if in translate mode
              
              <Image
                source={{ uri: pages[currentPage]?.img || '' }}
                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
              />
              
            ) : (
              // Render translated content if not in translate mode
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
                <TouchableOpacity onPress={() => changeEditState()} style={{position: 'absolute', top: 0, right: 0, padding: 10, }}><Ionicons name="pencil-outline" color={"black"} size={30} /></TouchableOpacity>
                <Text style={{padding: 2}}>{pages[currentPage]?.translated_img}</Text>
              </View>
            )}
          </View>
          
          {/* Controls for navigating between pages and toggling translation */}
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
        
        {/* Button to trigger the createPage function */}
        {translate && (
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
              bottom: 156, // Positioned 30px from the bottom of the screen
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
