import React from 'react';
import {View, StyleSheet, Image, Text, ActivityIndicator} from 'react-native';

const Recipe = (props) => {
    const {title, image} = props;

    return (
        <View style={styles.container} overflow='hidden'>
            <Image source={{uri: image}} style={styles.image} resizeMode="stretch" />
            <View style={styles.banner}>
                <Text style={styles.bannerText}>{title}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 250,
        width: 350,
        borderRadius: 20,
        borderWidth: 1,
        margin: 10,
    },
    image: {
        minWidth: 350,
        minHeight: 250,
    },
    banner: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black background for the bannerText
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10, 
    },
    bannerText: {
        color: 'white',
        textAlign: 'left',
    },
});


export default Recipe

