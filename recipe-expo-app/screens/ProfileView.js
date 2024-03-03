import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// npx expo install expo-image-picker -- --force
import Constants from 'expo-constants';
// npx expo install expo-constants -- --force        
import * as Permissions from 'expo-permissions';
// npx expo install expo-permissions -- --force    
import { Ionicons } from '@expo/vector-icons';

function ProfileView({ navigation }) {
  const [image, setImage] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});

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
      <Text 
        style={styles.name}>{"John Doe"}
        </Text>
      {/* Have the users name above*/}
      <Text 
        style={styles.email}>{"JohnDoe@email.com"}
      </Text> 
      {/* Have the users email above*/}
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
