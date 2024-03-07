import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const addFavorite = async (id, title, imageURL, sourceURL, spoonacularSourceURL, loginToken) => {
    console.log('Starting addFavorite');
    
    if (!loginToken) {
        console.log('No login token');
        throw new Error('No login token');
    }

    try {
        // Get the current favorites from AsyncStorage
        console.log('Accessing AsyncStorage');
        const favoritesString = await AsyncStorage.getItem('favorites');
        let favoritesArray = [];

        // Parse the favorites string into an array if it exists
        if (favoritesString) {
            favoritesArray = JSON.parse(favoritesString);
        }

        if (favoritesArray.includes(id)) {
            console.log('Favorite already exists');
            throw new Error('Favorite already exists');
        }

        // Add the new id to the favorites array
        favoritesArray.push(id);
        console.log('Added favorite:', id, title, imageURL, sourceURL, spoonacularSourceURL, favoritesArray);

        // Save the updated favorites to AsyncStorage
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));

        // Make a POST request to the server
        const response = await axios.post('https://jwt-postgre-tes.onrender.com/favorites', {
            food_id: id,
            title: title,
            imageURL: imageURL,
            sourceURL: sourceURL,
            spoonacularSourceURL: spoonacularSourceURL,
            }, {
                headers: {
                Authorization: `${loginToken}`,
                },
        });
    } catch (error) {
        throw error;
    }
};

const removeFavorite = async (id, loginToken) => {
    

    if (!loginToken) {
        console.error('No login token');
        return;
    }

    try {
        // Get the current favorites from AsyncStorage
        const favoritesString = await AsyncStorage.getItem('favorites');
        let favoritesArray = [];

        // Parse the favorites string into an array if it exists
        if (favoritesString) {
            favoritesArray = JSON.parse(favoritesString);
        }

        // Remove the id from the favorites array
        const index = favoritesArray.indexOf(id);
        if (index > -1) {
            favoritesArray.splice(index, 1);
        }

        // Save the updated favorites to AsyncStorage
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));

        // Make a DELETE request to the server
        const response = await axios.delete(`https://jwt-postgre-tes.onrender.com/favorites/${id}`, {
            headers: {
                Authorization: `${loginToken}`,
            },
        });
    } catch (error) {
        console.error('Error removing favorite:', error);
    }
};

export default {addFavorite, removeFavorite};