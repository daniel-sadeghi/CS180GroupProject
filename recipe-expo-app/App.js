import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import MainStack from './navigation/MainStack';
import TabNavigator from './navigation/TabNavigator';
import { AuthProvider } from './contexts/AuthContext'
//Tapping on a recipe is probably going to need this StackNavigator to open a view that displays more information about the recipe
const App = () => {
    return (
        <AuthProvider>
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
        </AuthProvider>
    );
};

export default App;
