import { Component } from "react";
import { database } from "../../../../../firebase";
import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';

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
    role: Yup.string()
        .min(4, 'To Short!')
        .max(30, 'To Long!')
        .required('role field is required')
})

class addCustomer extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            firstName: 'not first name',
            lastName: 'not last name',
            email: 'not email',
            role: 'not role',
            uid: ''
        }
    }
    componentDidMount() {
        const userRef = database.ref('users').child(this.props.match.params.id);

        userRef.on('value', snap => {
            let user = snap.val();
            this.setState({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                uid: user.uid
            });
        });
    }
    changeUser() {
        const userRef = database.ref('users').child(this.props.match.params.id);
        let {firstName, lastName, email, role, uid} = this.state;
        userRef.set({
            'firstName': firstName,
            'lastName' : lastName,
            'email': email,
            'role': role,
            'uid': uid
        });
    }
    handleInputChange(event) {
        const inputName = event.target.name;
        const value = event.target.value;

        this.setState({
            [inputName]: value
        })
    }
    render() {
        let {firstName, lastName, email, role} = this.state;
        return (
            <section className="add-customer">
                <Formik
                        initialValues={{firstName, lastName, email, role}}
                        onSubmit={() => {
                            this.changeUser();
                        }}
                        validationSchema={SignupShema}
                    >
                    <Form className="form-admin">
                        <div className="form-admin__half-width">
                            <div className="form-field-admin">
                                <Field className='form-admin__field' name="firstName" type="text" value={firstName} onChange={this.handleInputChange.bind(this)} placeholder="First name"></Field>
                                <ErrorMessage name="firstName" component="div" className="error-message-admin"/>
                            </div>
                            <div className="form-field-admin">
                                <Field className='form-admin__field' name="lastName" type="text" value={lastName} onChange={this.handleInputChange.bind(this)} placeholder="Last name"></Field>
                                <ErrorMessage name="lastName" component="div" className="error-message-admin"/>
                            </div>
                        </div>
                        <div className="form-field-admin">
                            <Field className='form-admin__field' name="email" type="email" value={email} onChange={this.handleInputChange.bind(this)} placeholder="Email"></Field>
                            <ErrorMessage name="email" component="div" className="error-message-admin"/>
                        </div>
                        <div className="form-field-admin">
                            <Field className='form-admin__field' name="role" type="text" value={role} onChange={this.handleInputChange.bind(this)} placeholder="Role"></Field>
                            <ErrorMessage name="role" component="div" className="error-message-admin"/>
                        </div>
                        <button className="form-admin__button" type="submit">Save</button>
                    </Form>
                </Formik>
            </section>
        )
    }
}

export default addCustomer;