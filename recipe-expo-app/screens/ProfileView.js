import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// npx expo install expo-image-picker -- --force
import Constants from 'expo-constants';
// npx expo install expo-constants -- --force        
import * as Permissions from 'expo-permissions';
// npx expo install expo-permissions -- --force    
import { Ionicons } from '@expo/vector-icons';
import placeholder from '../assets/default-profilepic.jpg';

function ProfileView({ navigation }) {
  const [image, setImage] = useState(undefined);
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
      {/* {image && (
      <Image 
        source={image ? { uri: image } : require('../assets/default-profilepic.jpg')} 
        style={[styles.profilePicture, { borderColor: 'green', borderWidth: 4 }]} 
        onLoad={() => {
          console.log("Image loaded");
        }}
        onError={(error) => console.log('Image error', error)}
      />
      )} */}
      {image ? (
          <Image
            source={{ uri: image }}
            style={[styles.profilePicture,]}
          />
        ) : (
          <Image
            source={require('../assets/default-profilepic.jpg')}
            style={[styles.profilePicture,]}
          />
        )
      }
      <TouchableOpacity onPress={pickImage} style={styles.cameraButton}>
        <Ionicons name="camera" size={24} color="green" />
      </TouchableOpacity>
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
    marginBottom: -15,
  },
  name: {
    fontSize: 20,
    color: '#13A306',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 24,
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
});


export default ProfileView;
