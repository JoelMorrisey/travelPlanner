//React native
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native'

//Third party
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

function AppIconButton({name, size=20, style, onPress}) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={[{width: size}, style]}>
            <View style={[styles.container, {width: size, borderRadius: size/2}]}>
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