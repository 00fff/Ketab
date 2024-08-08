import React from 'react';
import { ScrollView, View, Text, SafeAreaView} from 'react-native';
import { SafeAreaFrameContext } from 'react-native-safe-area-context';

const home = () => {
  return (
    <SafeAreaView>
    <ScrollView>
    <View>
      <Text>home</Text>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};
export default home;
