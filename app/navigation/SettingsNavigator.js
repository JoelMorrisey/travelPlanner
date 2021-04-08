import React from 'react';

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import SettingsScreen from "screens/mainScreens/SettingsScreen"
import EditProfile from "screens/settingsScreens/EditProfile"

function SettingsNavigator({}) {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            //set options for all routes
            screenOptions= {{
                headerShown:false
            }}
        >
            <Stack.Screen name="Home" component={ SettingsScreen }/>
            <Stack.Screen name="EditProfile" component={ EditProfile }/>
        </Stack.Navigator>
    );
}

export default SettingsNavigator;