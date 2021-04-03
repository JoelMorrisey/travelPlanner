import React from 'react';

import * as Yup from 'yup';
import { View, Text, StatusBar, StyleSheet, Button, Image, TextInput } from 'react-native'
import AppScreen from '../../components/AppScreen';
import AppText from '../../components/AppText';
import AppButton from "../../components/AppButton"
import AppColor from "../../config/AppColor"
import { Formik } from 'formik';
import KeyboardAvoidingView from '../../components/KeyboardAvoidingView';
import Accounts from '../../../database/Accounts';

const logo = require("../../../assets/logo.png");
const background = require("../../../assets/mountain-background.jpg");

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(8).max(32),
    password2: Yup.string().required('confirm password is required').oneOf([Yup.ref('password'), null], 'Passwords must match').min(8).max(32),
});

function RegisterScreen({ navigation }) {
    const handleSubmit = (values) => {
        Accounts.instance.signup(values)
    }
    return (
        <AppScreen style={styles.container} backgroundImage={background}>
                <KeyboardAvoidingView maxPushUp={200} style={styles.iconAndWelcomContainer}>
                    <Image source={logo} style={styles.logo}/>
                    <Formik
                        initialValues={{ email: '', password: '', password2: ''}}
                        onSubmit={handleSubmit}
                        validationSchema={LoginSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, errors, touched, values, isValid }) => (
                                <View style={{marginTop: 60, alignItems: "center"}}>
                                    {errors.email && touched.email ? <AppText style={[styles.warningText]}>{errors.email}</AppText> : null}
                                    <TextInput
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        placeholder="Email"
                                        style={styles.inputFeilds}
                                        autoCapitalize="none"
                                    />
                                    {errors.password && touched.password ? <AppText style={[styles.warningText]}>{errors.password}</AppText> : null}
                                    <TextInput
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        placeholder="Password"
                                        style={styles.inputFeilds}
                                        secureTextEntry={true}
                                        autoCapitalize="none"
                                    />
                                    {errors.password2 && touched.password2 ? <AppText style={[styles.warningText]}>{errors.password2}</AppText> : null}
                                    <TextInput
                                        onChangeText={handleChange('password2')}
                                        onBlur={handleBlur('password2')}
                                        value={values.password2}
                                        placeholder="Confirm password"
                                        style={styles.inputFeilds}
                                        secureTextEntry={true}
                                        autoCapitalize="none"
                                    />
                                    <AppButton disabled={!isValid} onPress={handleSubmit} title="Submit" style={{marginTop: 20}}/>
                                </View>
                        )}
                    </Formik>
                </KeyboardAvoidingView>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: "hidden"
    },
    iconAndWelcomContainer:{
        alignItems: 'center',
    },
    inputFeilds: {
        backgroundColor:"white",
        fontSize:20,
        padding: 10,
        marginVertical: 10,
        width: 300
    },
    logo: {
        width: 130,
        height: 130,
        marginTop: 50,
        marginBottom: 60
    },
    warningText: {
        backgroundColor: AppColor.primary,
        borderRadius: 20,
        borderColor: AppColor.border,
        padding: 10,
        textAlign: "center",
        fontSize: 15,
        borderWidth: 1,
        color: "red"
    }
})

export default RegisterScreen;