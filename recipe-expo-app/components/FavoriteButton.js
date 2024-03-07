import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useFavoriteContext } from '../contexts/FavoriteContext';

const FavoriteButton = ({heartStartState, id, title, imageURL, sourceURL, spoonacularSourceURL}) => {
  const [isHeartToggled, setHeartToggled] = useState(heartStartState);
  const {token} = useAuth();

  const handleToggleHeart = () => {
    // Toggle the heart state
    setHeartToggled(!isHeartToggled); 
  };

  useEffect(() => {

      if(isHeartToggled == true){

        const addFavorite = async () => {
        try {
            // post onto favorites table
            await axios.post('https://jwt-postgre-tes.onrender.com/favorites', {
            food_id: id,
            title: title,
            imageURL: imageURL,
            sourceURL: sourceURL,
            spoonacularSourceURL: spoonacularSourceURL,
            }, {
            headers: {
              Authorization: `${token}`,
            },
          });
        } catch (error) {
          console.error('Error adding favorite:', error);
        }
      }
      addFavorite();
    }
    else{
      const deleteFavorite = async () => {
        try {
            await axios.delete(`https://jwt-postgre-tes.onrender.com/favorites/${id}`, {
            headers: {
              Authorization: `${token}`,
            }
          });
        } catch (error) {
          console.error('Error removing favorite:', error);
        }
      }
      deleteFavorite();
    }
    
  }, [isHeartToggled]); 

  return (
    <View testID="FavoriteButton:Container">
      <TouchableOpacity onPress={handleToggleHeart} testID="FavoriteButton:Button:ClickMe">
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