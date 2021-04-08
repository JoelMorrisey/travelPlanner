//React native
import React from 'react';

//Third party
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

//Screens
import HomeScreen from 'screens/mainScreens/HomeScreen'
import SettingsNavigator from './SettingsNavigator'
import WishListScreen from 'screens/mainScreens/WishListScreen'


function MainNavigator({ initialRouteName="Home" }) {
    return (
        <Tab.Navigator
            //Set initial screen as this component's initial screen can change (look at PlaceNavigator.js)
            initialRouteName={initialRouteName}
            //Set the active and inActive colors of tabs
            tabBarOptions= {{
                activeTintColor: "black",
                inactiveTintColor: "#AAAAAA"
            }}
            //Set options for all routes
            screenOptions= {({route}) => ({
                //Don't show header
                headerShown:false,
                //Set the icon based on the tab
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