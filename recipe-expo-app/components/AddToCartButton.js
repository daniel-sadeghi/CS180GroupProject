import React from 'react';
import {Pressable, Text, Animated, Alert} from 'react-native';

const animated = new Animated.Value(1);

const AddToCartButton = ({children, style, navigation}) => {
    const fadeIn = () => {
        Animated.timing(animated, {
          toValue: 0.1,
          duration: 100,
          useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.timing(animated, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start();
        Alert.alert("Added to Cart", "Ingredients have been successfully added to your cart");
    };

      return (
        <Pressable onPressIn={fadeIn} onPressOut={onPressOut} style={style}>
            <Animated.View style={{ opacity: animated }}>{children}</Animated.View>
        </Pressable>
      );
}

export default AddToCartButton;