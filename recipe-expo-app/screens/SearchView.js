import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, ActivityIndicator,Image } from 'react-native';
import Recipe from '../components/RecipeComponent';
import {useNavigation} from '@react-navigation/native';

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
      return <ActivityIndicator size='large' />;
  }
  if (error) {
      return <Text>Oops! {error}</Text>;
  }

  return search.map(search => (
    <View>
      <Recipe key={search.id} title={search.title} image={search.image}/>
    </View>
  ));
}
  return (
        <ScrollView>
          <View style = {styles.assembler}>
            <View style = {styles.container}>
              <TextInput 
                style ={styles.input}
                placeholder='Search Recipes'
                onChangeText={text => {
                setSearch([]); // Clear the recipe info when input changes
                fetchSearch(text); // Fetch search suggestions
              }}
              >
              </TextInput>
            </View>
              <View style= {styles.button}>
                <Image 
                  source={require('../assets/search.png')}
                  style={styles.image}
                />
              </View>
          </View>
          <View style = {styles.containerRecipes}>
              {getSearchResults()}
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
    fontSize: 16
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
  },
  link: {
    color: 'blue',
    fontSize: 16,
    marginVertical: 10,
  },
  image:{
    flex: 0.85,
    resizeMode: 'contain',
  },
});
