import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileView from '../screens/ProfileView';
import HomeView from '../screens/HomeView';
import SignUpView from '../screens/SignUpView';
import LoginView from '../screens/LoginView';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeView} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpView} />
      <Stack.Screen name="Login" component={LoginView} />
    </Stack.Navigator>
  );
};

export default MainStack;
