import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// npx expo install expo-image-picker -- --force
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

function ProfileView({ navigation }) {
  const [image, setImage] = useState(undefined);
  const [selectedItems, setSelectedItems] = useState({});
  const [user, setUser] = useState(undefined);
  
  useEffect(() => {
    const fetchUser = async () =>{
        fetch('https://jwt-postgre-tes.onrender.com/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZGIwODk4ZTEtNzYzMS00OWY3LTliN2QtNTk4NzJiOTZiOWVjIn0sImlhdCI6MTcwOTc4MTkwOSwiZXhwIjoxNzA5Nzg1NTA5fQ.K-8_RHJiJeyDBQWkOh0v0yWxmsWmc7l0RKFASmTR2eE`,
          },
        })
        .then(res => res.json())
        .then(data => {
          setUser(data[0])
          setImage(data[0].image)
          const selected = data[0]?.restrictions?.split(',')
          
          
          const selectedObj = {};
          for (const item of selected) {
            selectedObj[item] = true;
          }
          setSelectedItems(selectedObj);
        })
        .catch(err => console.log(err));
      }

      fetchUser()

    }
  
    , []
  )

  const handleSubmitRestriction = async () => {
    const selected = Object.keys(selectedItems).filter((item) => selectedItems[item]);
    const concatenatedString = selected.join(',');
    console.log(concatenatedString)
    
    
    fetch('https://jwt-postgre-tes.onrender.com/profile/restrictions', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZjZkNDBkNDQtODUzMy00YTAxLWIxZmYtOWFiYzIwMDNjNjQ4In0sImlhdCI6MTcwOTc4OTc2OCwiZXhwIjoxNzA5NzkzMzY4fQ.QdN2GE2daZc4cpQdiQ5NtWfeHFHFEnPTqotZpBFhmYA`,
      },
      body: JSON.stringify({ restriction: concatenatedString }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err));
  }

  const handlePress = async (item) => {
    setSelectedItems(prevState => ({ ...prevState, [item]: !prevState[item] }));
    await handleSubmitRestriction();
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
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZjZkNDBkNDQtODUzMy00YTAxLWIxZmYtOWFiYzIwMDNjNjQ4In0sImlhdCI6MTcwOTc4OTc2OCwiZXhwIjoxNzA5NzkzMzY4fQ.QdN2GE2daZc4cpQdiQ5NtWfeHFHFEnPTqotZpBFhmYA', // Replace with your actual token
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log('Upload successful:', data);
          setImage(data.name);
          // Handle the response data as needed
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
            source={{ uri: image+'?v='+ new Date().getTime()}}
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
          {"John Doe"}
      </Text>
      
      {/* Have the users name above*/}
      <Text 
        style={styles.email}>{"JohnDoe@email.com"}
      </Text> 
      {/* Have the users email above*/}

        <View style={styles.modalView}>
          <Text style={styles.textStyle}>Dietary Restrictions</Text>
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
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute' ,top: 50, left: 0, right: 0, bottom: 50,
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 45,
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
    marginTop: 15,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 30,
  },
  textStyle: {
    color: "#13A306",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: -17.5,
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
    marginBottom: 20,
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
  },
  icon: {
    width: 20,
    height: 20,
  },
});


export default ProfileView;
