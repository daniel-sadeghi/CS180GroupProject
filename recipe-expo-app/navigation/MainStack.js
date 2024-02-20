import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileView from '../screens/ProfileView';
import HomeView from '../screens/HomeView';
import SignUpView from '../screens/SignUpView';
import LoginView from '../screens/LoginView';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeView} />
      <Stack.Screen name="SignUp" component={SignUpView} />
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="UserProfile" component={ProfileView} />
    </Stack.Navigator>
  );
};

export default MainStack;
