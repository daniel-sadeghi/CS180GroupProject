import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeView from '../screens/HomeView'; // Import your Home screen component
import ProfileView from '../screens/ProfileView.js';
import CartView from '../screens/CartView';
import SearchView from '../screens/SearchView'
import FavoritesView from '../screens/FavoritesView'
import MainStack from './MainStack.js';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Cart" component={CartView} />
        <Tab.Screen name="Home" component={MainStack} />
        <Tab.Screen name="Search" component={SearchView} />
        <Tab.Screen name="Favorites" component={FavoritesView} />
        <Tab.Screen name="Profile" component={ProfileView} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
