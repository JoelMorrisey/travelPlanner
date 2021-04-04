import React, { useState } from 'react';

import { View, StyleSheet } from 'react-native'

import AddToList from 'components/AddToList';
import AppButton from 'components/AppButton';
import AppIconButton from 'components/AppIconButton';
import AppScreen from 'components/AppScreen'
import AppStyles from 'config/AppStyles';
import AppText from 'components/AppText';
import AppModalScreen from 'components/AppModalScreen';

function AppThingToDoInfo({active, activeControl, thingToDo, location, context}) {
    const [displatAddToListScreen, setDisplatAddToListScreen] = useState(false);
    const [prefillInfo, setPrefillInfo] = useState(false);

    return (
        <>
            {
                active
                &&
                <AppModalScreen
                    activeControl={activeControl}
                    active={active}
                >
                    {({backButton}) => 
                        <>
                            <AppScreen style={styles.container}>
                                <View style={[AppStyles.backButton, styles.backButtonContainer]}>
                                    <AppIconButton name="arrow-left" size={25} onPress={backButton}/>
                                </View>
                                <View style={styles.headerContainer}>
                                    <AppText style={[AppStyles.title, {marginBottom:5}]}>{thingToDo.title}</AppText>
                                    <AppText style={AppStyles.subTitle}>{thingToDo.tags[0]}</AppText>
                                </View>
                                <View style={styles.descriptionContainer}>
                                    <AppText style={AppStyles.title}>Details</AppText>
                                    <AppText>{thingToDo.description || "N/A"}</AppText>
                                </View>
                                {
                                    context == "wishlist"
                                    &&
                                    <View style={styles.notesContainer}>
                                        <AppText style={AppStyles.title}>Notes</AppText>
                                        <AppText>{thingToDo.notes || "N/A"}</AppText>
                                    </View>
                                }
                            </AppScreen>
                            {
                                context == "home"
                                &&
                                <>
                                    <View style={styles.buttonContainer}>
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
                                        location={location}
                                    />
                                </>
                            }
                            
                        </>
                    }
                </AppModalScreen>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    backButtonContainer: {
        alignSelf: "flex-start"
    },
    headerContainer: {
        height: 100,
        alignItems: "center"
    },
    descriptionContainer: {
        alignSelf: "flex-start",
        marginLeft: 10,
        marginBottom: 20
    },
    notesContainer: {
        alignSelf: "flex-start",
        marginLeft: 10,
        marginBottom: 20
    },
    buttonContainer: {
        alignSelf: "center"
    }
})

export default AppThingToDoInfo;