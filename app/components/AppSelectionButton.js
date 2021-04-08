//React native
import React from 'react';
import { StyleSheet } from 'react-native';

//Components
import AppPressable from 'components/AppPressable';
import AppText from "components/AppText"

function AppSelectionButton({onPress, title, style}) {
    return (
        <AppPressable onPress={onPress} style={{...styles.subContainer, ...style}}>
            <AppText style={styles.text}>{title}</AppText>
        </AppPressable>
    );
}

const styles = StyleSheet.create({
    subContainer: {
        width: "85%", 
        height:50, 
        backgroundColor: "#7FB28F", 
        justifyContent: "center", 
        alignItems: "center", 
        marginVertical: 15, 
        borderRadius: 20,
        alignSelf: "center"
    },
    text: {
        fontWeight: "bold", 
        fontSize: 23
    }
})

export default AppSelectionButton;