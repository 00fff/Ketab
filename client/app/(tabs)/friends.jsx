import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, View, Text, StyleSheet, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import FriendCard from "../../components/friendCard";

const Friends = () => {
  const [friendSearch, setFriendSearch] = useState('');
  const [friendlist, setFriendList] = useState("")
  const [currentFriendList, setcurrentFriendList] = useState([])
  const FriendsList = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/friendList", {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
      });
      const data = response.data.friends;
      setcurrentFriendList(data)
      console.log(currentFriendList)
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  }
  const SearchFriends = async (word) => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/friendSearch", {
        params: {
          query: word, // Pass the query parameter in the params object
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true // Include credentials if needed
      });
      const data = response.data;
      console.log('API Response:', data);
      setFriendList(data); // Adjust based on the actual data structure
      console.log(friendlist)
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    FriendsList();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Search</Text>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              value={friendSearch}
              placeholder="Where Are Your Friends?"
              onChangeText={setFriendSearch}
              placeholderTextColor="#888"
              selectionColor="#FFF" // Color of the cursor when the TextInput is focused
              underlineColorAndroid="transparent" // Removes the underline on Android
              onSubmitEditing={() => SearchFriends(friendSearch)} // Handles Enter key press
            />
          </View>
          <View>
            <Text><Text style={styles.friend_title}>Friends List</Text></Text>
          </View>
          <View style={{ width: '100%', height: "66%", top: 55, overflow: 'scroll'}}>
            {currentFriendList.map((Friend, index) => (
              <FriendCard key={index }username={Friend.display_name} pfp={Friend.pfp}/>
            ))}
          
          
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#357266',
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  friend_title : {
    fontSize: 25,
    textAlign: 'center',
    padding: 20,
    top: 20,
    backgroundColor: '#a3bbad',
    borderRadius: 10,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0.1, height: 0.1 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    padding: 20,
    backgroundColor: '#a3bbad',
    borderRadius: 10,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0.1, height: 0.1 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 350,
    borderWidth: 1,
    borderColor: '#357266',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 10,
    backgroundColor: '#1A4D56',
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    outlineStyle: 'none',
    flex: 1,
    color: '#FFF',
    borderWidth: 0, // Removes border
  },
});

export default Friends;
