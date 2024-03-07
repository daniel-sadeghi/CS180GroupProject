import React, {useState, useEffect} from 'react';
import fetchSpoonGateway from '../api/SpoonacularGateway';
import Recipe from '../components/RecipeComponent';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, ActivityIndicator } from 'react-native';

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
