import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import USDFormat from '../utils/USDFormat';

const Ingredient = ({name, price, image}) => {

    return (
        <View style={styles.ingredientBox}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>{USDFormat(price)}</Text>
            <View style={styles.image}>
                <Image source={{uri: image}} resizeMode="stretch" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ingredientBox: {
        flexDirection: 'row',
        backgroundColor: '#f8f8ff',
        padding: 15,
        borderWidth: 1,
        borderColor: '#C0C0C0',
        marginHorizontal: 0,
    },
    name: {
        flex: 5,
        fontSize: 16,
    },
    price: {
        flex: 1,
        fontSize: 16,
    },
    image: {
        flex: 1,
    },
  });

export default Ingredient;