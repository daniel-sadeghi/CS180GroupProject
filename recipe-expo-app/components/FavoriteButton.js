import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useFavoriteContext } from '../contexts/FavoriteContext';

const FavoriteButton = ({heartStartState, onPress}) => {
  const [isHeartToggled, setHeartToggled] = useState(heartStartState);

  const handlePress = async () => {
    try {
      const success = await onPress();
      if (success) {
        setHeartToggled(!isHeartToggled);
      }
    } catch (error) {
      console.error('Error toggling heart:', error);
    }
  };

  useEffect(() => {
    // Update the state when heartStartState changes
    setHeartToggled(heartStartState);
  }, [heartStartState]);

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <MaterialCommunityIcons
          name={isHeartToggled ? 'heart' : 'heart-outline'}
          size={36}
          color={isHeartToggled ? 'red' : 'gray'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FavoriteButton;