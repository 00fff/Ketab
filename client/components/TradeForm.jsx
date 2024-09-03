import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BookSelect from '../components/BookSelect'; // Import SettingsForm component
const TradeForm = ({ width, height, left, right, color, bottom, onPress}) => {
  const [toggleBook, setToggleBook] = useState(false)
  const [book1, setBook1] = useState("")
  const [book2, setBook2] = useState("")
  const [bookchoice, setbookChoice] = useState("")
  const OpenBookSelection = (choice) => {
    setToggleBook(!toggleBook)
    setbookChoice(choice)
    console.log("choice " + bookchoice)
  }
  const addBook = ( id ) => {
    if (bookchoice === 1) {
      setBook1(id)
    } if (bookchoice === 2) {
      setBook2(id)
    }
    console.log(id)
    setToggleBook(!toggleBook)
  }
  return (
    <SafeAreaView style={[styles.container, { width, height, left, right, backgroundColor: color, bottom }]}>
      <View style={styles.innerContainer}>
        {toggleBook && <BookSelect width={300} height={350} color={'#a3bbad'} left={-2} right={0} bottom={-2} closeTab={() => OpenBookSelection()} submitData={addBook} choice={bookchoice}/>}
        <TouchableOpacity onPress={onPress} style={styles.closeButton}>
          <Ionicons name="close-outline" size={25} />
        </TouchableOpacity>
        <Text style={styles.title}>Trade Books</Text>
        <View style={styles.BookRow}>
        <TouchableOpacity onPress={() => OpenBookSelection( 1 )} style={styles.books}>{book1 ? <Text>{book1}</Text> : <Text>Select Book 1</Text>}</TouchableOpacity>
        <TouchableOpacity onPress={() => OpenBookSelection( 2 )} style={styles.books}>{book2 ? <Text>{book2}</Text> : <Text>Select Book 2</Text>}</TouchableOpacity>
        </View>
       
        <TouchableOpacity style={styles.sendRequest}>Send Request</TouchableOpacity>
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

export default TradeForm;
