import React from 'react';
import { ScrollView, View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import { SafeAreaFrameContext } from 'react-native-safe-area-context';
import { Ionicons } from 'react-native-vector-icons';

const home = () => {
  return (
    <SafeAreaView style={{backgroundColor: '#357266', flex: 1}}>
    <ScrollView>
      <View>
      <Text style={{fontSize: 50, textAlign: 'center', padding: 20}}>Books</Text>
      </View>
      <TouchableOpacity>
    <View style={{backgroundColor: '#312509', width: 80, height: 80, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
      <Ionicons name="add-outline" color={"white"} size={25}/>
    </View>
    </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
};
export default home;
