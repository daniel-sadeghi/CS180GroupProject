import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import fetchSpoonGateway from '../api/SpoonacularGateway';
import Recipe from '../components/RecipeComponent';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

function SearchView({ navigation }) {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    let [error, setError] = useState();
    let [isLoading, setIsLoading] = useState(false);

    const handleSearchSubmit = async () => {
        if (!search) return;
        setIsLoading(true);
      
        try {
            const response = await fetchSpoonGateway('recipes/complexSearch',[`query=${search}`]);
            const allIds = response.results.map(recipe => recipe.id);
            const chunks = [];
            for (let i = 0; i < allIds.length; i += 5) {
              chunks.push(allIds.slice(i, i + 5));
            }

            // Make requests for each chunk
            const data = [];
            for (const chunk of chunks) {
              const chunkResponses = await Promise.all(
                chunk.map((item) =>
                  fetchSpoonGateway(`recipes/${item}/information`, ['includeNutrition=false'])
                )
              );
              data.push(...chunkResponses);
              await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second between requests
            }
            setResults(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching search suggestions:', error);
        }
    };

    const renderRecipes = () => {
        if (isLoading) {
            return <ActivityIndicator size="large" />;
        }
        if (error) {
            return <Text>{error}</Text>;
        }
        return results.map((recipe) => (
            <Recipe 
                key={recipe.id} 
                id={recipe.id} 
                title={recipe.title} 
                image={recipe.image} 
                navigation={navigation}
                sourceURL={recipe.sourceUrl} 
                spoonacularSourceURL={recipe.spoonacularSourceUrl}
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
                <Pressable 
                  onPress={handleSearchSubmit}
                  style = {({pressed}) => { return{ opacity: pressed ? 0.5 : 1}}}>
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
    marginTop:5,
    flex: 0.85,
    resizeMode: 'contain',
  },
});
