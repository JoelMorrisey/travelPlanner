import React from 'react';

import { Text, StyleSheet, FlatList } from 'react-native'
import AppScreen from 'components/AppScreen';
import AppCard from 'components/AppCard';

function HomeScreen(props) {
    return (
        <AppScreen style={styles.container}>
            {/* <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            /> */}
            <AppCard image={require("assets/places/london.jpg")} title="London"/>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        paddingTop: 50
    }
})

export default HomeScreen;