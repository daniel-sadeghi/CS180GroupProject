import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

function ProfileView({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Display user profile information here */}
      <Image
        source={require('../assets/profile.jpeg')}
        style={styles.profilePicture}
      />
      <Text style={styles.name}>{"John Doe"}</Text>
      {/* Have the users name above*/}
      <Text style={styles.email}>{"JohnDoe@email.com"}</Text> 
      {/* Have the users email above*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute' ,top: -200, left: 0, right: 0, bottom: 200,
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
});


export default ProfileView;
