import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, Modal, TouchableHighlight, ImageBackground, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// npx expo install expo-image-picker -- --force
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import LogoutButton from '../contexts/LogoutButton';

function ProfileView({ navigation }) {
  const [image, setImage] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [userData, setUserData] = useState([]);
  const { token } = useAuth();
  const { isLoggedIn, login } = useAuth();
  let [isLoading, setIsLoading] = useState(false);

  // Call the function when the component mounts or as needed
  useEffect(() => {
  const fetchUserData = async () => {

    if(token != null){
      console.log("Attempting to pull profile with token: ", token);
      setIsLoading(true); // Set isLoading to true while fetching
    try {
      const response = await axios.get('https://jwt-postgre-tes.onrender.com/profile', {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(response.data);
      setUserData(response.data);
      console.log('User Data:', userData);
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

    if (!result.canceled) {
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
        <Ionicons 
          name="camera" 
          size={24} 
          color="green" />
      </TouchableOpacity>
      {isLoading ? (
        <ActivityIndicator size="large" />
        ) : isLoggedIn ? (
        <>
          <Text style={styles.name}>{userData[0]?.user_name}</Text>
          <Text style={styles.email}>{userData[0]?.user_email}</Text> 
          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={selectedItems['item1'] ? styles.selectedMenuItem : styles.menuItem} onPress={() => handlePress('item1')}>
              <Image source={require('../assets/vegan.png')} style={styles.icon}/>
              <Text style={styles.menuItemText}>Vegan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={selectedItems['item2'] ? styles.selectedMenuItem : styles.menuItem} onPress={() => handlePress('item2')}>
              <Image source={require('../assets/nogluten.png')} style={styles.icon}/>
              <Text style={styles.menuItemText}>Gluten Free</Text>
            </TouchableOpacity>
            <TouchableOpacity style={selectedItems['item3'] ? styles.selectedMenuItem : styles.menuItem} onPress={() => handlePress('item3')}>
              <Image source={require('../assets/nonlactose.png')} style={styles.icon}/>
              <Text style={styles.menuItemText}>Lactose</Text>
            </TouchableOpacity>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "green" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Menu</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Dietary Restrictions</Text>
      </TouchableOpacity>
      <LogoutButton/>
        </>
      ) : (
        <><Text style={styles.guest}>Welcome, Guest! Please log in to view your profile.</Text><>
            <Button
              title="Sign Up here!"
              onPress={() => navigation.navigate('SignUp')} />
            <Button
              title="Login here!"
              onPress={() => navigation.navigate('Login')} />
              
          </></>
      )}
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    position: 'absolute' ,top: 150, left: 0, right: 0, bottom: 0,
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 35,
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
    height: '40%',
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 30,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 30,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: -17.5,
    marginTop: 50,
  },
  name: {
    fontSize: 20,
    color: '#13A306',
    fontWeight: 'bold',
    marginTop: 15,
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
  guest: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
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
