import './ignoreWarnings';
import React from 'react';
import Home from './screens/Home';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Detail from './screens/Detail';
import Navbar from './components/Navbar';
import MainNavigation from './components/MainNavigation';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <MainNavigation/>
    </NavigationContainer>
  );
};

export default App;
