import React from 'react';

import { View, StyleSheet, Image } from 'react-native'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import AppPressable from 'components/AppPressable';
import AppText from 'components/AppText';

function AppCard({image, title, style, onPress, natualElevation=5, pressedElevation=10, iconName, iconSize, hideIcon=false, hideImage=false}) {
    if (iconName && image) {
        throw new Error("Can't have both an icon and image");
    }
    return (
        <View style={[styles.container, style]}>
            <AppPressable onPress={onPress} style={styles.subContainers}>
                {!hideImage && (image) && <Image style={styles.image} source={image}/>}
                {!hideIcon && (iconName) && <Icon style={styles.icon} name={iconName} size={iconSize}/>}
                <AppText style={styles.text}>{title}</AppText>
            </AppPressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: "90%"
    },
    subContainers: {
        height: "100%",
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: 'center'
    },
    image: {
        flex: 1,
        width: "100%",
        height: "100%"
    },
    icon: {
        flex: 1,
        marginTop: 10,
    },
    text: {
        fontWeight: "bold",
        fontSize: 25
    }
})

export default AppCard;