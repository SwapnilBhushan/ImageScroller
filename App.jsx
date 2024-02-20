import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ImageScreen from './src/ImageScreen';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/StackNavigator/StackNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
