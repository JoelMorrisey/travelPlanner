import React from 'react';

import { StyleSheet, Image, View } from 'react-native'
import AppScreen from 'components/AppScreen'
import AppButton from 'components/AppButton'
import AppStyles from 'config/AppStyles'
import CurrentAccount from 'database/CurrentAccount'

const currentAccount = CurrentAccount.instance;

const logo = require("assets/logo.png");

function SettingsScreen({ navigation }) {
    const logout = () => {
        currentAccount.logout();
        navigation.popToTop();
    };
    return (
        <AppScreen style={styles.mainContainer}>
            <Image source={logo} style={[AppStyles.logo, {marginTop: 20}]}/>
            {/* <AppText>Settings page</AppText> */}
            <AppButton
                title="Edit account settings"
                style={styles.settingsButton}
                onPress={()=> {
                    navigation.navigate("EditProfile")
                }}
            />
            <AppButton
                title="Log out"
                style={styles.button}
                textStyle={{color: "red"}}
                onPress={logout}
            />
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: "center",
        justifyContent: "space-between"
    },
    settingsButton: {
        width: "100%",
        borderRadius: 0,
        height: 50
    },
    button: {
        borderColor: "red"
    }
})

export default SettingsScreen;