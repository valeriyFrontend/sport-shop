import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setClient } from '../../../../redux/actions';
import { auth } from '../../../../firebase';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../../../UI/Input';
import ButtonForm from '../../../UI/Buttons/FormButton';
import Toast from "../../../UI/Toasts";

import './login.scss';

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
    constructor() {
        super();
        this.state = {
            toastState: '',
            toastText: '',
            inputs: [
                {
                    name: 'email',
                    type: 'email',
                    placeholder: 'Email'
                },
                {
                    name: 'password',
                    type: 'password',
                    placeholder: 'Password'
                },
            ]
        }
    }
    sing = (email, password) => auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            localStorage.setItem('refreshToken', userCredential.refreshToken);
            localStorage.setItem('uid', userCredential.user.uid);
            this.setState({ toastState: 'success', toastText: 'You are success log in!' });
        })
        .catch((error) => {
            this.setState({ toastState: 'error', toastText: 'Error log in!' })
            console.log(error);
        });
    renderInput = () => {
        return this.state.inputs.map((input, index) => {
            return (
                <Input 
                    key={index}
                    name={input.name}
                    type={input.type}
                    placeholder={input.placeholder}
                />
            )
        })
    }
    render() {
        let { toastState, toastText } = this.state;
        return (
            <section className="sign-in">
                <Toast toastState={toastState} toastText={toastText} />
                <h1 className="title title--uppercase">Sign in</h1>
                <Formik
                    initialValues={{ email: '', password: '', }}
                    onSubmit={value => {
                        this.sing(value.email, value.password)
                    }}
                    validationSchema={SignupShema}
                >
                    <Form className="form">
                        <div className="form__info">
                            {this.renderInput()}
                        </div>
                        <ButtonForm name={'Sign in'} className={'form-button--width'}/>
                        <Link className="sign-in__registration-button" to="registration">Registration</Link>
                    </Form>
                </Formik>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        client: state.client
    }
}

const mapDispatchToProps = {
    setClient
}

export default connect(mapStateToProps, mapDispatchToProps)(contacts);