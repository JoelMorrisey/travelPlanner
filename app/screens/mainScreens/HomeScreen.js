import React, { useState } from 'react';

import { StyleSheet, FlatList } from 'react-native'

import AppCard from 'components/AppCard';
import AppScreen from 'components/AppScreen';
import AppStyles from 'config/AppStyles';
import AppText from 'components/AppText';
import AppThingsToDo from '../placesScreens/AppThingsToDo';
import PresetLocationData from 'database/PresetLocationData'
import ThingsToDoData from 'database/ThingsToDoData';

const presetLocations = PresetLocationData.instance;
const ThingsToDo = ThingsToDoData.instance;

function HomeScreen({ navigation: { navigate } }) {
    const onLocationPressed = (item) => {
        navigate("Places", {
            context: "home",
            location: item
        });
    }
    return (
        <AppScreen style={styles.container}>
            <AppText style={AppStyles.title}>Locations</AppText>
            <FlatList
                data={presetLocations.getAll()}
                renderItem={({item}) => 
                    <AppCard 
                        image={item.image}
                        title={item.title}
                        style={styles.placeCard}
                        onPress={() => onLocationPressed(item)}
                    />
                }
                keyExtractor={item => item.id.toString()}
                style={{width:"100%"}}
            />
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    placeCard: {
        alignSelf: "center",
        marginBottom: 30
    }
})

export default HomeScreen;