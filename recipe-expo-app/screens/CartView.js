import React from 'react';
import {  View, Text, StyleSheet, ScrollView, SafeAreaView, Button, TouchableOpacity, } from 'react-native';
import CartItemClickable from '../components/CartItemComponentClickable';

function CartView({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style= {styles.text}> Cart Total: $100 </Text>
            <ScrollView>
                <CartItemClickable
                    imageSource={require('../assets/ratatouille.jpg')}
                    bannerText="ratatouille"
                    ingredientsText="ingredients listed"  
                />
            </ScrollView>
        </SafeAreaView>
  );
}

export default CartView;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#90EE90',
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
  },
  link: {
    color: 'blue',
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    color: 'blue',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

