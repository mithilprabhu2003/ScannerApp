import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ScanScreen from './screens/ScanScreen';
import HistoryScreen from './screens/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
