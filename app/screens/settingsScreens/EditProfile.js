//React native
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native'

//Third party
import { Formik } from 'formik';
import * as Yup from 'yup';

//Components
import AppButton from 'components/AppButton'
import AppIconButton from 'components/AppIconButton'
import AppScreen from 'components/AppScreen'
import AppText from 'components/AppText'

//Config
import AppStyles from 'config/AppStyles'

//Database
import Accounts from 'database/Accounts'
import CurrentAccount from 'database/CurrentAccount'

//Extract out data from database
const currentAccount = CurrentAccount.instance;
const accounts = Accounts.instance;

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email'),
    password: Yup.string().min(8).max(32),
});

function EditProfile({ navigation: { navigate } }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [feildToChange, setFeildToChange] = useState("")

    const handlePress = (context) => {
        setFeildToChange(context);
        setModalVisible(true);
    }

    const handleSubmit = (values) => {
        if (values.email) {
            accounts.setEmail(currentAccount.getUserID(), values.email)
        }
        if (values.password) {
            accounts.setPassword(currentAccount.getUserID(), values.password)
        }
        if (values.email || values.password) {
            Alert.alert(`${feildToChange} has been changed`)
            setModalVisible(false);
        }
    }

    return (
        <AppScreen style={styles.container}>
            <AppIconButton name="arrow-left" size={25} style={[AppStyles.backButton, styles.backButton]} onPress={() => navigate("Home")}/>
            <AppText style={[AppStyles.title, styles.header]}>Edit account</AppText>
            <View style={styles.feildContainer}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => handlePress("email")}>
                    <AppText style={[AppStyles.title, styles.feildHeader]}>Email:</AppText>
                    <AppText style={styles.infoText}>{currentAccount.getUserEmail()}</AppText>
                </TouchableOpacity>
            </View>
            <View style={styles.feildContainer}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => handlePress("password")}>
                    <AppText style={[AppStyles.title, styles.feildHeader]}>Password:</AppText>
                    <AppText style={styles.infoText}>********</AppText>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <AppIconButton name="arrow-left" size={25} style={[AppStyles.backButton, styles.backButton]} onPress={() => setModalVisible(false)}/>
                <AppText style={[AppStyles.title, {marginTop: 10, marginLeft: 30}]}>Change {feildToChange}</AppText>
                <Formik
                        initialValues={{ email: currentAccount.getUserEmail(), password: '' }}
                        onSubmit={handleSubmit}
                        validationSchema={LoginSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, errors, touched, values, isValid }) => (
                                <View style={{marginTop: 40, alignItems: "center"}}>
                                    { 
                                        feildToChange === "email"
                                        &&
                                        <>
                                            {errors.email && touched.email ? <AppText style={styles.warningText}>{errors.email}</AppText> : null}
                                            <TextInput
                                                onChangeText={handleChange('email')}
                                                onBlur={handleBlur('email')}
                                                value={values.email}
                                                placeholder="Email"
                                                style={styles.inputFeilds}
                                                autoCapitalize="none"
                                            />
                                        </>
                                    }
                                    {
                                        feildToChange === "password"
                                        &&
                                        <>
                                            {errors.password && touched.password ? <AppText style={styles.warningText}>{errors.password}</AppText> : null}
                                            <TextInput
                                                onChangeText={handleChange('password')}
                                                onBlur={handleBlur('password')}
                                                value={values.password}
                                                placeholder="Password"
                                                style={styles.inputFeilds}
                                                secureTextEntry={true}
                                                autoCapitalize="none"
                                            />
                                        </>
                                    }
                                    <AppButton disabled={!isValid} onPress={handleSubmit} title="Save" style={{marginTop: 20}}/>
                                </View>
                        )}
                    </Formik>
            </Modal>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    header: {
        marginTop: 20,
        marginBottom: 100
    },
    feildContainer: {
        width: "100%",
        paddingLeft: 20,
        borderBottomWidth: 1
    },
    feildHeader: {
        fontSize: 23,
        marginBottom: 10,
        marginTop: 30
    },
    infoText: {
        fontSize: 18,
        alignSelf: "flex-start",
        marginLeft: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    backButton: {
        marginTop: 10,
        alignSelf: "flex-start"
    },
    inputFeilds: {
        backgroundColor:"white",
        fontSize:20,
        padding: 10,
        marginBottom: 10,
        width: 300,
        borderWidth: 1
    },
    warningText: {
        backgroundColor: "white",
        borderRadius: 20,
        borderColor: "black",
        padding: 10,
        textAlign: "center",
        fontSize: 15,
        borderWidth: 1,
        color: "red"
    }
})

export default EditProfile;