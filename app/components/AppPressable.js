//React native
import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native'

//Returns a pressable View that changes the elevation when pressed
function AppPressable({children, onPress, natualElevation=10, pressedElevation=5, style}) {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            {({pressed}) => (
                <View style={[{elevation: !pressed ? natualElevation:pressedElevation}, styles.container, style]}>
                    {children}
                </View>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    }
})

export default AppPressable;