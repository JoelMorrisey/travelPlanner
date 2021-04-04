import React from 'react';

import { Formik } from 'formik';
import { View, StyleSheet, TextInput } from 'react-native'
import * as Yup from 'yup';

import AppButton from 'components/AppButton';
import AppModalScreen from 'components/AppModalScreen';
import AppIconButton from 'components/AppIconButton';
import AppScreen from 'components/AppScreen';
import AppStyles from 'config/AppStyles';
import PresetLocationData from 'database/PresetLocationData';
import Tags from 'database/Tags';

import CurrentAccount from 'database/CurrentAccount'
import UsersWishList from 'database/UsersWishList'

const PresetLocations = PresetLocationData.instance;
const tags = Tags.instance.getTags();

const AddingActivitySchema = Yup.object().shape({
    title: Yup.string().required("Activity name is required"),
    tags: Yup.string().transform(value => !value ? null : value).oneOf(tags.map(tag => tag.name).concat("")),
    description: Yup.string(),
    notes: Yup.string()
});

function AddToList({active, activeControl, prefillInfo, location}) {
    const handleSubmit = (values) => {
        values.tags = [values.tags]
        console.log(values)
        console.log(location)
        UsersWishList.instance.addItem(values, CurrentAccount.instance.getUserID(), location)
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
                            initialValues={{ title: prefillInfo.title, tags: prefillInfo.tags[0], description: prefillInfo.description, notes: '' }}
                            onSubmit={handleSubmit}
                            validationSchema={AddingActivitySchema}
                        >
                            {
                                ({ handleChange, handleBlur, handleSubmit, errors, touched, values, isValid }) => 
                                    <View style={{marginTop: 20, width: "100%", alignItems:"center"}}>
                                        <TextInput
                                            onChangeText={handleChange('title')}
                                            onBlur={handleBlur('title')}
                                            value={values.title}
                                            style={{paddingLeft: 10, width: "85%", borderColor: "black", borderWidth:1, fontSize:15}}
                                        />
                                        <TextInput
                                            onChangeText={handleChange('tags')}
                                            onBlur={handleBlur('tags')}
                                            value={values.category}
                                            placeholder="category"
                                            autoCapitalize="none"
                                            style={{paddingLeft: 10, width: "85%", borderColor: "black", borderWidth:1, fontSize:15}}
                                        />
                                        <TextInput
                                            onChangeText={handleChange('description')}
                                            onBlur={handleBlur('description')}
                                            value={values.description}
                                            placeholder="description"
                                            style={{paddingLeft: 10, width: "85%", borderColor: "black", borderWidth:1, fontSize:15}}
                                        />
                                        <TextInput
                                            onChangeText={handleChange('notes')}
                                            onBlur={handleBlur('notes')}
                                            value={values.notes}
                                            placeholder="notes"
                                            style={{paddingLeft: 10, width: "85%", borderColor: "black", borderWidth:1, fontSize:15}}
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
    
})

export default AddToList;