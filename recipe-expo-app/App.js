import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RecipeView from './screens/RecipeView';
//import MainStack from './navigation/MainStack';
import TabNavigator from './navigation/TabNavigator';
//Tapping on a recipe is probably going to need this StackNavigator to open a view that displays more information about the recipe
const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="MainView" component={TabNavigator} />
                <Stack.Screen name="RecipeView" component={RecipeView}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
