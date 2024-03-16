import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, ActivityIndicator, ScrollView, FlatList, SafeAreaView, StyleSheet, Alert} from 'react-native';
import Ingredient from '../components/Ingredient';
import AddToCartButton from '../components/AddToCartButton';
import FavoriteButton from '../components/FavoriteButton';
import USDFormat from '../utils/USDFormat';
import fetchSpoonGateway from '../api/SpoonacularGateway';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavoriteStorage from '../api/FavoriteStorage';
import { useAuth } from '../contexts/AuthContext';


//Route is an object that contains the props passed when using react navigate.
const RecipeView = ({navigation, route}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [response, setResponse] = useState();
    const [error, setError] = useState();
    const [total, setTotal] = useState(0);
    let title = route.params.title;
    let id = route.params.id;
    let sourceURL = route.params.sourceURL;
    let spoonacularSourceURL = route.params.spoonacularSourceURL;
    let image = route.params.image;
    const [isFavorite, setisFavorite] = useState(false);
    const { token } = useAuth();

    useEffect(()=>{
        const fetchDetails = async () => {
            try {
                setIsLoading(true);
                const res = await fetchSpoonGateway(`recipes/${id}/priceBreakdownWidget.json`,['includeNutrition=false']);
                console.log("response before set:", res);
                setResponse(res);
                console.log("response set: " ,response)
                setTotal(res.ingredients.reduce((a,b) => a+b.price,0));
            } catch (error) {
                console.log(`Error fetching data from API: ${error.message}`);
                
            }
            finally {
                setIsLoading(false); // Make sure to set isLoading to false regardless of success or failure
            }
        };

        const favoriteStartCheck = async () => {
            try {
                const favoritesString = await AsyncStorage.getItem('favorites');
                console.log('Favorites from AsyncStorage:', favoritesString);
                if(favoritesString){
                    const favorites = JSON.parse(favoritesString);
                    setisFavorite(favorites.includes(id));
                }
            }
            catch (error) {
                console.error('Error fetching user favorites:', error);
            }
        };

        fetchDetails();
        favoriteStartCheck();
        
        navigation.setOptions({
            title: title === '' ? 'No title' : title,
            headerBackTitle: 'Back',
        });
    }, []);

    const handlePress = async () => {
        try {
            if (isFavorite) {
                await FavoriteStorage.removeFavorite(id, token);
            } else {
                console.log("Im adding a favorite");
                await FavoriteStorage.addFavorite(id, title, image, sourceURL, spoonacularSourceURL, token);
            }
            setisFavorite(!isFavorite);
        } catch (error) {
            // Display an alert if the operation failed
            console.error(error);
            Alert.alert('Error', isFavorite ? 'Trouble accessing account' : 'You need to log in');
        }
    };

    const getIngredients = () => {
        console.log("response: ", response);
        return (
            <View style={{flex:1}}>
                <View style={styles.flatList}>
                    <FlatList
                        data={response.ingredients}
                        renderItem={({item}) => <Ingredient name={item.name} price={item.price} image={"https://spoonacular.com/cdn/ingredients_100x100/"+item.image}/>}
                        keyExtractor={item=>item.name}
                    />
                </View>
                <View style={styles.total}>
                    <Text style={alignItems='left'}>Total Price: {USDFormat(total)} </Text>
                    <AddToCartButton style={styles.addToCartButton} ingredients={response.ingredients}>
                        <Text style={{color: "white", fontWeight: "bold", textAlign: "center"}}>Add To Cart</Text>
                    </AddToCartButton>
                    <FavoriteButton heartStartState={isFavorite} onPress={handlePress}/>
                </View>
            </View>
        );
    }

    const loadingIndicator = () => {
        if(!response){
        return (
            <View style={styles.loading}>
                <ActivityIndicator size='large' testID="loading-indicator"/>
            </View>
        );
        }
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
