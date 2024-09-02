import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const RfreindCard = ({ username, pfp, addfriend}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image style={styles.profileImage} source={pfp ? pfp   : "https://tr.rbxcdn.com/fcb4582468ed3c72d2d99527a6519667/420/420/Hat/Webp"} />
        <Text style={styles.username}>{username}</Text>
        <TouchableOpacity onPress={addfriend} style={{right: 0, top: 25, flexDirection: 'row', backgroundColor: '#357266', height: 35, borderColor: 'black', borderWidth: 3, borderRadius: 10,}}>
          <Ionicons name="paper-plane-outline" size={25} />
        </TouchableOpacity>
        
      </View>
      <View>
        
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
    flex: 1,
    fontSize: 18, // Adjust the font size as needed
    color: '#000', // Adjust the text color as needed
  },
});

export default RfreindCard;
