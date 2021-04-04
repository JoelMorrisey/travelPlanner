import React from 'react';

import { Formik } from 'formik';
import { View, StyleSheet, TextInput, Alert } from 'react-native'
import * as Yup from 'yup';

import AppText from 'components/AppText'
import AppButton from 'components/AppButton';
import AppModalScreen from 'components/AppModalScreen';
import AppIconButton from 'components/AppIconButton';
import AppScreen from 'components/AppScreen';
import AppStyles from 'config/AppStyles';
import PresetLocationData from 'database/PresetLocationData';
import Tags from 'database/Tags';

import CurrentAccount from 'database/CurrentAccount'
import UsersWishList from 'database/UsersWishList';
import AppPicker from 'components/AppPicker';

const PresetLocations = PresetLocationData.instance;
const tags = Tags.instance.getTags().concat({id: "never matach another id", name: "none"});

const AddingActivitySchema = Yup.object().shape({
    title: Yup.string().required("Activity name is required"),
    tags: Yup.string().oneOf(tags.map(tag => tag.name)),
    description: Yup.string(),
    notes: Yup.string()
});

function AddToList({active, activeControl, prefillInfo = {}, location}) {
    const handleSubmit = (values) => {
        values.tags = [values.tags]
        console.log(values)
        console.log(location)
        UsersWishList.instance.addItem(values, CurrentAccount.instance.getUserID(), location);
        Alert.alert("Activity has been added to your list")
        activeControl(false);
    }

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
                        <Formik
                            initialValues={{ title: prefillInfo.title, tags: prefillInfo.tags ? prefillInfo.tags[0] : "None", description: prefillInfo.description, notes: '' }}
                            onSubmit={handleSubmit}
                            validationSchema={AddingActivitySchema}
                        >
                            {
                                ({ handleChange, handleBlur, handleSubmit, errors, touched, values, isValid }) => 
                                    <View style={{marginTop: 20, width: "100%", alignItems:"center"}}>
                                        <AppText style={styles.inputHeader}>Name:</AppText>
                                        <TextInput
                                            onChangeText={handleChange('title')}
                                            onBlur={handleBlur('title')}
                                            value={values.title}
                                            style={styles.inputBox}
                                        />
                                        <AppText style={styles.inputHeader}>Category:</AppText>
                                        <AppText style={[AppStyles.subTitle, {paddingLeft: 21, marginBottom: 5, alignSelf: "flex-start"}]}>(Press to select another category)</AppText>
                                        <AppPicker
                                            title={values.tags}
                                            selectionOptions={tags}
                                            onSelect={(value => handleChange('tags')(value.name))}
                                            buttonStyle={{width: "85%"}}
                                            header="Pick a category"
                                        />
                                        <AppText style={styles.inputHeader}>Description:</AppText>
                                        <TextInput
                                            onChangeText={handleChange('description')}
                                            onBlur={handleBlur('description')}
                                            value={values.description}
                                            placeholder="description"
                                            style={[styles.inputBox, {textAlignVertical: "top"}]}
                                            multiline={true}
                                            numberOfLines={5}
                                        />
                                        <AppText style={styles.inputHeader}>Notes:</AppText>
                                        <TextInput
                                            onChangeText={handleChange('notes')}
                                            onBlur={handleBlur('notes')}
                                            value={values.notes}
                                            placeholder="notes"
                                            style={[styles.inputBox, {textAlignVertical: "top"}]}
                                            multiline={true}
                                            numberOfLines={5}
                                        />
                                        <AppButton
                                            title="Add item"
                                            disabled={!isValid}
                                            onPress={handleSubmit}
                                        />
                                    </View>
                            }
                        </Formik>
                    </AppScreen>
                }
            </AppModalScreen>
        }
        </>
    );
}

const styles = StyleSheet.create({
    inputHeader: {
        alignSelf: "flex-start",
        paddingLeft: 20,
        fontWeight: "bold",
        fontSize: 18
    },
    inputBox: {
        paddingLeft: 10,
        width: "85%",
        borderColor: "black",
        borderWidth:1,
        fontSize:15,
        marginVertical: 10
    }
})

export default AddToList;