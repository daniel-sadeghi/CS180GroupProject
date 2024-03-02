import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// npx expo install expo-image-picker -- --force
import Constants from 'expo-constants';
// npx expo install expo-constants -- --force        
import * as Permissions from 'expo-permissions';
// npx expo install expo-permissions -- --force    
import placeholder from "../assets/default-profilepic.jpg";

function ProfileView({ navigation }) {
  const [image, setImage] = useState(null);

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
       setImage(result.assets[0].uri);
    }

    const saveImage = async () => {
      try {
        await AsyncStorage.setItem('profileImage', result.assets[0].uri);
        setModalVisible(false);
      } catch (error) {
        console.log('Error saving image:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Display user profile information here */}
      {/* <Image
        source={require('../assets/default-profilepic.jpg')}
        style={styles.profilePicture}
      /> */}
      {console.log('Image URI:', image)}
      {image && (
      <Image 
        source={image ? { uri: image } : placeholder} 
        style={styles.profilePicture} 
        onLoad={() => {
          console.log("Image loaded");
        }}
        onError={(error) => console.log('Image error', error)}
      />
      )}
      <Button title="Edit Photo" onPress={pickImage} />
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
    marginBottom: 5,
  },
  name: {
    fontSize: 20,
    color: '#13A306',
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
});


export default ProfileView;
