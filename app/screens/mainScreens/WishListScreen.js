import React, { useState, useEffect } from 'react';

import { StyleSheet, FlatList } from 'react-native'

import AppCard from 'components/AppCard';
import AppScreen from 'components/AppScreen';
import AppStyles from 'config/AppStyles';
import AppText from 'components/AppText';
import AppThingsToDo from 'components/AppThingsToDo';
import UsersWishList from 'database/UsersWishList'
import CurrentAccount from 'database/CurrentAccount';

import { useFocusEffect } from '@react-navigation/native';

const WishList = UsersWishList.instance;
const activeAccount = CurrentAccount.instance;

function WishListScreen({}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [locationSelected, setLocationSelected] = useState(false);

    const [locations, setLocations] = useState([]);
    
    useFocusEffect(
        React.useCallback(() => {
            setLocations(WishList.getCounrties(activeAccount.getUserID()));
        }, [])
    );

    const onLocationPressed = (item) => {
        setModalVisible(true);
        setLocationSelected(item);
    }

    return (
        <AppScreen style={styles.container}>
            <AppText style={AppStyles.title}>Locations</AppText>
            {console.log(locations)}
            {locations.length === 0 && <AppText style={{marginLeft: 10, fontSize: 17}}>{"Look like you don't have anything in your wishlist.\nYou should go to home and start adding your dreams right aways!!!"}</AppText>}
            <FlatList
                data={locations}
                renderItem={({item}) => 
                    <AppCard 
                        image={item.image}
                        title={item.title}
                        style={styles.placeCard}
                        onPress={() => onLocationPressed(item)}
                    />
                }
                keyExtractor={item => item.id.toString()}
                style={{width:"100%"}}
            />
            <AppThingsToDo
                active={modalVisible}
                activeControl={setModalVisible}
                locationDatas={() => WishList.getActivities(activeAccount.getUserID(), locationSelected.id)}
                location={locationSelected}
                context="wishlist"
            />
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    placeCard: {
        alignSelf: "center",
        marginBottom: 30
    }
});

export default WishListScreen;