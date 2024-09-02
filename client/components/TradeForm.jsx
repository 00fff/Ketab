import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TradeForm = ({ width, height, left, right, color, bottom, onPress}) => {
  return (
    <SafeAreaView style={[styles.container, { width, height, left, right, backgroundColor: color, bottom }]}>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={onPress} style={styles.closeButton}>
          <Ionicons name="close-outline" size={25} />
        </TouchableOpacity>
        <Text style={styles.title}>Trade Books</Text>
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
});

export default TradeForm;
