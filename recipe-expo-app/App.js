import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './navigation/MainStack';
import TabNavigator from './navigation/TabNavigator';

function App() {
  return (
    <NavigationContainer>
      {/* <MainStack /> */}
      <TabNavigator />
    </NavigationContainer>
  );
}

export default App;