import React from 'react';

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import AppThingsToDo from 'screens/placesScreens/AppThingsToDo'
import AppThingToDoInfo from 'screens/placesScreens/AppThingToDoInfo'

import MainNavigator from './MainNavigator'

//Pass props to MainNavigator so that it knows which tab to show
const HomeScreen = props => <MainNavigator initialRouteName="Home" {...props}/>;

//Set slide up effect for certain screens
const slideUpAnimation = {
    cardStyleInterpolator: ({ current, layouts }) => {
        return {
            cardStyle: {
                transform: [
                    {
                        translateY: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.height, 0],
                        }),
                    },
                ],
            },
        };
    },
};

function PlaceNavigator({ }) {
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
            <Stack.Screen name="Places" component={ AppThingsToDo } options={slideUpAnimation}/>
            <Stack.Screen name="ActivityInfo" component={ AppThingToDoInfo } options={slideUpAnimation}/>
        </Stack.Navigator>
    );
}

export default PlaceNavigator;