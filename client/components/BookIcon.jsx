import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const BookIcon = ({ title, onPressed }) => {
  return (
    <TouchableOpacity onPress={onPressed} style={styles.button}>
      <View style={styles.iconContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 20,
    margin: 10, // Added margin for spacing
  },
  iconContainer: {
    height: 100,
    width: 100,
    backgroundColor: '#312509',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center', // Center the text horizontally
  },
  title: {
    color: 'white', // Make sure the text is visible
    fontSize: 16,
    textAlign: 'center', // Center the text horizontally
  },
});

export default BookIcon;
