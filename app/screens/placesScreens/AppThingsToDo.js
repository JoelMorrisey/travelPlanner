import React, { useState } from "react";

import { StyleSheet, Image, View, Dimensions, FlatList } from "react-native";

import AppCard from "components/AppCard";
import AppIconButton from "components/AppIconButton";
import AppSelectionButton from "components/AppSelectionButton";
import AppStyles from "config/AppStyles";
import AppText from "components/AppText";
import Constants from "expo-constants";

import Tags from "database/Tags";
import AddToList from "components/AddToList";

import CurrentAccount from 'database/CurrentAccount';
import ThingsToDoData from "database/ThingsToDoData";
import UsersWishList from "database/UsersWishList";
const activities = ThingsToDoData.instance;
const wishList = UsersWishList.instance;
const activeAccount = CurrentAccount.instance;

import { useFocusEffect } from "@react-navigation/native";

const bannerHeight = 150;

function AppThingsToDo({
    navigation: {
        goBack,
        navigate
    },
    route: {
        params: {
            location,
            hideFilters = false,
            context = "home",
        },
    }
}) {
    const [displatAddToListScreen, setDisplatAddToListScreen] = useState(false);

    //The list of things to do
    const [thingsToDo, setThingsToDo] = useState([]);

    //monitor scrolling variable
    const [scroll, setScroll] = useState(0);
    //controll filter view variables
    const [filtered, setFiltered] = useState(false);

    //Retrieve the list of things to do at a given location
    const getThingsToDo = () => {
        if (context === "home") {
            return activities
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
    const resetModalView = () => {
        setThingsToDo(getThingsToDo());
        setFiltered(false);
    };

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
        return filtered ? resetModalView() : goBack();
    };

    //Reset data beforem focused on screen
    useFocusEffect(
        React.useCallback(() => {
            resetModalView();
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
                    getFilters={() => Tags.instance.getTags()}
                    getData={() => getThingsToDo()}
                    setData={(items) => setThingsToDo(items)}
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
                data={thingsToDo}
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
                    resetModalView();
                    setDisplatAddToListScreen();
                }}
                location={location}
            />
        </View>
    );
}

function FilterList({
    getFilters,
    getData,
    setData,
    setFiltered,
    filtered,
    scroll,
}) {
    const scale = (num, in_min, in_max, out_min, out_max) => {
        return (
            ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
        );
    };
    const filterByTags = (tag) => {
        setData(getData().filter((thingToDo) => thingToDo.tags.includes(tag)));
    };
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
