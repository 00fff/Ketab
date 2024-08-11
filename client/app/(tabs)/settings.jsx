import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/CustomButton';
const LogOut = () => {

  }

const settings = () => {
  return (
    <SafeAreaView>
    <ScrollView>
    <View>
      <Text>settings</Text>
    </View>
    <View>
      <CustomButton text={'Log Out'} onPress={LogOut()}/>


    </View>
    </ScrollView>
    </SafeAreaView>
  );
};
export default settings;
