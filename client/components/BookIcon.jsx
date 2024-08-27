import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';

const BookIcon = ({ title, onPressed, cover }) => {
  return (
    <TouchableOpacity onPress={onPressed} style={styles.button}>
      <View style={styles.iconContainer}>
        <Image style={styles.coverImage} source={cover} />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 10, // Added margin for spacing
  },
  iconContainer: {
    height: 80, // Height of the container
    width: 80,  // Width of the container
    backgroundColor: '#312509',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5, // Added padding for better spacing
  },
  coverImage: {
    height: 40, // Adjusted height to shrink the image
    width: 60,  // Adjusted width to shrink the image
    marginBottom: 5, // Space between image and text
  },
  title: {
    color: 'white',
    fontSize: 14, // Slightly reduced font size for better fit
    textAlign: 'center', // Center the text horizontally
  },
});

export default BookIcon;
