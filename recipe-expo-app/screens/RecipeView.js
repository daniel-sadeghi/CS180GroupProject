import React from 'react';
import {Text} from 'react-native';
const RecipeView = () => {
    const API_KEY = "0e05e31e1192449ab972630943bc0865"; 
    const url = `https://api.spoonacular.com/recipes/${key}/ingredientWidget.json?apiKey=${API_KEY}`
    return (
        <Text>RecipeView!</Text>
    );

}

export default RecipeView;
