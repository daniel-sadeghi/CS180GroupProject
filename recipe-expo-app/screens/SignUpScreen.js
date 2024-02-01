import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native';

function SignUpScreen({ navigation }) {
  return (
    <View>
      <Text>Sign Up Screen</Text>
      <Button
        title="Back to Home Page"
        onPress={() => navigation.navigate('Home')}
      />
      {/* Add your sign-up form here */}
    </View>
  );
}

export default SignUpScreen;