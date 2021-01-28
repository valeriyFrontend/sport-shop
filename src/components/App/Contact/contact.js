import { Component } from 'react';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { withAuthRedirect } from '../../../hoc/withAuthRedirect';

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
                                    <div className="form__field">
                                        <Field type="text" name="name" placeholder="Name"/>
                                        <ErrorMessage name="name" component="div" className="error-message"/>
                                    </div>
                                    <div className="form__field">
                                        <Field type="email" name="email" placeholder="Email"/>
                                        <ErrorMessage name="email" component="div" className="error-message"/>
                                    </div>
                                </div>
                                <textarea className="form__message" type="text" placeholder="Message" name="message"></textarea>
                                <ErrorMessage name="message" component="div" className="error-message"/>
                                <button className="form__button" type="submit">
                                    Send a message
                                </button>
                            </Form>
                    </Formik>
                </section>
        )
    }
}

let AuthRedirectComponent = withAuthRedirect(contact)

export default AuthRedirectComponent;