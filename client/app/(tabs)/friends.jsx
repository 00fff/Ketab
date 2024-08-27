import React from 'react';
import { ScrollView, SafeAreaView, View, Text, StyleSheet } from 'react-native';

const Friends = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Friends</Text>
        </View>
        <View>
            
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
    justifyContent: 'flex-start', // Align content to the top
    alignItems: 'center', // Center content horizontally
    paddingTop: 20, // Optional padding from the top
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
});

export default Friends;
