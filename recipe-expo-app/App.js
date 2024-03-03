import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import MainStack from './navigation/MainStack';
import TabNavigator from './navigation/TabNavigator';
//Tapping on a recipe is probably going to need this StackNavigator to open a view that displays more information about the recipe
const App = () => {
    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    );
};

export default App;
