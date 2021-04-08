//React native
import React, { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native'

//Third party
import { useFocusEffect } from '@react-navigation/native';

//Components
import AppCard from 'components/AppCard';
import AppScreen from 'components/AppScreen';
import AppText from 'components/AppText';

//Config
import AppStyles from 'config/AppStyles';

//Database
import CurrentAccount from 'database/CurrentAccount';
import UsersWishList from 'database/UsersWishList'

//Extract out data from database
const WishList = UsersWishList.instance;
const activeAccount = CurrentAccount.instance;

function WishListScreen({ navigation: { navigate } }) {
    //Get hold all locations
    const [locations, setLocations] = useState([]);

    //Navigate to location info on location press
    const onLocationPressed = (item) => {
        navigate("Places", {
            context: "wishlist",
            location: item
        });
    }

    //On focus set load the avaliable locations
    useFocusEffect(
        React.useCallback(() => {
            setLocations(WishList.getCounrties(activeAccount.getUserID()));
        }, [])
    );

    return (
        <AppScreen style={styles.container}>
            <AppText style={[AppStyles.title, styles.title]}>WishList</AppText>
            {/* If no locations show custom message */}
            {
                locations.length === 0
                &&
                <AppText style={{marginLeft: 10, fontSize: 17}}>{"Look like you don't have anything in your wishlist.\nYou should go to home and start adding your dreams right aways!!!"}</AppText>
            }
            {/* Show list of place which have an activity in them */}
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
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    title: {
        marginLeft: 20,
        marginTop: 10
    },
    placeCard: {
        alignSelf: "center",
        marginBottom: 30
    }
});

export default WishListScreen;