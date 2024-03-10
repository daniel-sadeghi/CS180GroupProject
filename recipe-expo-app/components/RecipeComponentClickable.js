import React, {useState} from 'react';
import {View, StyleSheet, Image, Text, Pressable, Modal, TouchableOpacity } from 'react-native';

const RecipeClickable = ({ imageSource, bannerText }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      </TouchableOpacity>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>{bannerText}</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Ingredients: </Text>
            <Text>Ingredients are going to be listed here</Text>
            <Text>Ingredient 1</Text>
            <Text>Ingredient 2</Text>
            <Text>Ingredient 3</Text>
            <Text>Total: $10</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Adjust this value as needed
  },
  image: {
    width: '100%',
    aspectRatio: 9/16, // Assuming aspect ratio of the image
    height: '100%',
  },
  banner: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black background for the banner
    padding: 9.5,
    position: 'absolute',
    bottom: '17%',
    left: 0,
    right: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  bannerText: {
    color: 'white',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -180,
  },
  modalView: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'left',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'left',
  },
});


export default RecipeClickable

