import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableHighlight, Button, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// npx expo install expo-image-picker -- --force
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import LogoutButton from '../contexts/LogoutButton';
import * as FileSystem from 'expo-file-system';

function ProfileView({ navigation }) {
  const [image, setImage] = useState(undefined);
  const [selectedItems, setSelectedItems] = useState({});
  const [user, setUserData] = useState([]);
  const { token } = useAuth();
  const { isLoggedIn, login } = useAuth();
  let [isLoading, setIsLoading] = useState(false);

  // Call the function when the component mounts or as needed
  useEffect(() => {
  const fetchUserData = async () => {

    if(token != null){
      setIsLoading(true); // Set isLoading to true while fetching
    try {
      const response = await axios.get('https://jwt-postgre-tes.onrender.com/profile', {
        headers: {
          Authorization: `${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    finally {
      setIsLoading(false); // Set isLoading back to false
    }
    }
    else{
      console.log("Using guest context");
    }
  };
    if(token){
      fetchUserData();
    }
    else{
      setIsLoading(false); // Set isLoading back to false
    }
  }, [token]);

  const handlePress = (item) => {
    setSelectedItems(prevState => ({ ...prevState, [item]: !prevState[item] }));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
  
      // Get the base64 representation of the image
      let base64Img = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      // Create a file name
      let fileName = 'croppedImage.jpg';
  
      // Define the path where you want to save the image
      let imagePath = FileSystem.documentDirectory + fileName;
  
      // Write the base64 data to the file
      await FileSystem.writeAsStringAsync(imagePath, base64Img, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      // Create FormData object to send the file as form data
      let formData = new FormData();
      formData.append('file', {
        uri: imagePath,
        name: fileName,
        type: 'image/jpeg', // Adjust the type according to your file type
      });

      // Send the POST request
      fetch('https://jwt-postgre-tes.onrender.com/upload/', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token, // Replace with your actual token
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log('Upload successful:', data);
        setImage(data.name+'?v='+ new Date().getTime());
        })
        .catch(error => {
          console.error('Error uploading image:', error);
          // Handle any errors
        });
    }
  };

  return (
    <View style={styles.container}>
      {/* Display user profile information here */}

      {image ? (
        <>
          <Image
            source={{ uri: image }} 
            style={[styles.profilePicture,]}
          />

        </>
        ) : (
          <Image
            source={require('../assets/default-profilepic.jpg')}
            style={[styles.profilePicture,]}
          />
        )
      }
      
      <TouchableOpacity 
        onPress={pickImage} 
        style={[styles.cameraButton]}
      >
        <Ionicons 
          name="camera" 
          size={24} 
          color="green" />
      </TouchableOpacity>

      <Text 
        style={styles.name}
      >
          {user?.user_name}
      </Text>
      
      {/* Have the users name above*/}
      <Text 
        style={styles.email}
      >
        {user?.user_email}
      </Text> 
      {/* Have the users email above*/}
 {token && <>
        <View style={styles.modalView}>
          <Text style={styles.textStyle1}>Dietary Restrictions</Text>
          <TouchableOpacity style={selectedItems['gluten_free'] ? styles.selectedMenuItem : styles.menuItem} onPress={() => handlePress('gluten_free')}>
            <Image source={require('../assets/glutenfree.png')} style={styles.icon}/>
            <Text style={styles.menuItemText}>Gluten Free</Text>
          </TouchableOpacity>
          <TouchableOpacity style={selectedItems['ketogenic'] ? styles.selectedMenuItem : styles.menuItem} onPress={() => handlePress('ketogenic')}>
            <Image source={require('../assets/ketogenic.png')} style={styles.icon}/>
            <Text style={styles.menuItemText}>Ketogenic</Text>
          </TouchableOpacity>
          <TouchableOpacity style={selectedItems['vegetarian'] ? styles.selectedMenuItem : styles.menuItem} onPress={() => handlePress('vegetarian')}>
            <Image source={require('../assets/vegetarian.png')} style={styles.icon}/>
            <Text style={styles.menuItemText}>Vegetarian</Text>
          </TouchableOpacity>
          <TouchableOpacity style={selectedItems['vegan'] ? styles.selectedMenuItem : styles.menuItem} onPress={() => handlePress('vegan')}>
            <Image source={require('../assets/vegan.png')} style={styles.icon}/>
            <Text style={styles.menuItemText}>Vegan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={selectedItems['pescetarian'] ? styles.selectedMenuItem : styles.menuItem} onPress={() => handlePress('pescetarian')}>
            <Image source={require('../assets/pescetarian.png')} style={styles.icon}/>
            <Text style={styles.menuItemText}>Pescetarian</Text>
          </TouchableOpacity>

          <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "green" }}
              onPress={() => {
                handleSubmitRestriction();
              }}
            >
              <Text style={styles.textStyle2}>Save</Text>
            </TouchableHighlight>
            <LogoutButton style={{ ...styles.openButton, backgroundColor: "green" }}/>
        </View>
        </>}
        {
  !token &&
    <>
    <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "green" }}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.textStyle2}>Log In</Text>
    </TouchableHighlight>
    
    <TouchableHighlight
      style={{ ...styles.openButton, backgroundColor: "green" }}
      onPress={() => navigation.navigate('SignUp')}
    >
      <Text style={styles.textStyle2}>Sign Up</Text>
    </TouchableHighlight>
    </>

}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute' ,top: 50, left: 0, right: 0, bottom: 30,
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    height: '50%',
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 30,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 30,
  },
  textStyle1: {
    color: "#13A306",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  textStyle2: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 0,
    fontFamily: "Palatino",
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: -17.5,
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    color: '#13A306',
    fontWeight: 'bold',
    marginTop: 15,
    fontFamily: "Palatino",
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
    marginBottom: 20,
    fontFamily: "Palatino",
  },
  guest: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
    fontFamily: "Palatino",
  },
  selectedMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ddd',
    width:'100%',
    height: 50,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width:'100%',
    height: 50,
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#333',
    fontFamily: "Palatino",
  },
  icon: {
    width: 20,
    height: 20,
  },
  logout: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 30,
  },
});


export default ProfileView;
