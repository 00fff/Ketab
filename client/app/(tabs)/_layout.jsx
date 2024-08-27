import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from 'react-native-vector-icons';

export default function TabsLayout() {
  return (
    <Tabs 
      screenOptions={{headerShown: false, 
        tabBarStyle: { backgroundColor: '#a3bbad',
        borderTopWidth: 0, // Remove top border
        }, 
        tabBarActiveTintColor: '#005e7c',
        tabBarInactiveTintColor: '#357266', // Color of the inactive tab icons and labels 
        
       }}
      >
      <Tabs.Screen
        name="home"
        options={{
          
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          tabBarLabel: 'Camera',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="camera" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          tabBarLabel: 'Community',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
    
  );
}
