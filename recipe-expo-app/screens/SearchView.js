import React from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/native'

function SearchView({ navigation }) {
  return (
        <ScrollView>
            <TextInput 
             placeholder='Search Recipes'
            style={{borderWidth:1}}
            />

        </ScrollView>
  );
}

export default SearchView;
