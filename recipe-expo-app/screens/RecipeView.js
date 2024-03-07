import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, ActivityIndicator, ScrollView, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import Ingredient from '../components/Ingredient';
import AddToCartButton from '../components/AddToCartButton';
import FavoriteButton from '../components/FavoriteButton';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

//Route is an object that contains the props passed when using react navigate.
const RecipeView = ({navigation, route}) => {
    //const [title, setTitle] = useState(route.params.title);
    //const [id, setKey] = useState(route.params.id);
    const [isLoading, setIsLoading] = useState(true);
    const [response, setResponse] = useState();
    const [error, setError] = useState();
    let title = route.params.title;
    let id = route.params.id;
    let image = route.params.image;
    let sourceURL = route.params.sourceURL;
    let spoonacularSourceURL = route.params.spoonacularSourceURL;
    const { isLoggedIn, login } = useAuth();
    const { token } = useAuth();
    const [favortieStartState, setFavoriteStartState] = useState(false);

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

        const favortieStartCheck = async () => {
            if(token != null){
                console.log("Attempting to pull favorites with token: ", token);
                
              try {
                const res = await axios.get('https://jwt-postgre-tes.onrender.com/favorites', {
                  headers: {
                    Authorization: `${token}`,
                  },
                });
                console.log('favorites data: ' , res.data);
    
                if (res.data && res.data.length > 0) {
                    const foodIds = res.data.map((item) => item.food_id);
                    const idExists = foodIds.includes(id);
                    setFavoriteStartState(idExists);
                }else{
                    setFavoriteStartState(false);
                  }
               } 
                catch (error) {
                console.error('Error fetching user favorites:', error);
              }
              }
              else{
                console.log("Not Logged in");
              }
        };

        fetchDetails().then(favortieStartCheck());
        
        navigation.setOptions({
            title: title === '' ? 'No title' : title,
            headerBackTitle: 'Back',
        });
    }, []);

    const getIngredients = () => {
        return (
            <View style={{flex:1}}>
                <View style={styles.flatList}>
                    <FlatList
                        data={response.ingredients}
                        renderItem={({item}) => <Ingredient name={item.name} price={item.price} image={"https://spoonacular.com/cdn/ingredients_100x100/"+item.image}/>}
                        keyExtractor={item=>item.id}
                    />
                </View>
                <View style={styles.total}>
                    <Text style={alignItems='left'}>Total Price: </Text>
                    <AddToCartButton style={styles.addToCartButton}>
                        <Text style={{color: "white", fontWeight: "bold", textAlign: "center"}}>Add To Cart</Text>
                    </AddToCartButton>
                    {isLoggedIn ? <FavoriteButton 
                    heartStartState={favortieStartState} id={id} title={title} imageURL={image} sourceURL={sourceURL} spoonacularSourceURL={spoonacularSourceURL} 
                    /> : null}
                </View>
            </View>
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
    total: {
        flex: 1,
        alignItems: 'center',
    },
    addToCartButton: {
        borderWidth: 1, 
        borderRadius: 30,
        padding: 10,
        backgroundColor: 'green',
    }
});

export default RecipeView;
