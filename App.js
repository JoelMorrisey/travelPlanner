//React native
import React from 'react';

//Third party
import StackNavigator from './app/navigation/AuthNavigator';
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  );
}