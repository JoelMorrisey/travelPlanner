import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View} from 'react-native';

import AppText from "./AppText"

import AppColor from "../config/AppColor"

function AppButton({title, color="primaryColor", onPress, style, disabled=false}) {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[disabled ? styles.disabledButton:styles.button, style]}>
            <View>
                <AppText style={styles.text}>{title}</AppText>
            </View>
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
