import * as Yup from 'yup';

export default {
    Login: Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required').min(8).max(32),
    }),
    Register: Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required').min(8).max(32),
        password2: Yup.string().required('confirm password is required').oneOf([Yup.ref('password'), null], 'Passwords must match').min(8).max(32),
    })
}