import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const BookRequest = ({ book1cover, book2cover }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="add-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButtonx}>
          <Ionicons name="close-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Image
          style={styles.bookImage}
          source={{ uri: book1cover || "https://tr.rbxcdn.com/fcb4582468ed3c72d2d99527a6519667/420/420/Hat/Webp" }}
        />
        <View style={styles.syncIconContainer}>
          <Ionicons name="sync-outline" size={50} color="black" />
        </View>
        <Image
          style={styles.bookImage}
          source={{ uri: book2cover || "https://tr.rbxcdn.com/fcb4582468ed3c72d2d99527a6519667/420/420/Hat/Webp" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 15, // Adjust for better spacing
    marginLeft:10,
  },
  card: {
    flexDirection: 'row', // Arrange items in a row
    width: '100%', // Responsive width
    height: 100,
    backgroundColor: '#a3bbad',
    borderRadius: 10,
    paddingVertical: 10, // Adjust padding for better layout
    paddingHorizontal: 15, // Adjust padding for better layout
    alignItems: 'center',
    justifyContent: 'space-between', // Space out the items evenly
  },
  iconButtonx: {
    backgroundColor: 'red', // Background color for the button
    borderRadius: 25, // Rounded button
    padding: 10,
    alignItems: 'center', // Center icon inside button
    justifyContent: 'center', // Center icon inside button
    marginHorizontal: 5, // Space between buttons
  },
  iconButton: {
    backgroundColor: '#4CAF50', // Background color for the button
    borderRadius: 25, // Rounded button
    padding: 10,
    alignItems: 'center', // Center icon inside button
    justifyContent: 'center', // Center icon inside button
    marginHorizontal: 5, // Space between buttons
  },
  bookImage: {
    width: 75,
    height: 75,
    borderRadius: 10,
  },
  syncIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // Make sure the sync icon is centered between the two book covers
  },
});

export default BookRequest;
