import React, { useState } from 'react';
import { ScrollView, SafeAreaView, View, Text, StyleSheet, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Friends = () => {
  const [friendSearch, setFriendSearch] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Friends</Text>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              value={friendSearch}
              placeholder="Where Are Your Friends?"
              onChangeText={setFriendSearch}
              placeholderTextColor="#888"
              selectionColor="#FFF" // Color of the cursor when the TextInput is focused
              underlineColorAndroid="transparent" // Removes the underline on Android
            />
          </View>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 350,
    borderWidth: 1,
    borderColor: '#357266',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 10,
    backgroundColor: '#1A4D56',
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    outlineStyle: 'none',
    flex: 1,
    color: '#FFF',
    borderWidth: 0, // Removes border
  },
});

export default Friends;
