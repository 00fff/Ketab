import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const FriendCard = ({ username, pfp }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image style={styles.profileImage} source={pfp} />
        <Text style={styles.username}>{username}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  card: {
    flexDirection: 'row', // Arrange items in a row
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
  },
});

export default FriendCard;
