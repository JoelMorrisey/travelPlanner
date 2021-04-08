//React native
import React, { useState } from "react";
import { StyleSheet, Image, View, Dimensions, FlatList } from "react-native";

//Expo
import Constants from "expo-constants";

//Third party
import { useFocusEffect } from "@react-navigation/native";

//Components
import AppCard from "components/AppCard";
import AppIconButton from "components/AppIconButton";
import AppSelectionButton from "components/AppSelectionButton";
import AppText from "components/AppText";
import AddToList from "components/AddToList";

//Config
import AppStyles from "config/AppStyles";

//Database
import CurrentAccount from 'database/CurrentAccount';
import Tags from "database/Tags";
import ThingsToDoData from "database/ThingsToDoData";
import UsersWishList from "database/UsersWishList";

//Extract out data from database
const activeAccount = CurrentAccount.instance;
const activitiesStore = ThingsToDoData.instance;
const tags = Tags.instance;
const wishList = UsersWishList.instance;

//Height of the image banner
const bannerHeight = 150;


function AppThingsToDo({navigation, route: { params } }) {
    //Extract out all paramaters
    const {
        goBack,
        navigate
    } = navigation;
    const {
        location,
        hideFilters = false,
        context = "home",
    } = params;

    //Display add to wish list screen?
    const [displatAddToListScreen, setDisplatAddToListScreen] = useState(false);

    //The list of avalibale activities
    const [activities, setActivities] = useState([]);

    //Scroll level
    const [scroll, setScroll] = useState(0);
    //Controll filter view variables
    const [filtered, setFiltered] = useState(false);

    //Retrieve the list of things to do at a given location
    const getThingsToDo = () => {
        //Depending on context get different activities
        if (context === "home") {
            return activitiesStore
                .getThingsToDo()
                .filter((activity) => activity.location_id == location.id);
        } else if (context === "wishlist") {
            return wishList.getActivities(
                activeAccount.getUserID(),
                location.id
            );
        }
        console.error("Should not be here - line 53 AppThingsToDo.js");
        return [];
    };

    //Reset the view back to as if the person just pressed the location
    const resetView = () => {
        setActivities(getThingsToDo());
        setFiltered(false);
    };

    //Navigate to show activity info screen when a location is selected
    const handleActivitySelection = (activity) => {
        navigate("ActivityInfo", {
            location: location,
            context: context,
            thingToDo: activity
        });
    };

    //Handle the things to do list scrolling to adjust view
    const handleActivityScroll = (event) => {
        let scroll = event.nativeEvent.contentOffset.y;
        setScroll(scroll);
    };

    //Set the back button functionality depending on weather the user has filtered the list or not
    const backButton = () => {
        return filtered ? resetView() : goBack();
    };

    //Reset data beforem focused on screen
    useFocusEffect(
        React.useCallback(() => {
            resetView();
        }, [])
    );

    return (
        <View style={styles.container}>
            {/* Display image of the location */}
            <Image source={location.image} style={styles.image} />
            {/* Header view to display over the banner image */}
            <View style={styles.headerView}>
                {/* The back button */}
                <AppIconButton
                    name="arrow-left"
                    size={25}
                    style={AppStyles.backButton}
                    onPress={() => backButton()}
                />
            </View>
            <View style={styles.headerView}>
                {/* The add button */}
                <AppIconButton
                    name="plus"
                    size={25}
                    style={[AppStyles.addButton]}
                    onPress={() => setDisplatAddToListScreen(true)}
                />
            </View>
            {/* The location name header */}
            <AppText style={AppStyles.title}>{location.title}</AppText>

            {/* Display the filter list (or hide if filter has been selected) */}
            {!hideFilters && (
                <FilterList
                    getFilters={() => tags.getTags()}
                    getData={() => getThingsToDo()}
                    setData={(items) => setActivities(items)}
                    scroll={scroll}
                    filtered={filtered}
                    setFiltered={(value) => setFiltered(value)}
                />
            )}

            {/* Header for the things to do list */}
            <AppText style={[AppStyles.title, { marginTop: 10 }]}>
                Things to do:
            </AppText>

            {/* A list of things that can be done in a given country */}
            <FlatList
                data={activities}
                renderItem={({ item: thingToDo }) => (
                    <View
                        style={{
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <AppSelectionButton
                            onPress={() => handleActivitySelection(thingToDo)}
                            title={thingToDo.title}
                        />
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                style={{ width: "100%" }}
                onScroll={handleActivityScroll}
            />
            {/* Add item from country screen */}
            <AddToList
                active={displatAddToListScreen}
                activeControl={() => {
                    resetView();
                    setDisplatAddToListScreen();
                }}
                location={location}
            />
        </View>
    );
}

//Component to display filter list
function FilterList({getFilters, getData, setData, setFiltered, filtered, scroll}) {
    //Compute scale of list
    const scale = (num, in_min, in_max, out_min, out_max) => {
        return (
            ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
        );
    };

    //Get all filter tags
    const filterByTags = (tag) => {
        setData(getData().filter((thingToDo) => thingToDo.tags.includes(tag)));
    };

    //Compute filter list display
    const filterListScale = Math.max(1, Math.min(scale(scroll, 100, 200, 1, 2), 2));
    const hideIcon = scroll >= 100;

    return (
        <>
            {!filtered && (
                <View style={{ height: 110 / filterListScale }}>
                    <FlatList
                        data={getFilters()}
                        horizontal={true}
                        renderItem={({ item: filter }) => (
                            <AppCard
                                title={filter.name}
                                iconName={filter.icon}
                                iconSize={50}
                                style={{
                                    height: 90 / filterListScale,
                                    width: 200,
                                    marginLeft: 10,
                                }}
                                onPress={() => {
                                    filterByTags(filter.name);
                                    setFiltered(true);
                                }}
                                hideIcon={hideIcon}
                            />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%"
    },
    image: {
        width: "100%",
        height: bannerHeight,
    },
    headerView: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom:
            Dimensions.get("window").height -
            bannerHeight +
            Constants.statusBarHeight,
        left: 0,
        marginTop: Constants.statusBarHeight,
    },
});

export default AppThingsToDo;
