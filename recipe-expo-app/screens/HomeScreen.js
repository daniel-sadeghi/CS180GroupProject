import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to Recipe Sharing App!</Text>
      <Button
        title="Sign Up here!"
        onPress={() => navigation.navigate('SignUp')}
        color="#3498db" // Custom color for the button
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  link: {
    color: 'blue',
    fontSize: 16,
    marginVertical: 10,
  },
});