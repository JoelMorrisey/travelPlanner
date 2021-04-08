//React native
import React from 'react';
import { StyleSheet, Image } from 'react-native'

//Components
import AppButton from 'components/AppButton'
import AppScreen from 'components/AppScreen'

//Config
import AppStyles from 'config/AppStyles'

//Database
import CurrentAccount from 'database/CurrentAccount'

//Extract out data from database
const currentAccount = CurrentAccount.instance;

//Assets
const logo = require("assets/logo.png");

function SettingsScreen({ navigation }) {
    //Log the user out and force them back to the welcome screen
    const logout = () => {
        currentAccount.logout();
        navigation.popToTop();
    };

    return (
        <AppScreen style={styles.mainContainer}>
            <Image source={logo} style={[AppStyles.logo, styles.logo]}/>
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
    logo: {
        marginTop: 20
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