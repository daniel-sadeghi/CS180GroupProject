import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import Recipe from '../components/RecipeComponent';
import { useFavoriteContext } from '../contexts/FavoriteContext';
import { useFocusEffect } from '@react-navigation/native';

function FavoritesView({ navigation }) {
  const { isLoggedIn, login } = useAuth();
  const { token } = useAuth();
  const [favFoodIds, setFavFoodIds] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const API_KEY = "0e05e31e1192449ab972630943bc0865";
  let [isLoading, setIsLoading] = useState(true);
  let [response, setResponse] = useState();
  const { currentFavorites } = useFavoriteContext();
  
  async function fetchFavorites() {
  // Get Favorites
    try {
      await axios.get('https://jwt-postgre-tes.onrender.com/favorites', {
        headers: {
          Authorization: `${token}`,
        },
      }).then(res => setResponse(res.data));
     } 
      catch (error) {
      console.error('Error fetching user favorites:', error);
    }
  }

  function transformFavorites() {
      console.log("response in transform: ", response);
      //if response isnt null
      if (response && response.length > 0) {
        const foodIds = response.map((item) => item.food_id);
        setFavFoodIds(foodIds);
      }
      // else if the favorites context is updated use it
      else if(currentFavorites && currentFavorites.length > 0){
        const foodIds = currentFavorites.map((item) => item.food_id);
        setFavFoodIds(foodIds);
      }
      else{
        setFavFoodIds([]);
      }
    console.log("favorite food ids before creating cards: " , favFoodIds);
    }
  async function createFavoriteCards() {
    // Get each recipe card in favorites
    console.log("favorite food ids when creating cards: " , favFoodIds);
     try {
        if(favFoodIds.length > 0){
        const promises = favFoodIds.map((item) => {
          return axios.get(`https://api.spoonacular.com/recipes/${item}/information?includeNutrition=false&apiKey=${API_KEY}`);
        });
        console.log("Promises map:" , promises);
        Promise.all(promises)
        .then((responses) => {
        const data = responses.map((response) => response.data);
        const filteredData = removeDuplicatesFromArray(data);
        setFavorites(filteredData);
       }) 
        }

        console.log("Favorites: " , favorites);
        setIsLoading(false);
        }
        catch (error) {
        console.error('Error fetching favorite recipes:', error);
        }
      }

      function removeDuplicatesFromArray(arr) {
        const uniqueObjects = [];
        const seenKeys = new Set();
      
        for (const obj of arr) {
          // Convert the object to a string representation
          const objString = JSON.stringify(obj);
      
          if (!seenKeys.has(objString)) {
            seenKeys.add(objString);
            uniqueObjects.push(obj);
          }
        }
      }

      useFocusEffect(
        React.useCallback(() => {
          if(token != null){
          fetchFavorites().then(transformFavorites()).then(createFavoriteCards());
            }
          else{
          console.log("Not Logged In");
          }
        }, [isLoggedIn, currentFavorites])
      );

    const getFavoriteRecipes = () => {
      if (isLoading) {
          return <ActivityIndicator size='large' />;
      }

      return favorites.map(favorites => (
              <Recipe key={favorites.id} id={favorites.id} title={favorites.title} image={favorites.image} navigation={navigation}
                  sourceURL={favorites.sourceUrl} spoonacularSourceURL={favorites.spoonacularSourceUrl}
              />
          
      ));
  }

  return (
    <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {getFavoriteRecipes()}
            </ScrollView>
        </SafeAreaView>
  );
}

export default FavoritesView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
    contentContainer: {
    },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  link: {
    color: 'blue',
    fontSize: 16,
    marginVertical: 10,
  },
});
