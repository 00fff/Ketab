import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FriendCard = ({ username, pfp, removeFriend}) => {
  return (
    <View style={styles.card}>
      <Image 
        style={styles.profileImage} 
        source={pfp ? { uri: pfp } : { uri: "https://tr.rbxcdn.com/fcb4582468ed3c72d2d99527a6519667/420/420/Hat/Webp" }} 
      />
      <Text style={styles.username}>{username}</Text>
      <View style={styles.spacer} />
      <TouchableOpacity style={styles.closeButton}>
        <Ionicons name="swap-vertical-outline" size={25} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity onPress={removeFriend} style={{marginLeft: 10,}}>
        <Ionicons name="close-circle-outline" size={25} color="#000" />
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', // Arrange items in a row
    alignItems: 'center', // Center items vertically
    width: 370,
    height: 100,
    backgroundColor: '#a3bbad',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 10,
    marginRight: 10, // Adds space between the image and the text
  },
  username: {
    fontSize: 18, // Adjust the font size as needed
    color: '#000', // Adjust the text color as needed
    flexShrink: 1, // Prevents text from overflowing
  },
  spacer: {
    flex: 1, // Pushes the button to the right
  },
  closeButton: {
    marginLeft: 'auto', // Aligns the button to the right
    borderRadius: 100,
    width: 25
  },
});

export default FriendCard;
