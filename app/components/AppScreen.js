import React from 'react';

import { View, SafeAreaView, StyleSheet, ImageBackground } from 'react-native';

import Constants from 'expo-constants';

function AppScreen({children, style, backgroundImage, ...other}) {
    return (
        <SafeAreaView style={[styles.screen]}>
            <OptionalBackGroundImage backgroundImage={backgroundImage}>
                <View style={[styles.view, style]} {...other}>
                    {children}
                </View>
            </OptionalBackGroundImage>
        </SafeAreaView>
    );
}

function OptionalBackGroundImage({children, backgroundImage}) {
    return (
        <>
            {
                backgroundImage ?
                    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>{children}</ImageBackground>
                    :
                    children
            }
        </>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        marginTop: Constants.statusBarHeight,
    },
    view: {
        flex:1
    },
    backgroundImage: {
        flex: 1,
        width: "100%",
        height: "100%"
    }
})

export default AppScreen;