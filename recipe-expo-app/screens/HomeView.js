import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Button, ActivityIndicator} from 'react-native';
import Recipe from '../components/RecipeComponent'

function HomeView({ navigation }) { 
    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState();
    let [response, setResponse] = useState();

    useEffect(() => {
        const URI = 'https://api.spoonacular.com/recipes/complexSearch';
        const API_KEY = "0e05e31e1192449ab972630943bc0865" //TODO Fetch the API Key from the backend server

        const url = URI + '?' 
            + `apiKey=${API_KEY}`;
        //Fetch the API response, then funnel the result through a pipeline. First, parse the JSON, then store it to state
        //
        //
        const fetchRecipe = async () => {
            try {
                const res = await fetch(url).then(response => response.json());
                console.log('Here is the response');
                console.log(res);
                console.log('Here are the results');
                console.log(res.results);
                setResponse(res.results);

            } catch (error) {
                console.log('Error!');
                
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
                <Recipe key={response.id} title={response.title} image={response.image}/>
            
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
