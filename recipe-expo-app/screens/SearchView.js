import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Recipe from '../components/RecipeComponent'
import {useNavigation} from '@react-navigation/native'

function SearchView({ navigation }) {
  const [search, setSearch] = useState([]);
  let [error, setError] = useState();
  const API_KEY = '0e05e31e1192449ab972630943bc0865'; 
  let [isLoading, setIsLoading] = useState(true);

  async function fetchSearch(query) {
    try {
        const response = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}`
        ).then(response => response.json());
        console.log("Here are the search responses");
        console.log(response);
        setSearch(response.results); // Update the suggestions state
    } catch (error) {
        console.error('Error fetching search suggestions:', error);
    }
    setIsLoading(false);
}

const getSearchResults = () => {
  if (isLoading) {
      return (
        <View style={styles.loading}>
            <ActivityIndicator size='large' />
        </View>
      );
  }
  if (error) {
      return <Text>Oops! {error}</Text>;
  }

  return search.map(search => (
          <Recipe key={search.id} title={search.title} image={search.image}/>
      
  ));
}


  return (
        <ScrollView>
            <TextInput
              placeholder="Search Recipes"
              style={{ borderWidth: 1 }}
              onChangeText={text => {
                setSearch([]); // Clear the recipe info when input changes
                fetchSearch(text); // Fetch search suggestions
              }}
            />
            {getSearchResults()}     
                
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
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
