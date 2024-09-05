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
  const AddFriend = async ( friendID) => {
    try {
      const response = await axios.post("http://127.0.0.1:8080/addFriend", {
        friend_id : friendID
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true // Include credentials if needed
      });
      router.back()
    } catch (error) {
      console.error(error);
    }
  };
  const RemoveFriend = async ( friendID ) => {
    try {
      const response = await axios.post("http://127.0.0.1:8080/denyRequest", {
        friend_id : friendID
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true // Include credentials if needed
      });
      router.back()
    } catch (error) {
      console.error(error);
    }
  };
  const RemoveTrade = async ( Book_id ) => {
    try {
      const response = await axios.post("http://127.0.0.1:8080/deleteTrade", {
        book2 : Book_id
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true // Include credentials if needed
      });
      router.back()
    } catch (error) {
      console.error(error);
    }
  };
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
        {friendRequests.map((friends, index) => (<FriendRequest key={index} username={friends.friend_data.display_name} pfp={friends.friend_data.pfp ? friends.friend_data.pfp : ''} addFriend={() => AddFriend(friends.id)} RemoveFriend={() => RemoveFriend(friends.id)}/>
      ))}
          {currentTradeRequest.length > 0 ? (
            currentTradeRequest.map((currentTradeRequest, index) => (
              <BookRequest
                key={index}
                book1cover={currentTradeRequest.book1[0]?.cover || 'default_image_url'}
                book2cover={currentTradeRequest.book2[0]?.cover || 'default_image_url'}
                removeBook={() => RemoveTrade(currentTradeRequest.book2[0]?.id)}
              />
            ))
          ) : (
            <Text></Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;