//React native
import React from 'react';
import { View, StyleSheet, Image, TextInput } from 'react-native';

//Third party
import { Formik } from 'formik';

//Components
import AppButton from "components/AppButton";
import AppScreen from 'components/AppScreen';
import AppText from 'components/AppText';
import KeyboardAvoidingView from 'components/KeyboardAvoidingView';

//Config
import AppColor from "config/AppColor";
import CredentialSchemas from "config/CredentialSchemas"

//Database
import Accounts from 'database/Accounts';
import CurrentAccount from 'database/CurrentAccount'

//Assets
const background = require("assets/mountain-background.jpg");
const logo = require("assets/logo.png");

function RegisterScreen({ navigation: { navigate } }) {
    // Create user account and log them in on register
    const handleSubmit = (values) => {
        Accounts.instance.signup(values)
        const user = Accounts.instance.login(values);
        CurrentAccount.instance.setLoginStatus(user)
        navigate('HomeUser');
    }

    return (
        <AppScreen style={styles.container} backgroundImage={background}>
                <KeyboardAvoidingView maxPushUp={200} style={styles.iconAndWelcomContainer}>
                    <Image source={logo} style={styles.logo}/>
                    <Formik
                        initialValues={{ email: '', password: '', password2: ''}}
                        onSubmit={handleSubmit}
                        validationSchema={CredentialSchemas.Register}
                    >
                        {({ handleChange, handleBlur, handleSubmit, errors, touched, values, isValid }) => (
                                <View style={styles.formContainer}>

                                    {/* Get users email */}
                                    {errors.email && touched.email ? <AppText style={[styles.warningText]}>{errors.email}</AppText> : null}
                                    <TextInput
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        placeholder="Email"
                                        style={styles.inputFeilds}
                                        autoCapitalize="none"
                                    />

                                    {/* Get users password */}
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

                                    {/* Get users password comfimation */}
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

                                    {/* Register button */}
                                    <AppButton disabled={!isValid} onPress={handleSubmit} title="Register" style={{marginTop: 20}}/>
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
    formContainer: {
        marginTop: 60,
        alignItems: "center"
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