import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';

const AuthStack = createStackNavigator({
  SignUp: SignUpPage,
  Login: LoginPage,
});

const AppStack = createBottomTabNavigator({
  Home: HomePage,
  UserProfile: UserProfilePage,
});

const RecipeAppNavigation = createAppContainer(
  createStackNavigator(
    {
      Auth: AuthStack,
      App: AppStack,
    },
    {
      initialRouteName: 'Auth', // You can change this based on your logic
      headerMode: 'none',
    }
  )
);

export default RecipeAppNavigation;