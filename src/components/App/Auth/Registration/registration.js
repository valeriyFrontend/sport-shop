import { Component } from 'react';
import { auth } from '../../../../firebase';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';

import './registration.scss';

const SignupShema = Yup.object().shape({
    email: Yup.string()
        .min(4, 'To Short!')
        .max(30, 'To Long!')
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

const addUser = (email, password) => auth.createUserWithEmailAndPassword(email, password)
  .then((user) => {
    console.log(user);
  })
  .catch((error) => {
    console.log(error.code);
});

class registration extends Component {
    render() {
        return (
            <section className="registration">
                <h1 className="title title--uppercase">Registration</h1>
                    <Formik
                        initialValues={{email: '', password: '', confirmPassword: ''}}
                        onSubmit={value => {
                            addUser(value.email, value.password);
                        }}
                        validationSchema={SignupShema}
                    >
                        <Form className="form">
                            <div className="form__info form__info--direction">
                                <div className="form__field form__field--margin">
                                    <Field type="email" name="email" placeholder="Email"/>
                                    <ErrorMessage name="email" component="div" className="error-message"/>
                                </div>
                                <div className="form__field form__field--margin">
                                    <Field type="password" name="password" placeholder="Password"/>
                                    <ErrorMessage name="password" component="div" className="error-message"/>
                                </div>
                                <div className="form__field">
                                    <Field type="password" name="confirmPassword" placeholder="Confirm password"/>
                                    <ErrorMessage name="confirmPassword" component="div" className="error-message"/>
                                </div>
                            </div>
                            <button className="form__button form__button--width" type="submit">
                                Registration Account
                            </button>
                        </Form>
                    </Formik>
                </section>
        )
    }
}

export default registration;