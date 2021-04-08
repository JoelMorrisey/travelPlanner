//React native
import React from 'react';
import { View, StyleSheet, Image } from 'react-native'

//Components
import AppButton from "components/AppButton";
import AppScreen from 'components/AppScreen';
import AppText from 'components/AppText';

//Config
import AppColor from "config/AppColor";
import AppStyles from "config/AppStyles";

//Assets
const background = require("assets/mountain-background.jpg");
const logo = require("assets/logo.png");

function HomeScreen({ navigation }) {
    return (
        <AppScreen style={styles.container} backgroundImage={background}>
                <View style={styles.iconAndWelcomContainer}>
                    <Image source={logo} style={AppStyles.logo}/>
                    <AppText style={styles.text}>{"Please login or sign-up\n to continue"}</AppText>
                </View>
                <View style={styles.buttonContainer}>
                    <AppButton
                        title="Login"
                        onPress={() => navigation.navigate("Login")}
                    />
                    <AppButton
                        title="Sign-up"
                        onPress={() => navigation.navigate("Sign-up")}
                    />
                </View>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconAndWelcomContainer:{
        alignItems: 'center',
    },
    buttonContainer:{
        alignItems: 'center',
        marginBottom: 140,
    },
    logo: {
        width: 130,
        height: 130,
        marginTop: 50,
        marginBottom: 60
    },
    text: {
        backgroundColor: AppColor.primary,
        borderRadius: 20,
        borderColor: AppColor.border,
        padding: 15,
        textAlign: "center",
        fontSize: 20,
        borderWidth: 1
    }
})

export default HomeScreen;