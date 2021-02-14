import { Component } from 'react';
import { ErrorMessage, Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../../UI/Input';
import FormButton from "../../UI/Buttons/FormButton";

import './contact.scss';

const SignupShema = Yup.object().shape({
    name: Yup.string()
        .min(4, 'To Short!')
        .max(14, 'To Long!')
        .required('name field is required'),
    email: Yup.string()
        .max(14, 'To Long!')
        .email('Invalid email')
        .required('email andress field is required'),
    message: Yup.string()
        .min(4, 'To Short!')
        .max(50, 'To Long!')
        .required('message field is required'),
})

class contact extends Component {
    constructor() {
        super();
        this.state = {
            inputs: [
                {
                    name: 'name',
                    type: 'text',
                    placeholder: 'Name'
                },
                {
                    name: 'email',
                    type: 'email',
                    placeholder: 'Email'
                }
            ]
        }
    }
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
        return (
            <section className="contact">
                <h1 className="title title--uppercase">Contact Us</h1>
                <span className="descr descr--red descr--letter-spacing">We are happy to hear from you.</span>
                    <Formik
                        initialValues={{name: '', email: '', message: ''}}
                        validationSchema={SignupShema}
                        onSubmit={values => console.log(values)}>
                            <Form className="form">
                                <div className="form__info">
                                    {this.renderInput()}
                                    <textarea className="form__message" type="text" placeholder="Message" name="message"></textarea>
                                    <ErrorMessage name="message" component="div" className="error-message"/>
                                    <FormButton name={'Send a message'}/>
                                </div>
                            </Form>
                    </Formik>
                </section>
        )
    }
}

export default contact;