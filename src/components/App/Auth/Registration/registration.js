import { Component } from 'react';
import firebase from 'firebase';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';

import './registration.scss';

const SignupShema = Yup.object().shape({
    email: Yup.string()
        .min(4, 'To Short!')
        .max(14, 'To Long!')
        .required('email field is required'),
    password: Yup.string()
        .min(4, 'To Short!')
        .max(14, 'To Long!')
        .required('password field is required'),
    confirmPassword:Yup.string()
        .min(4, 'To Short!')
        .max(14, 'To Long!')
        .required('password field is required')
        .test('passwords-match', 'Password must match ya fool', function(value) {
            return this.parent.password ===  value;
        })
})

// firebase.auth().createUserWithEmailAndPassword(email, password)
//   .then((user) => {
//     console.log(user);
//   })
//   .catch((error) => {
//     console.log(error.code);
// });

class registration extends Component {
    render() {
        return (
            <section className="registration">
                <h1 className="title title--uppercase">Registration</h1>
                    <Formik
                        initialValues={{email: '', password: '', confirmPassword: ''}}
                        validationSchema={SignupShema}
                    >
                        <Form>
                            <div className="registration__info">
                                <div className="registration__field">
                                    <Field type="email" name="email" placeholder="Email"/>
                                    <ErrorMessage name="email" component="div" className="error-message"/>
                                </div>
                                <div className="registration__field">
                                    <Field type="password" name="password" placeholder="Password"/>
                                    <ErrorMessage name="password" component="div" className="error-message"/>
                                </div>
                                <div className="registration__field">
                                    <Field type="password" name="confirmPassword" placeholder="Confirm password"/>
                                    <ErrorMessage name="confirmPassword" component="div" className="error-message"/>
                                </div>
                            </div>
                            <button className="registration__button" type="submit">
                                Registration Account
                            </button>
                        </Form>
                    </Formik>
                </section>
        )
    }
}

export default registration;