import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, ActivityIndicator, Image } from 'react-native';
import Recipe from '../components/RecipeComponent';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

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
          setResults(response.results);
          const allIds = results.map(recipe => recipe.id);
          const promises = allIds.map((item) => {
            return axios.get(`https://api.spoonacular.com/recipes/${item}/information?includeNutrition=false&apiKey=${API_KEY}`);
          });
          const responses = await Promise.all(promises);
          const data = responses.map((response) => response.data);
          setResults(data);
        
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
    <Recipe key={recipe.id} id={recipe.id} title={recipe.title} image={recipe.image} navigation={navigation}
      sourceURL={recipe.sourceUrl} spoonacularSourceURL={recipe.spoonacularSourceUrl}
    />
  ));
};

  return (
        <ScrollView>
          <View style = {styles.assembler}>
            <View style = {styles.container}>
              <TextInput 
                style ={styles.input}
                placeholder='Search Recipes'
                onChangeText={(text) => {
                  setSearch(text); // Update search state when input changes
                }}
              >
              </TextInput>
            </View>
              <View style= {styles.button}>
                <Pressable onPress={handleSearchSubmit}>
                <Image 
                  source={require('../assets/search.png')}
                  style={styles.image}
                />
                </Pressable>
              </View>
          </View>
          <View style = {styles.containerRecipes}>
            {renderRecipes()}   
          </View>
        </ScrollView>
  );
}

export default SearchView;

const styles = StyleSheet.create({
  assembler:{
    flexDirection: 'row',
    marginTop: 10,
    justifyContent:'center',
  },
  container: {
    backgroundColor: '#ecf0f1',
    width:250,
    height:40,
    borderWidth:1,
    borderTopLeftRadius:40,
    borderBottomLeftRadius:40,
  },
  containerRecipes: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginLeft:10,
    marginTop:10,
    fontSize: 16,
    fontFamily: "Palatino",
  },
  button: {
    height:40,
    width:35,
    backgroundColor: '#ecf0f1',
    borderWidth:1,
    borderBottomRightRadius:10,
    borderTopRightRadius:10,
    textAlign: 'center',
    alignItems:'center',
    justifyContent:'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontFamily: "Palatino",
  },
  link: {
    color: 'blue',
    fontSize: 16,
    marginVertical: 10,
    fontFamily: "Palatino",
  },
  image:{
    flex: 0.85,
    resizeMode: 'contain',
  },
});
