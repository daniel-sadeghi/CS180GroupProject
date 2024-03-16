import React from 'react';
import {Pressable, Text, Animated, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const animated = new Animated.Value(1);

const AddToCartButton = ({children, style, navigation, ingredients}) => {
    const fadeIn = () => {
        Animated.timing(animated, {
          toValue: 0.1,
          duration: 100,
          useNativeDriver: true,
        }).start();
    };

    const onPressOut = async () => {
        Animated.timing(animated, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start();
        try {

            //Check this code
            const response = await AsyncStorage.getItem('cart');
            if (response !== null) {
                const cart = JSON.parse(response);
                cart.push(...ingredients);
                await AsyncStorage.setItem('cart', JSON.stringify(cart));
            } else {
                await AsyncStorage.setItem('cart', JSON.stringify(ingredients));
            }
            console.log(await AsyncStorage.getItem('cart'));
            Alert.alert("Sucess", "Ingredients added to your cart");
        } catch (error) {

        }
    };

      return (
          <Pressable onPressIn={fadeIn} onPressOut={onPressOut} style={style}>
           <Animated.View style={{ opacity: animated }}>{children}</Animated.View>
            </Pressable>
      );
}

export default AddToCartButton;