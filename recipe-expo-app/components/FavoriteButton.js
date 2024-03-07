import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useFavoriteContext } from '../contexts/FavoriteContext';

const FavoriteButton = ({heartStartState, id, title, imageURL, sourceURL, spoonacularSourceURL}) => {
  const [isHeartToggled, setHeartToggled] = useState(heartStartState);
  const {token} = useAuth();
  const { currentFavorites, setCurrentFavorites } = useFavoriteContext();

  const handleToggleHeart = () => {
    // Toggle the heart state
    setHeartToggled(!isHeartToggled);

  };

  useEffect(() => {
      console.log("heart toggled is:" , isHeartToggled);

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
          }).then(
          // now add it to the favorites context
          await axios.get('https://jwt-postgre-tes.onrender.com/favorites', 
            {
              headers: {
                Authorization: `${token}`,
              }
            }).then(res => setCurrentFavorites(res.data)));
            console.log("Current Favorites: " ,currentFavorites);
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
          }).then(
          // now remove it from favorites context
          await axios.get('https://jwt-postgre-tes.onrender.com/favorites', 
            {
              headers: {
                Authorization: `${token}`,
              }
            }).then(res => setCurrentFavorites(res.data)));
            console.log("Current Favorites: " ,currentFavorites);
        } catch (error) {
          console.error('Error removing favorite:', error);
        }
      }
      deleteFavorite();
    }
    
  }, [isHeartToggled]); 

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