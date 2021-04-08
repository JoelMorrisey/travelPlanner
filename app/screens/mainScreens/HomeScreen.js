//React native
import React from 'react';
import { StyleSheet, FlatList } from 'react-native'

//Components
import AppCard from 'components/AppCard';
import AppScreen from 'components/AppScreen';
import AppText from 'components/AppText';

//Config
import AppStyles from 'config/AppStyles';

//Database
import PresetLocationData from 'database/PresetLocationData'

//Extract out data from database
const presetLocations = PresetLocationData.instance;

function HomeScreen({ navigation: { navigate } }) {
    //Navigate to show Activities
    const onLocationPressed = (item) => {
        navigate("Places", {
            context: "home",
            location: item
        });
    }

    return (
        <AppScreen style={styles.container}>
            <AppText style={[AppStyles.title, styles.title]}>Places to visit</AppText>
            <FlatList
                data={presetLocations.getAll()}
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
})

export default HomeScreen;