import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeView from '../screens/HomeView'; // Import your Home screen component
import ProfileView from '../screens/ProfileView.js';
import CartView from '../screens/CartView';
import SearchView from '../screens/SearchView'
import FavoritesView from '../screens/FavoritesView'
import MainStack from './MainStack.js';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconColor = focused ? 'green' : color; // Set icon color to green if focused, otherwise use the default color
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Favorites') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
            }
            return <Ionicons name={iconName} size={size} color={iconColor} />;
          },
      })}
    >
        <Tab.Screen name="Cart" component={CartView} />
        <Tab.Screen name="Home" children={(props)=><HomeView navigation={props.navigation}/>}/>
        <Tab.Screen name="Search" component={SearchView} />
        <Tab.Screen name="Favorites" component={FavoritesView} />
        <Tab.Screen name="Profile" component={ProfileView} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
