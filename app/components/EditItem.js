//React native
import React from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native'

//Third party
import { Formik } from 'formik';
import * as Yup from 'yup';

//Components
import AppButton from 'components/AppButton';
import AppIconButton from 'components/AppIconButton';
import AppModalScreen from 'components/AppModalScreen';
import AppPicker from 'components/AppPicker';
import AppScreen from 'components/AppScreen';
import AppText from 'components/AppText'

//Config
import AppColor from 'config/AppColor';
import AppStyles from 'config/AppStyles';

//Databases
import CurrentAccount from 'database/CurrentAccount'
import Tags from 'database/Tags';
import UsersWishList from 'database/UsersWishList';

//Extract out data from database
const tags = Tags.instance.getTags().concat({id: "never matach another id", name: "none"});
const userWishList = UsersWishList.instance;
const currentAccount = CurrentAccount.instance;

//Verification schema
const AddingActivitySchema = Yup.object().shape({
    title: Yup.string().required("Activity name is required"),
    tags: Yup.string().oneOf(tags.map(tag => tag.name)),
    description: Yup.string(),
    notes: Yup.string()
});

function EditItem({active, activeControl, id, prefillInfo = {}, location}) {
    //Edit information in users wishlist on submit
    const handleEdit = (id, values) => {
        values.tags = [values.tags];
        userWishList.editItem(id, values, currentAccount.getUserID(), location);
        Alert.alert("Item has been modified");
        activeControl(false);
    }

    const handleDelete = (id) => {
        const deleteItem = () => {
            userWishList.deleteItem(id, currentAccount.getUserID());
            Alert.alert("Item has been deleted");
            activeControl(false);
        }
        Alert.alert(
            `Delete \"${prefillInfo.title}\"?`,
            `This action can not be undone. Are you sure you want to delete \"${prefillInfo.title}\".`,
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: deleteItem,
                    style: "destructive"
                }
            ]
        );
    }

    {/* Only render if the active*/}
    if (!active) {
        return (<></>);
    }
    return (
        <AppModalScreen active={active} activeControl={activeControl}>
            {({ backButton }) => (
                <AppScreen style={{ alignItems: "center" }}>
                    <View style={[AppStyles.backButton, styles.backButton]}>
                        <AppIconButton name="arrow-left" size={25} onPress={backButton}/>
                    </View>
                    <AppText style={[AppStyles.title, styles.tilte]}>{`Edit activity for ${location.title} Wishlist`}</AppText>
                    <Formik
                        initialValues={{
                            title: prefillInfo.title,
                            tags: prefillInfo.tags ? prefillInfo.tags[0] : "none",
                            description: prefillInfo.description,
                            notes: prefillInfo.notes,
                        }}
                        onSubmit={values => handleEdit(id, values)}
                        validationSchema={AddingActivitySchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, errors, touched, values, isValid}) => (
                            <View style={styles.formContainer}>
                                {/* Get name of activity */}
                                <AppText style={styles.inputHeader}>Name:</AppText>
                                {errors.title && touched.title ? <AppText style={AppStyles.warningText}>{errors.title}</AppText> : null}
                                <TextInput
                                    onChangeText={handleChange("title")}
                                    onBlur={handleBlur("title")}
                                    value={values.title}
                                    style={styles.inputBox}
                                />
                                
                                {/* Get category */}
                                <AppText style={styles.inputHeader}>Category:</AppText>
                                {errors.tags && touched.tags ? <AppText style={AppStyles.warningText}>{errors.tags}</AppText> : null}
                                <AppText style={[AppStyles.subTitle, styles.inputSubHeader]}>(Press to select another category)</AppText>
                                <AppPicker
                                    title={values.tags}
                                    selectionOptions={tags}
                                    onSelect={(value) =>
                                        handleChange("tags")(value.name)
                                    }
                                    buttonStyle={{ width: "85%" }}
                                    header="Pick a category"
                                />

                                {/* Get description */}
                                <AppText style={styles.inputHeader}>Description:</AppText>
                                {errors.description && touched.description ? <AppText style={AppStyles.warningText}>{errors.description}</AppText> : null}
                                <TextInput
                                    onChangeText={handleChange("description")}
                                    onBlur={handleBlur("description")}
                                    value={values.description}
                                    placeholder="description"
                                    style={styles.inputBoxLarge}
                                    multiline={true}
                                    numberOfLines={5}
                                />
                                
                                {/* Get notes */}
                                <AppText style={styles.inputHeader}>Notes:</AppText>
                                {errors.notes && touched.notes ? <AppText style={AppStyles.warningText}>{errors.notes}</AppText> : null}
                                <TextInput
                                    onChangeText={handleChange("notes")}
                                    onBlur={handleBlur("notes")}
                                    value={values.notes}
                                    placeholder="notes"
                                    style={styles.inputBoxLarge}
                                    multiline={true}
                                    numberOfLines={5}
                                />

                                {/* Submit button */}
                                <View style={styles.buttonView}>
                                    <AppButton
                                        title="Delete"
                                        onPress={() => handleDelete(id)}
                                        style={[styles.buttons, styles.deleteButton]}
                                        textStyle={{color: AppColor.danger}}
                                    />
                                    <AppButton
                                        title="Edit item"
                                        disabled={!isValid}
                                        onPress={handleSubmit}
                                        style={styles.buttons}
                                    />
                                </View>
                            </View>
                        )}
                    </Formik>
                </AppScreen>
            )}
        </AppModalScreen>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 20,
        width: "100%",
        alignItems: "center",
    },
    tilte: {
        fontSize: 28,
        paddingBottom: 0,
        marginBottom: 0,
        textAlign: "center"
    },
    inputHeader: {
        alignSelf: "flex-start",
        paddingLeft: 20,
        fontWeight: "bold",
        fontSize: 18
    },
    inputSubHeader: {
        paddingLeft: 21,
        marginBottom: 5,
        alignSelf: "flex-start",
    },
    inputBox: {
        paddingLeft: 10,
        width: "85%",
        borderColor: "black",
        borderWidth:1,
        fontSize:15,
        marginVertical: 10
    },
    inputBoxLarge: {
        paddingLeft: 10,
        width: "85%",
        borderColor: "black",
        borderWidth:1,
        fontSize:15,
        marginVertical: 10,
        textAlignVertical: "top",
        height: 150
    },
    backButton: {
        alignSelf: "flex-start",
        marginLeft: 10
    },
    buttons: {
        width:"45%",
        marginTop: 15
    },
    deleteButton: {
        borderColor: AppColor.danger
    },
    buttonView: {
        flexDirection: "row",
        width: "90%",
        alignSelf: "center",
        justifyContent: "space-between"
    }
})

export default EditItem;