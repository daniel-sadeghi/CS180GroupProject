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
  
// Modify fetchFavorites to return the response
async function fetchFavorites() {
  try {
    setIsLoading(true);
    const response = await axios.get('https://jwt-postgre-tes.onrender.com/favorites', {
      headers: {
        Authorization: `${token}`,
      },
    });
    setResponse(response);
    return response.data; // Return the data
  } catch (error) {
    console.error('Error fetching user favorites:', error);
    throw error;
  }
}

// Modify transformFavorites to accept the response as an argument
function transformFavorites(res) {

  const foodIds = [...res.map((item) => item.food_id)];

    return foodIds;
}

 // Modify createFavoriteCards to remove .then() and use await instead
async function createFavoriteCards(foodIds) {

  try {
    if (favFoodIds.length > 0) {
      const promises = favFoodIds.map((item) => {
        return axios.get(`https://api.spoonacular.com/recipes/${item}/information?includeNutrition=false&apiKey=${API_KEY}`);
      });

      const responses = await Promise.all(promises);
      const data = responses.map((response) => response.data);

      const filteredData = removeDuplicatesFromArray(data);

      setFavorites(filteredData);
    }
    setIsLoading(false);
  } catch (error) {
    console.error('Error fetching favorite recipes:', error);
    throw error;
  }
}

function removeDuplicatesFromArray(arr) {
  const uniqueIds = new Set();
  const uniqueArray = [];

  for (const obj of arr) {
    // Check if the ID is already in the Set
    if (!uniqueIds.has(obj.id)) {
      uniqueIds.add(obj.id); // Add the ID to the Set
      uniqueArray.push(obj); // Add the object to the uniqueArray
    }
  }

  return uniqueArray;
}

      useFocusEffect(
        React.useCallback(() => {
          const fetchData = async () => {
            try {
              if (token != null) {
                const response = await fetchFavorites();
                const foodIds = await transformFavorites(response);
                setFavFoodIds(foodIds); // Update favFoodIds state
              } else {
                console.log("Not Logged In");
              }
            } catch (error) {
              console.error('Error fetching and processing user favorites:', error);
            }
          };
          fetchData(); // Call the fetchData function
        }, [token])
      );

      useEffect(() => {
        // Trigger the update when favFoodIds changes
        createFavoriteCards(favFoodIds);
      }, [favFoodIds]);

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
                {isLoggedIn ? getFavoriteRecipes() : <Text>Please Log in</Text>}
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
