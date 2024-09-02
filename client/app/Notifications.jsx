import React, {useEffect, useState} from 'react';
import { ScrollView, SafeAreaView, View, TextInput, Text, TouchableOpacity} from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter hook for navigation
import { CameraView, CameraType, useCameraPermissions} from 'expo-camera';
import FriendRequest from '../components/FriendRequest'
import axios from 'axios';

const Notifications = () => {
  const router = useRouter();
  const [FriendRequests, setFriendRequests] = useState([]) 
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
    } catch (error) {
      console.error(error);
    }
  };
  const FetchFriendRequest = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/listFriendRequests", {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true // Include credentials if needed
      });
      const data = response.data.friends;
      setFriendRequests(data)
      
      console.log('API Response:', FriendRequests);
      console.log(data[0].friend_data)
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    FetchFriendRequest();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#357266', flex: 1 }}>
    <ScrollView>
    <View>
      {FriendRequests.map((friends, index) => (<FriendRequest key={index} username={friends.friend_data.display_name} pfp={friends.friend_data.pfp ? friends.friend_data.display_name : ''} addFriend={() => AddFriend(friends.id)}/>
      ))}
  
    </View>
    </ScrollView>
    </SafeAreaView>
    
  );
  
};

export default Notifications;
