import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

const Recipe = ({ imageSource, bannerText }) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} resizeMode="contain" />
      <View style={styles.banner}>
        <Text style={styles.bannerText}>{bannerText}</Text>
      </View>
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
});


export default Recipe

