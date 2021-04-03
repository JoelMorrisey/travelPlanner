import React from 'react';

import { View, StyleSheet, Image } from 'react-native'
import AppText from './AppText';

function AppCard({image, title, style}) {
    return (
        <View style={[styles.container, style]}>
            <Image style={styles.image} source={image}/>
            <AppText style={styles.text}>{title}</AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: "90%",
        backgroundColor: "white",
        borderRadius: 20,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: 'center',
        elevation: 10
    },
    image: {
        flex: 1,
        width: "100%",
        height: "100%"
    },
    text: {
        fontWeight: "bold",
        fontSize: 25
    }
})

export default AppCard;