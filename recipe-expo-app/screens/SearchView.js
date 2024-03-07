import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Recipe from '../components/RecipeComponent'
import {useNavigation} from '@react-navigation/native'
import fetchSpoonData from '../api/SpoonacularGateway';

function SearchView({ navigation }) {
  const [search, setSearch] = useState([]);
  let [error, setError] = useState();
  let [isLoading, setIsLoading] = useState(true);

  async function fetchSearch(query) {
    try {
        const response = await fetchSpoonData('complexSearch',[`query=${query}`]);
        setSearch(response.results); // Update the suggestions state
    } catch (error) {
        console.error('Error fetching search suggestions:', error);
    }
    setIsLoading(false);
}

const getSearchResults = () => {
  if (isLoading) {
      return <ActivityIndicator size='large' />;
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
