import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Button, useState, TouchableOpacity} from 'react-native';
import Recipe from '../components/RecipeComponent'


function HomeView({ navigation }) {
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style= {styles.text}>Welcome to the recipe app </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style= {styles.button}>Register</Text>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style= {styles.button}>Log in</Text>
                 </TouchableOpacity>
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
        </SafeAreaView>
    );
}

export default HomeView;

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
