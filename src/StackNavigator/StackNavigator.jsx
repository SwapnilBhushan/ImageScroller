import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ImageScreen from '../ImageScreen';
import ImageForm from '../ImageForm';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Image"
        component={ImageScreen}
        options={{headerTitle: 'Home'}}
      />
      <Stack.Screen
        name="ImageForm"
        component={ImageForm}
        options={{headerTitle: 'Submit Form Data'}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
