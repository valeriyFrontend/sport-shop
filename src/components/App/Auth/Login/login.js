import { Component } from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';

import './login.scss';

const SignupShema = Yup.object().shape({
    email: Yup.string()
        .min(4, 'To Short!')
        .max(14, 'To Long!')
        .required('email field is required'),
    password: Yup.string()
        .min(4, 'To Short!')
        .max(14, 'To Long!')
        .email('Invalid password')
        .required('password andress field is required')
})

class contacts extends Component {
    showMessage() {
        console.log('sdfg');
    }

    render() {
        return (
            <section className="sign-in">
                <h1 className="title title--uppercase">Sign in</h1>
                    <Formik
                        initialValues={{email: '', password: '',}}
                        validationSchema={SignupShema}
                    >
                        <Form>
                            <div className="sign-in__info">
                                <div className="sign-in__field">
                                    <Field type="email" name="email" placeholder="Email"/>
                                    <ErrorMessage name="email" component="div" className="error-message"/>
                                </div>
                                <div className="sign-in__field">
                                    <Field type="password" name="password" placeholder="Password"/>
                                    <ErrorMessage name="password" component="div" className="error-message"/>
                                </div>
                            </div>
                            <button className="sign-in__button" type="submit" onClick={this.showMessage}>
                                Sign in
                            </button>
                            <Link className="sign-in__registration-button" to="registration">Registration</Link>
                        </Form>
                    </Formik>
                </section>
        )
    }
}

export default contacts;