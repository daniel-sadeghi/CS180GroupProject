import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Welcome to Recipe Sharing App!</Text>
      <Button
        title="Sign Up here!"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
}

export default HomeScreen;