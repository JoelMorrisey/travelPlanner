import React from 'react';

import { TouchableOpacity, StyleSheet } from 'react-native';

import AppColor from "config/AppColor";
import AppText from "components/AppText";

function AppButton({title, onPress, style, textStyle, disabled=false}) {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[disabled ? styles.disabledButton:styles.button, style]}>
            <AppText style={[styles.text, textStyle]}>{title}</AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: AppColor.primary,
        borderRadius: 20,
        borderColor: AppColor.border,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        width: 200,
        height: 65,
        borderWidth: 1,
    },
    disabledButton:{
        backgroundColor: "grey",
        borderRadius: 20,
        borderColor: AppColor.border,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        width: 200,
        height: 65,
        borderWidth: 1,
    },
    text:{
        fontSize: 16,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
})

export default AppButton;
