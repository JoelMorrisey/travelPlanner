//React native
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'

//Components
import AppButton from 'components/AppButton';
import AppIconButton from 'components/AppIconButton';
import AppScreen from 'components/AppScreen'
import AppText from 'components/AppText';
import AddToList from 'components/AddToList';

//Config
import AppStyles from 'config/AppStyles';

function ActivityInfoScreen({ navigation: { goBack }, route: { params } }) {
    const {
        thingToDo,
        location = false,
        context = "home"
    } = params

    //Display add to wish list screen?
    const [displayAddToListScreen, setDisplayAddToListScreen] = useState(false);
    
    //Information to prefill into the add to list form
    const [prefillInfo, setPrefillInfo] = useState(false);

    return (
        <View style={{flex:1, width:"100%"}}>
            <AppScreen style={styles.container}>
                <View style={[AppStyles.backButton, styles.backButtonContainer]}>
                    <AppIconButton name="arrow-left" size={25} onPress={goBack}/>
                </View>
                <View style={styles.headerContainer}>
                    <AppText style={[AppStyles.title, {marginBottom:5}]}>{thingToDo.title}</AppText>
                    <AppText style={AppStyles.subTitle}>{thingToDo.tags[0]}</AppText>
                </View>
                <View style={styles.descriptionContainer}>
                    <AppText style={AppStyles.title}>Details</AppText>
                    <AppText>{thingToDo.description || "N/A"}</AppText>
                </View>
            
            {/* Change information depending on weather the context that made the user visit this page */}
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
                            setDisplayAddToListScreen(true);
                            setPrefillInfo(thingToDo)
                        }}
                    />
                    </View>
                    <AddToList
                        active={displayAddToListScreen}
                        activeControl={setDisplayAddToListScreen}
                        prefillInfo={prefillInfo}
                        location={location}
                    />
                </>
            }
        </View>
    )
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

export default ActivityInfoScreen;