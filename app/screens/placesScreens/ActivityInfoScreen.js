//React native
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'

//Third party
import { useFocusEffect } from '@react-navigation/native';

//Components
import AppButton from 'components/AppButton';
import AppIconButton from 'components/AppIconButton';
import AppScreen from 'components/AppScreen'
import AppText from 'components/AppText';
import AddToList from 'components/AddToList';
import EditItem from 'components/EditItem';

//Config
import AppStyles from 'config/AppStyles';

//Database
import UsersWishList from 'database/UsersWishList'
import ThingsToDoData from 'database/ThingsToDoData';

//Extract out data from database
const WishList = UsersWishList.instance;
const activityList = ThingsToDoData.instance;

function ActivityInfoScreen({ navigation: { goBack }, route: { params } }) {
    const {
        activityID,
        location = false,
        context = "home"
    } = params

    //Activity
    const [activity, setActivity] = useState(false)

    //Display add to wish list screen?
    const [displayAddToListScreen, setDisplayAddToListScreen] = useState(false);

    //Display add to wish list screen?
    const [displayEditItemScreen, setDisplayEditItemScreen] = useState(false);
    
    //Information to prefill into the add to list form
    const [prefillInfo, setPrefillInfo] = useState(false);

    //Get new information
    const update = () => {
        let activityInfo = undefined;
        if (context === "home") {
            activityInfo = activityList.getByID(activityID);
        } else if (context === "wishlist") {
            activityInfo = WishList.getActivityByID(activityID);
        }
        setActivity(activityInfo)
        if (!activityInfo) {
            goBack();
        }
    }

    //On focus set load the information
    useFocusEffect(
        React.useCallback(() => {
            update();
        }, [])
    );

    //Wait for information to appear
    if (!activity) {
        return (<AppScreen><AppText>Loading...</AppText></AppScreen>);
    }
    return (
        <View style={{flex:1, width:"100%"}}>
            <AppScreen style={styles.container}>
                <View style={[AppStyles.backButton, styles.backButtonContainer]}>
                    <AppIconButton name="arrow-left" size={25} onPress={goBack}/>
                    {
                        context == "wishlist"
                        &&
                        <AppIconButton name="pencil-outline" size={25} style={[AppStyles.addButton]} onPress={() => setDisplayEditItemScreen(true)}/>
                    }
                </View>
                <View style={styles.headerContainer}>
                    <AppText style={[AppStyles.title, {marginBottom:5}]}>{activity.title}</AppText>
                    <AppText style={AppStyles.subTitle}>{activity.tags[0]}</AppText>
                </View>
                <View style={styles.descriptionContainer}>
                    <AppText style={AppStyles.title}>Details</AppText>
                    <AppText>{activity.description || "N/A"}</AppText>
                </View>
            
            {/* Change information depending on weather the context that made the user visit this page */}
                {
                    context == "wishlist"
                    &&
                    <View style={styles.notesContainer}>
                        <AppText style={AppStyles.title}>Notes</AppText>
                        <AppText>{activity.notes || "N/A"}</AppText>
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
                            setPrefillInfo(activity)
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
            {
                context == "wishlist"
                &&
                <EditItem
                    active={displayEditItemScreen}
                    activeControl={(active) => {update(); setDisplayEditItemScreen(active);}}
                    prefillInfo={activity}
                    id={activity.id}
                    location={location}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    backButtonContainer: {
        alignSelf: "flex-start",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingRight: 10
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