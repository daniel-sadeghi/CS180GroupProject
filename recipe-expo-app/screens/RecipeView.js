import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, ActivityIndicator, ScrollView, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import Ingredient from '../components/Ingredient';
import AddToCartButton from '../components/AddToCartButton';
import FavoriteButton from '../components/FavoriteButton';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import USDFormat from '../utils/USDFormat';
import fetchSpoonGateway from '../api/SpoonacularGateway';
//Route is an object that contains the props passed when using react navigate.
const RecipeView = ({navigation, route}) => {
    //const [title, setTitle] = useState(route.params.title);
    //const [id, setKey] = useState(route.params.id);
    const [isLoading, setIsLoading] = useState(true);
    const [response, setResponse] = useState();
    const [error, setError] = useState();
    const [total, setTotal] = useState(0);
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

        const fetchDetails = async () => {
            try {
                console.log(`Fetching from ${URI}`);
                const res = await fetchSpoonGateway(`recipes/${id}/priceBreakdownWidget.json`,['includeNutrition=false']);
                setResponse(res);
                setTotal(res.ingredients.reduce((a,b) => a+b.price,0));
            } catch (error) {
                console.log(`Error fetching data from API: ${error.message}`);
                
            }
            setIsLoading(false);
        };

        const favortieStartCheck = async () => {
            if(token != null){
                
              try {
                const res = await axios.get('https://jwt-postgre-tes.onrender.com/favorites', {
                  headers: {
                    Authorization: `${token}`,
                  },
                });
    
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
                        keyExtractor={item=>item.name}
                    />
                </View>
                <View style={styles.total}>
                    <Text style={alignItems='left'}>Total Price: {USDFormat(total)} </Text>
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
