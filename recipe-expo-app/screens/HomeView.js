import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Button, ActivityIndicator} from 'react-native';
import Recipe from '../components/RecipeComponent';
import fetchSpoonData from '../api/SpoonacularGateway';


function HomeView({ navigation }) { 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [response, setResponse] = useState();

    useEffect(() => {
        //Fetch the API response, then funnel the result through a pipeline. First, parse the JSON, then store it to state
        const fetchRecipe = async () => {
            try {
                //const res = await fetch(url).then(response => response.json());
                const res = await fetchSpoonData('recipes/random',['number=5']);
                if (res && res.recipes) {
                    setResponse(res.recipes);
                } else {
                    console.log(`Error: No recipes in response from API`);
                }
            } catch (error) {
                console.log(`Error fetching data from API: ${error.message}`);
            }
            setIsLoading(false);
        };

        fetchRecipe();
    }, []);

    const getHomeRecipes = () => {
        if (isLoading) {
            return <ActivityIndicator size='large' />;
        }
        if (error) {
            return <Text>Oops! {error}</Text>;
        }

        return response.map(response => (
                <Recipe key={response.id} id={response.id} title={response.title} image={response.image} navigation={navigation}/>
            
        ));
    }

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {getHomeRecipes()}
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
    contentContainer: {
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
