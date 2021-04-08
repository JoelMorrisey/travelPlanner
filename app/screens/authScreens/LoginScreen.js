//React native
import React, { useState } from 'react';
import { View, StyleSheet, Image, TextInput } from 'react-native'

//Third party
import * as Yup from 'yup';
import { Formik } from 'formik';

//Components
import AppButton from "components/AppButton"
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

function LoginScreen({ navigation: { navigate } }) {
    //Is the credential entered valid
    const [invalidLogin, setInvalidLogin] = useState(false)

    const handleSubmit = (values) => {
        //Attempt to log user in
        const user = Accounts.instance.login(values);
        //If valid login set user to logged in otherwise set invalid login flag
        if (user) {
            setInvalidLogin(false);
            CurrentAccount.instance.setLoginStatus(user)
            navigate('HomeUser');
        } else {
            setInvalidLogin(true);
        }
    }

    return (
        <AppScreen style={styles.container} backgroundImage={background}>
                <KeyboardAvoidingView maxPushUp={100} style={styles.iconAndWelcomContainer}>
                    <Image source={logo} style={styles.logo}/>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={handleSubmit}
                        validationSchema={CredentialSchemas.Login}
                    >
                        {({ handleChange, handleBlur, handleSubmit, errors, touched, values, isValid }) => (
                                <View style={styles.formContainer}>
                                    {invalidLogin && <AppText style={[styles.warningText]}>Invalid login Credentials</AppText>}

                                    {/* Get the users email */}
                                    {errors.email && touched.email ? <AppText style={[styles.warningText]}>{errors.email}</AppText> : null}
                                    <TextInput
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        placeholder="Email"
                                        style={styles.inputFeilds}
                                        autoCapitalize="none"
                                    />

                                    {/* Won't show warnings for password as this does not make sense for login */}
                                    {/* Get the users password */}
                                    <TextInput
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        placeholder="Password"
                                        style={styles.inputFeilds}
                                        secureTextEntry={true}
                                        autoCapitalize="none"
                                    />

                                    {/* Submission button */}
                                    <AppButton
                                        disabled={!isValid}
                                        onPress={handleSubmit}
                                        title="Login"
                                        style={{marginTop: 20}}
                                    />
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

export default LoginScreen;