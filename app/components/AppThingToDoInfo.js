import React, { useState } from 'react';

import { View, StyleSheet, Modal } from 'react-native'
import AppText from 'components/AppText';
import AppScreen from 'components/AppScreen'
import AppStyles from '../config/AppStyles';
import AppButton from './AppButton';
import AddToList from './AddToList';

function AppThingToDoInfo({active, activeControl, thingToDo, location}) {
    const [displatAddToListScreen, setDisplatAddToListScreen] = useState(false);
    const [prefillInfo, setPrefillInfo] = useState(false);

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
                    <AppScreen style={styles.container}>
                        <View style={{height: 125, alignItems: "center"}}>
                            <AppText style={[AppStyles.title, {marginBottom:5}]}>{thingToDo.title}</AppText>
                            <AppText style={AppStyles.subTitle}>{thingToDo.tags[0]}</AppText>
                        </View>
                        <View style={{alignSelf: "flex-start", marginLeft: 10}}>
                            <AppText style={AppStyles.title}>Details</AppText>
                            <AppText>{thingToDo.description}</AppText>
                        </View>
                    </AppScreen>
                    <View style={{alignSelf: "center"}}>
                            <AppButton
                                title="Add to list"
                                onPress={() => {
                                    setDisplatAddToListScreen(true);
                                    setPrefillInfo(thingToDo)
                                }}
                            />
                    </View>
                    <AddToList
                        active={displatAddToListScreen}
                        activeControl={setDisplatAddToListScreen}
                        prefillInfo={prefillInfo}
                        locationID={location.id}
                    />
                </Modal>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    }
})

export default AppThingToDoInfo;