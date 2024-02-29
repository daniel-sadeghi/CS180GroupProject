import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import Recipe from '../components/RecipeComponent'
import {useNavigation} from '@react-navigation/native'

function SearchView({ navigation }) {
  return (
        <ScrollView>
            <TextInput 
             placeholder='Search Recipes'
            style={{borderWidth:1}}
            />
            <Text style= {styles.text}>Results </Text>
                
                <Recipe
                    imageSource={require('../assets/ratatouille.jpg')}
                    bannerText="ratatouille"  
                />
                <Recipe
                    imageSource={require('../assets/ratatouille.jpg')}
                    bannerText="ratatouille"  
                />
                <Recipe
                    imageSource={require('../assets/ratatouille.jpg')}
                    bannerText="ratatouille"  
                />
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
