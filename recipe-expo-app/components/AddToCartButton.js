import React from 'react';
import {Pressable, Text, Animated} from 'react-native';

const animated = new Animated.Value(1);

const AddToCartButton = ({children, style}) => {
    const fadeIn = () => {
        Animated.timing(animated, {
          toValue: 0.1,
          duration: 100,
          useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(animated, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

      return (
        <Pressable onPressIn={fadeIn} onPressOut={fadeOut} style={style}>
            <Animated.View style={{ opacity: animated }}>{children}</Animated.View>
        </Pressable>
      );
}

export default AddToCartButton;