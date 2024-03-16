import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, SafeAreaView, Button, Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Ingredient from '../components/Ingredient';
import USDFormat from '../utils/USDFormat';

function CartView({ navigation }) {
    [cart, setCart] = useState([]); // [cart, setCart] = useState([{}]);
    [isLoading, setIsLoading] = useState(true); // [isLoading, setIsLoading] = useState(true);
    [totalPrice, setTotalPrice] = useState(0);

    const clearCart = async () => {
        try {
            await AsyncStorage.setItem('cart', JSON.stringify([]));
            setCart([]); // Also clear the cart in the state
        } catch (error) {
            console.log(error);
        }
    };

    async function getCart() {
        try {
            setIsLoading(true);
            const storedCart = await AsyncStorage.getItem('cart');
            console.log("storedCart", storedCart);

            // Parse the storedCart only if it exists
            const parsedCart = storedCart ? JSON.parse(storedCart) : null;

            console.log("parsedCart" , parsedCart);

            return parsedCart;

        } catch (error) {
            console.log(error);
        }
      }

      const shareCart = async () => {
        const cartItems = cart.map(item => `${item.name}: ${item.price}`).join('\n');
        try {
            await Share.share({
                message: cartItems,
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            const updateCart = async () => {        
                try {
                    const response = await getCart();
                    console.log("response ", response);
                    if(response.length > 0){
                        setCart(response); 
                        }
                    const sumPrices = cart.reduce((total, item) => total + (item.price /100), 0);
                    const roundedTotalPrice = sumPrices.toFixed(2);
                    setTotalPrice(roundedTotalPrice);
                } catch (error) {
                    console.log(error);
                }
                setIsLoading(false);
            };
            updateCart();
        }, [])
    );

    useEffect(() => {
        // Trigger the update when cart changes
        displayCart(cart);
      }, [cart]);

    const displayCart = () => {
        return (
            <View style={{flex:1}}>
                <View style={styles.flatList}>
                    <FlatList
                        data={cart}
                        renderItem={({item}) => <Ingredient name={item.name} price={item.price} image={'https://spoonacular.com/cdn/ingredients_100x100/' +item.image}/>}
                        keyExtractor={(item, index) => item.name + index}
                    />
                </View>
                <Button title="Share Cart" onPress={shareCart} />
                <View style={styles.total}>
                    <Text style={alignItems='left'}>Total Price: ${totalPrice}</Text>
                    <Button title="Clear Cart" onPress={clearCart} style={{paddingBottom: 20}}/>
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
        <SafeAreaView style={{flex: 1}}>
            {isLoading ? loadingIndicator() : displayCart()}
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
    total: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CartView;
