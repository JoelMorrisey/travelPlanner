import React, { useState } from 'react';

import { Text, StyleSheet, FlatList, Modal } from 'react-native'
import AppScreen from 'components/AppScreen';
import AppCard from 'components/AppCard';
import PresetLocationData from 'database/PresetLocationData'
import AppText from 'components/AppText';

import AppThingsToDo from 'components/AppThingsToDo';

import ThingsToDoData from 'database/ThingsToDoData';
import AppStyles from '../../config/AppStyles';

const ThingsToDo = ThingsToDoData.instance;
const presetLocations = PresetLocationData.instance;

function HomeScreen({ navigation: { navigate } }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [locationSelected, setLocationSelected] = useState(false);

    const onLocationPressed = (item) => {
        setModalVisible(true);
        setLocationSelected(item);
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
            <AppThingsToDo
                active={modalVisible}
                activeControl={setModalVisible}
                locationDatas={ThingsToDo}
                location={locationSelected}
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