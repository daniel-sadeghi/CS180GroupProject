import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Button, ActivityIndicator} from 'react-native';
import Recipe from '../components/RecipeComponent';
import { useAuth } from '../contexts/AuthContext';
import fetchSpoonGateway from '../api/SpoonacularGateway';


function HomeView({ navigation }) { 
    const { isLoggedIn, login } = useAuth();
    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState();
    let [response, setResponse] = useState();

    useEffect(() => {
        //Fetch the API response, then funnel the result through a pipeline. First, parse the JSON, then store it to state
        const fetchRecipe = async () => {
            try {
                //const res = await fetch(url).then(response => response.json());
                const res = await fetchSpoonGateway('recipes/random',['number=5']);
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

    const isLoadingView = () => {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    const getHomeRecipes = () => {
        return response.map(response => (
                <Recipe key={response.id} id={response.id} title={response.title} image={response.image} navigation={navigation}
                    sourceURL={response.sourceUrl} spoonacularSourceURL={response.spoonacularSourceUrl}
                />
        ));
    }

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {isLoading ? isLoadingView() : getHomeRecipes()}
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
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
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
});
