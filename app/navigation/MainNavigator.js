import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

import HomeScreen from 'screens/mainScreens/HomeScreen'
import SettingsNavigator from './SettingsNavigator'
import WishListScreen from 'screens/mainScreens/WishListScreen'

function MainNavigator({}) {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions= {{
                activeTintColor: "black",
                inactiveTintColor: "#AAAAAA"
            }}
            screenOptions= {({route}) => ({
                headerShown:false,
                tabBarIcon: ({focused}) => {
                    switch(route.name) {
                        case "Home":
                            return <Icon name="home" size={39} style={{color: focused ? "black":"#AAAAAA"}}/>
                        case "Wish list":
                            return <Icon name="star" size={35} style={{color: focused ? "black":"#AAAAAA"}}/>
                        case "Settings":
                            return <Icon name="cog" size={35} style={{color: focused ? "black":"#AAAAAA"}}/>
                        default:
                            <></>
                    }
                }
            })}
        >
            <Tab.Screen name="Wish list" component={ WishListScreen }/>
            <Tab.Screen name="Home" component={ HomeScreen }/>
            <Tab.Screen name="Settings" component={ SettingsNavigator }/>
        </Tab.Navigator>
    );
}

export default MainNavigator;