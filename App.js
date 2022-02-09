import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from './screens/Auth';
import List from './screens/List';

import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Auth'
      >
        <Stack.Screen options={{ headerShown: false }} name="Authenticate - Wish List" component={Auth} />
        <Stack.Screen options={{ headerShown: false }} name="Wish List" component={List} />
      </Stack.Navigator>
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}