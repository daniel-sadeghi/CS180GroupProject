import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CartView({ navigation }) {
    [cart, setCart] = useState([]); // [cart, setCart] = useState([{}]);
    [isLoading, setIsLoading] = useState(false); // [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const clearCart = async () => {
            try {
                await AsyncStorage.setItem('cart', JSON.stringify([]));
            } catch (error) {
                console.log(error);
            }
        };
        clearCart();
    }, []);
    useEffect(() => {
        const updateCart = async () => {        
            try {
                setIsLoading(true);
                const storedCart = await AsyncStorage.getItem('cart');
                if (storedCart !== null && JSON.stringify(storedCart) !== JSON.stringify(cart)) {
                    setCart(JSON.parse(storedCart));
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        updateCart();
    }, [cart]);

    const displayCart = () => {
        return (
            <View style={{flex:1}}>
                <View style={styles.flatList}>
                    <FlatList
                        data={cart}
                        renderItem={({item}) => <Ingredient name={item.name} price={item.price} image={"https://spoonacular.com/cdn/ingredients_100x100/"+item.image}/>}
                        keyExtractor={(item, index) => item.name + index}
                    />
                </View>
                <View style={styles.total}>
                    <Text style={alignItems='left'}>Total Price: InsertPrice</Text>
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
        <SafeAreaView>
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
