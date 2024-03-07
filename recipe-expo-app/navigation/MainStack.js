import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileView from '../screens/ProfileView';
import SignUpView from '../screens/SignUpView';
import LoginView from '../screens/LoginView';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Back">
      <Stack.Screen name="Back" component={ProfileView} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpView} />
      <Stack.Screen name="Login" component={LoginView} />
    </Stack.Navigator>
  );
};

export default MainStack;
