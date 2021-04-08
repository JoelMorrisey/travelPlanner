//React native
import React from 'react';

//Third party
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

//Screens
import HomeScreen from "screens/authScreens/HomeScreen"
import LoginScreen from "screens/authScreens/LoginScreen"
import RegisterScreen from "screens/authScreens/RegisterScreen"
import PlaceNavigator from "./PlaceNavigator"

function AuthNavigator({}) {
    return (
        <Stack.Navigator
            //Set inital route to home
            initialRouteName="Home"
            //set options for all routes
            screenOptions= {{
                headerShown:false
            }}
        >
            <Stack.Screen name="Home" component={ HomeScreen }/>
            <Stack.Screen name="Login" component={ LoginScreen }/>
            <Stack.Screen name="Sign-up" component={ RegisterScreen }/>
            <Stack.Screen name="HomeUser" component={ PlaceNavigator }/>
        </Stack.Navigator>
    );
}

export default AuthNavigator;