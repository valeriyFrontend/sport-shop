import { Component } from 'react';
import { Link } from 'react-router-dom';
import {addUser} from '../../../../redux/actions'
import { auth } from '../../../../firebase';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';

import './login.scss';
import { connect } from 'react-redux';

const SignupShema = Yup.object().shape({
    email: Yup.string()
        .min(4, 'To Short!')
        .max(30, 'To Long!')
        .required('email field is required'),
    password: Yup.string()
        .min(4, 'To Short!')
        .max(14, 'To Long!')
        .required('password andress field is required')
})

class contacts extends Component {
    render() {
        const sing = (email, password) => auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                this.props.addUser();
                console.log(userCredential);
            })
            .catch((error) => {
                console.log(error);
            });
        return (
            <section className="sign-in">
                <h1 className="title title--uppercase">Sign in</h1>
                    <Formik
                        initialValues={{email: '', password: '',}}
                        onSubmit ={value => {
                            sing(value.email, value.password)
                        }}
                        validationSchema={SignupShema}
                    >
                        <Form className="form">
                            <div className="form__info form__info--direction">
                                <div className="form__field form__field--margin">
                                    <Field type="email" name="email" placeholder="Email"/>
                                    <ErrorMessage name="email" component="div" className="error-message"/>
                                </div>
                                <div className="form__field">
                                    <Field type="password" name="password" placeholder="Password"/>
                                    <ErrorMessage name="password" component="div" className="error-message"/>
                                </div>
                            </div>
                            <button className="form__button form__button--width" type="submit">
                                Sign in
                            </button>
                            <Link className="sign-in__registration-button" to="registration">Registration</Link>
                        </Form>
                    </Formik>
                </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        login: state.login
    }
}
const mapDispatchToProps = {
    addUser
}

export default connect(mapStateToProps, mapDispatchToProps)(contacts);