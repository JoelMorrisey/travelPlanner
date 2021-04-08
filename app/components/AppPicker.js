//React native
import React, { useState } from 'react';
import { Button, Modal, StyleSheet, FlatList, TouchableOpacity, View } from 'react-native'

//Third party
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

//Components
import AppText from 'components/AppText'

//Config
import AppStyles from 'config/AppStyles'

function AppPicker({title, selectionOptions, onSelect, buttonStyle, header}) {
    let [modalVisible, setModalVisible] = useState(false)
    return (
        <>
            <Modal
                animationType="slide"
                visible={modalVisible}
                style={{backgroundColor:"black"}}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <AppText style={[AppStyles.title, {alignSelf: "center", marginTop: 20}]}>{header}</AppText>
                <FlatList
                    data={selectionOptions}
                    renderItem={({ item }) => <Options title={item.name} onPress={() => {setModalVisible(false); onSelect(item)}}/>}
                    keyExtractor={item => item.id.toString()}
                />
                <Button title={"close"} onPress={() => setModalVisible(false)}/>
            </Modal>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.button, buttonStyle]}>
                <AppText style={styles.text}>{title}</AppText>
                <Icon
                    name="chevron-down"
                    size={20}
                    style={{paddingRight:5}}
                />
            </TouchableOpacity>
            {/* chevron-down */}
        </>         
    );
}

//Options to select for the picker format
function Options({onPress, title}) {
    return (
        <View style={{width: "100%", alignItems: "center"}}>
            <TouchableOpacity onPress={onPress} style={{borderWidth: 2, backgroundColor: "#EEEEEE", borderColor: "white", borderBottomColor: "black", width: "85%", alignItems: "center", justifyContent: "center", marginBottom: 10, height: 50}}>
                <AppText style={[styles.text]}>{title}</AppText>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        borderRadius: 0,
        width: "100%",
        height: 35,
        justifyContent: "space-between",
        alignItems: 'center',
        marginBottom: 30,
        borderWidth: 1,
        flexDirection: "row"
    },
    text:{
        fontSize: 16,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        paddingLeft: 15
    }
})

export default AppPicker;