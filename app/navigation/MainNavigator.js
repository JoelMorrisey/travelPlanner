import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import HomeScreen from 'screens/mainScreens/HomeScreen'

function MainNavigator({}) {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions= {{
                headerShown:false
            }}
        >
            <Tab.Screen name="Home" component={ HomeScreen }/>
        </Tab.Navigator>
    );
}

export default MainNavigator;