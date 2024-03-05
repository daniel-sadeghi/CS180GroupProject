import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, ScrollView, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import Ingredient from '../components/Ingredient';

//Route is an object that contains the props passed when using react navigate.
const RecipeView = ({navigation, route}) => {
    //const [title, setTitle] = useState(route.params.title);
    //const [id, setKey] = useState(route.params.id);
    const [isLoading, setIsLoading] = useState(true);
    const [response, setResponse] = useState();
    const [error, setError] = useState();
    let title = route.params.title;
    let id = route.params.id;

    useEffect(()=>{
        const URI = `https://api.spoonacular.com/recipes/${id}/priceBreakdownWidget.json`;
        const API_KEY = "0e05e31e1192449ab972630943bc0865";
        const options = `apiKey=${API_KEY}&includeNutrition=false`;
        const url = `${URI}?${options}`

        const fetchDetails = async () => {
            try {
                console.log(`Fetching from ${URI}`);
                const res = await fetch(url).then(response => response.json());
                setResponse(res);

            } catch (error) {
                console.log(`Error: No response from ${URI}`);
                
            }
            console.log(`Success: Fetched response from ${URI}`);
            setIsLoading(false);
        };

        fetchDetails();
        
        navigation.setOptions({
            title: title === '' ? 'No title' : title,
            headerBackTitle: 'Back',
        });
    }, []);

    const getIngredients = () => {
        return (
                <FlatList
                    data={response.ingredients}
                    renderItem={({item}) => <Ingredient name={item.name} price={item.price} image={"https://spoonacular.com/cdn/ingredients_100x100/"+item.image}/>}
                    keyExtractor={item=>item.id}
                    style={styles.flatList}
                />

        );
    }

    const loadingIndicator = () => {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            {isLoading ? loadingIndicator() : getIngredients()}
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatList: {
        flex: 3,
    },
    addToCart: {
        flex: 1,
    },
});

export default RecipeView;
