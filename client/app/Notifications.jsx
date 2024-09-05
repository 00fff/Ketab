import React, { useEffect, useState } from 'react';
import { ScrollView, SafeAreaView, View, Text } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter hook for navigation
import axios from 'axios';
import FriendRequest from '../components/FriendRequest';
import BookRequest from '../components/BookRequest';

const Notifications = () => {
  const router = useRouter();
  const [friendRequests, setFriendRequests] = useState([]);
  const [currentTradeRequest, setCurrentTradeRequest] = useState([]);

  const fetchFriendRequest = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/listFriendRequests", {
        headers: {
          'Content-Type': 'application/json' // Updated header type
        },
        withCredentials: true
      });
      const data = response.data.friends;
      setFriendRequests(data);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    }
  };

  const fetchTradeRequest = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/listTradeRequest", {
        headers: {
          'Content-Type': 'application/json' // Updated header type
        },
        withCredentials: true
      });
      const data = response.data.response;
      setCurrentTradeRequest(data);
    } catch (error) {
      console.error('Error fetching trade requests:', error);
    }
  };

  useEffect(() => {
    fetchFriendRequest();
    fetchTradeRequest();
  }, []);

  // Log data to check what is being set
  useEffect(() => {
    console.log('Friend Requests:', friendRequests);
  }, [friendRequests]);

  useEffect(() => {
    console.log('Current Trade Requests:', currentTradeRequest);
  }, [currentTradeRequest]);

  return (
    <SafeAreaView style={{ backgroundColor: '#357266', flex: 1 }}>
      <ScrollView>
        <View>
          {friendRequests.length > 0 ? (
            friendRequests.map((friend, index) => (
              <FriendRequest
                key={index}
                username={friend.friend_data.display_name}
                pfp={friend.friend_data.pfp || ''}
              />
            ))
          ) : (
            <Text>No Friend Requests</Text>
          )}
          {currentTradeRequest.length > 0 ? (
            currentTradeRequest.map((currentTradeRequest, index) => (
              <BookRequest
                key={index}
                book1cover={currentTradeRequest.book1[0]?.cover || 'default_image_url'}
                book2cover={currentTradeRequest.book2[0]?.cover || 'default_image_url'}
              />
            ))
          ) : (
            <Text>No Trade Requests</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;
