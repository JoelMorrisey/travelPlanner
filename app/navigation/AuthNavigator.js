import React from 'react';

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import HomeScreen from "screens/authScreens/HomeScreen"
import LoginScreen from "screens/authScreens/LoginScreen"
import RegisterScreen from "screens/authScreens/RegisterScreen"
import MainNavigator from "./MainNavigator"

function AuthNavigator({}) {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions= {{
                headerShown:false
            }}
        >
            <Stack.Screen name="Home" component={ HomeScreen }/>
            <Stack.Screen name="Login" component={ LoginScreen }/>
            <Stack.Screen name="Sign-up" component={ RegisterScreen }/>
            <Stack.Screen name="HomeUser" component={ MainNavigator }/>
        </Stack.Navigator>
    );
}

export default AuthNavigator;