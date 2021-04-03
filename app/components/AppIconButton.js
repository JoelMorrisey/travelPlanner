import React from 'react';

import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import { View, StyleSheet, TouchableOpacity } from 'react-native'

function AppIconButton({name, size=20, style, onPress}) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
            <View style={[styles.container, {width: size, borderRadius: size/2}, style]}>
                <Icon name={name} size={size}/>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
    }
})

export default AppIconButton;