import { Component } from 'react';
import { database } from "../../../../firebase";
import { auth } from '../../../../firebase';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../../../UI/Input';
import ButtonForm from '../../../UI/Buttons/FormButton';
import Toast from '../../../UI/Toasts';

import './registration.scss';

const SignupShema = Yup.object().shape({
    firstName: Yup.string()
        .min(4, 'To Short!')
        .max(30, 'To Long!')
        .required('first name field is required'),
    lastName: Yup.string()
        .min(4, 'To Short!')
        .max(30, 'To Long!')
        .required('last name field is required'),
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
        .required('confirm password field is required')
        .test('passwords-match', 'Password must match ya fool', function(value) {
            return this.parent.password ===  value;
        })
})

class registration extends Component {
    constructor() {
        super();
        this.state = {
            toastState: '',
            toastText: '',
            inputs: [
                {
                    name: 'firstName',
                    type: 'text',
                    placeholder: 'First Name'
                },
                {
                    name: 'lastName',
                    type: 'text',
                    placeholder: 'Last Name'
                },
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
                {
                    name: 'confirmPassword',
                    type: 'password',
                    placeholder: 'Confirm password'
                }
            ]
        }
    }
    addUser = (firstName, lastName, email, password) => auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            localStorage.setItem('refreshToken', user.refreshToken);
            localStorage.setItem('uid', user.user.uid);

            const usersRef = database.ref().child('users');
            usersRef.push({
                'firstName': firstName,
                'lastName' : lastName,
                'email': email,
                'uid': user.user.uid,
                'role': 'user'
            })
            this.setState({ toastState: 'success', toastText: 'Registration is successful!' })
        })
        .catch((error) => {
            this.setState({ toastState: 'error', toastText: 'Error registration!' })
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
            <section className="registration">
                <Toast toastState={toastState} toastText={toastText} />
                <h1 className="title title--uppercase">Registration</h1>
                    <Formik
                        initialValues={{firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}}
                        onSubmit={value => {
                            this.addUser(value.firstName, value.lastName, value.email, value.password);
                        }}
                        validationSchema={SignupShema}
                    >
                        <Form className="form">
                            <div className="form__info">
                                {this.renderInput()}
                            </div>
                            <ButtonForm name={'Registration Account'} className={'form-button--width'}/>
                        </Form>
                    </Formik>
                </section>
        )
    }
}

export default registration;