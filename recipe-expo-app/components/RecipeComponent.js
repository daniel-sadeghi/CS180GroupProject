import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

const Recipe = ({ imageSource, bannerText }) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} resizeMode="cover" />
      <View style={styles.banner}>
        <Text style={styles.bannerText}>{bannerText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9, // Assuming aspect ratio of the image
  },
  banner: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black background for the banner
    padding: 10,
    position: 'absolute',
    bottom: 0,
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

