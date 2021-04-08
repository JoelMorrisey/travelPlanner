//React native
import React from 'react';
import { Text, StyleSheet } from 'react-native'

function AppText({children, style, ...other}) {
    return (
        <Text style={[styles.text, style]} {...other}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16
    }
})

export default AppText;