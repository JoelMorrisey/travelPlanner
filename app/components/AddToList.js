import React from 'react';

import { Modal, StyleSheet, TextInput } from 'react-native'

import AppButton from 'components/AppButton';
import AppScreen from 'components/AppScreen'
import AppStyles from 'config/AppStyles';
import AppText from 'components/AppText';
import PresetLocationData from 'database/PresetLocationData'

const PresetLocations = PresetLocationData.instance;

function AddToList({active, activeControl, prefillInfo, locationID}) {
    console.log(prefillInfo)
    return (
        <>
        {
            active
            &&
            <Modal
                animationType="slide"
                visible={active}
                onRequestClose={() => {
                    activeControl(false);
                }}
                statusBarTranslucent={true}
            >
                <AppScreen style={{alignItems: "center"}}>
                    <AppText style={AppStyles.title}>{PresetLocations.getAll().find(data => data.id == locationID).title}</AppText>
                    <AppText style={{alignSelf: "flex-start"}}>Thing to do name:</AppText>
                    <TextInput
                        style={{width: "85%", borderColor: "black", borderWidth:1}}
                        defaultValue={prefillInfo.title}
                    />
                    <AppText style={{alignSelf: "flex-start"}}>Category:</AppText>
                    <TextInput
                        style={{width: "85%", borderColor: "black", borderWidth:1}}
                        defaultValue={prefillInfo.tags[0]}
                    />
                    <AppText style={{alignSelf: "flex-start"}}>notes:</AppText>
                    <TextInput
                        style={{width: "85%", borderColor: "black", borderWidth:1}}
                    />
                    <AppButton
                        title="Add item"
                        onPress={() => console.log("totally gonna add an item (Still under construction)")}
                    />
                </AppScreen>
            </Modal>
        }
        </>
    );
}

const styles = StyleSheet.create({
    
})

export default AddToList;