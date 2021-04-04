import React from 'react';

import { View, StyleSheet, TextInput } from 'react-native'

import AppButton from 'components/AppButton';
import AppModalScreen from 'components/AppModalScreen';
import AppIconButton from 'components/AppIconButton'
import AppScreen from 'components/AppScreen'
import AppStyles from 'config/AppStyles';
import AppText from 'components/AppText';
import PresetLocationData from 'database/PresetLocationData'

const PresetLocations = PresetLocationData.instance;

function AddToList({active, activeControl, prefillInfo, locationID}) {
    return (
        <>
        {
            active
            &&
            <AppModalScreen
                active={active}
                activeControl={activeControl}
            >
                {({backButton}) =>
                    <AppScreen style={{alignItems: "center"}}>
                        <View style={AppStyles.backButton, {alignSelf: "flex-start", marginLeft: 10}}>
                            <AppIconButton name="arrow-left" size={25} onPress={backButton}/>
                        </View>
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
                }
            </AppModalScreen>
        }
        </>
    );
}

const styles = StyleSheet.create({
    
})

export default AddToList;