import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Button} from 'react-native';
import Recipe from '../components/RecipeComponent'

function HomeView({ navigation }) {
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Recipe
                    imageSource={require('../assets/ratatouille.jpg')}
                    bannerText="ratatouille"
                />

                <Recipe/>
                <Recipe/>
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
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
