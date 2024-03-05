import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

const Ingredient = ({name, price, image}) => {
    return (
        <View style={styles.ingredient}>
            <View style={styles.name}>
                <Text style={styles.name}>{name}</Text>
            </View>
            <View style={styles.image}>
                <Image source={{uri: image}} resizeMode="stretch" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ingredient: {
        flexDirection: 'row',
        backgroundColor: '#a4f28a',
        padding: 20,
        marginVertical: 3,
        marginHorizontal: 16,
    },
    name: {
        flex: 1,
        fontSize: 16,
    },
    image: {
        flex: 1,
    },
  });

export default Ingredient;