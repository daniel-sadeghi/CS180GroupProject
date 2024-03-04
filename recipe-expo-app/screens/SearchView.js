import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, ActivityIndicator } from 'react-native';
import Recipe from '../components/RecipeComponent'
import {useNavigation} from '@react-navigation/native'

function SearchView({ navigation }) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  let [error, setError] = useState();
  const API_KEY = '0e05e31e1192449ab972630943bc0865'; 
  let [isLoading, setIsLoading] = useState(false);

  async function fetchSearch(query) {
    setIsLoading(true); // Set isLoading to true while fetching
    try {
        const response = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}`
        ).then(response => response.json());
        console.log("Here are the search responses");
        console.log(response.results);
        setResults(response.results); // Update the suggestions state
    } catch (error) {
        console.error('Error fetching search suggestions:', error);
    }
    finally {
      setIsLoading(false); // Set isLoading back to false
    }
}

const handleSearchSubmit = () => {
  fetchSearch(search); // Call fetchSearch when the button is pressed
};

const renderRecipes = () => {
  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }
  if (error) {
    return <Text>Oops! {error}</Text>;
  }
  return results.map((recipe) => (
    <Recipe key={recipe.id} title={recipe.title} image={recipe.image} />
  ));
};


  return (
        <ScrollView>
            <TextInput
        placeholder="Search Recipes"
        style={{ borderWidth: 1 }}
        onChangeText={(text) => {
          setSearch(text); // Update search state when input changes
        }}
      />
      <Button title="Submit" onPress={handleSearchSubmit} color="#3498db" />
      {renderRecipes()}   
        </ScrollView>
  );
}

export default SearchView;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#90EE90',
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
  button: {
    color: 'blue',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
