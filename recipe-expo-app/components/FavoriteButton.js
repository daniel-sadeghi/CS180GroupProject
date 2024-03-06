import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FavoriteButton = () => {
  const [isHeartToggled, setHeartToggled] = useState(false);

  const handleToggleHeart = () => {
    // Toggle the heart state
    setHeartToggled(!isHeartToggled);
    console.log("heart toggled")

    // Perform other actions (e.g., API requests) here

  };

  return (
    <View>
      <TouchableOpacity onPress={handleToggleHeart}>
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