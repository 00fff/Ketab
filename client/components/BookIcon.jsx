import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';

const BookIcon = ({ title, onPressed, cover }) => {
  if (title.length > 9) {
    title = title.slice(0, 9)
    title = title + "..."
  }
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
    padding: 8,
    margin: 12, // Modern spacing for outer margin
  },
  iconContainer: {
    height: 90, // Slightly larger for a more balanced look
    width: 90,  // Slightly larger for a more balanced look
    backgroundColor: '#2C2C2E', // Modern dark gray background
    borderRadius: 15, // More rounded corners
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10, // Padding for a cleaner layout
    shadowColor: '#000', // Subtle shadow for a floating effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  coverImage: {
    height: 50, // Slightly larger for emphasis
    width: 50,  // Proportional width
    marginBottom: 8, // More space between image and text
    borderRadius: 10, // Rounded corners for the image
  },
  title: {
    color: '#F5F5F7', // Light gray for modern contrast
    fontSize: 16, // Modern font size
    fontWeight: '600', // Medium font weight for readability
    textAlign: 'center', // Center the text horizontally
  },
});

export default BookIcon;
