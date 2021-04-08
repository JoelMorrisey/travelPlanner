//Third party
import * as Yup from 'yup';

//Database
import Accounts from "database/Accounts"

//Extract out database data
const account = Accounts.instance;

export default {
    Login: Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required').min(8).max(32),
    }),
    Register: Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required').notOneOf(account.getAllEmails(), "Email already in use"),
        password: Yup.string().required('Password is required').min(8).max(32),
        password2: Yup.string().required('confirm password is required').oneOf([Yup.ref('password'), null], 'Passwords must match').min(8).max(32),
    })
}