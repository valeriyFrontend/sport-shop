import { database } from "../../../../firebase";
import { auth } from '../../../../firebase';
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

const addCustomer = () => {
    const addUser = (firstName, lastName, email, password) => auth.createUserWithEmailAndPassword(email, password)
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
            });
        })
        .catch((error) => {
            console.log(error.code);
        });
    return (
        <section className="add-customer">
            <Formik
                    initialValues={{firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}}
                    onSubmit={value => {
                        addUser(value.firstName, value.lastName, value.email, value.password);
                    }}
                    validationSchema={SignupShema}
                >
                <Form className="form-admin">
                    <div className="form-admin__half-width">
                        <div className="form-field-admin">
                            <Field className='form-admin__field' name="firstName" type="text" placeholder="First name"></Field>
                            <ErrorMessage name="firstName" component="div" className="error-message-admin"/>
                        </div>
                        <div className="form-field-admin">
                            <Field className='form-admin__field' name="lastName" type="text" placeholder="Last name"></Field>
                            <ErrorMessage name="lastName" component="div" className="error-message-admin"/>
                        </div>
                    </div>
                    <div className="form-field-admin">
                        <Field className='form-admin__field' name="email" type="email" placeholder="Email"></Field>
                        <ErrorMessage name="email" component="div" className="error-message-admin"/>
                    </div>
                    <div className="form-admin__half-width">
                        <div className="form-field-admin">
                            <Field className='form-admin__field' name="password" type="password" placeholder="Pasword"></Field>
                            <ErrorMessage name="password" component="div" className="error-message-admin"/>
                        </div>
                        <div className="form-field-admin">
                            <Field className='form-admin__field' name="confirmPassword" type="password" placeholder="Confirm password"></Field>
                            <ErrorMessage name="confirmPassword" component="div" className="error-message-admin"/>
                        </div>
                    </div>
                    <button className="form-admin__button" type="submit">Save</button>
                </Form>
            </Formik>
        </section>
    )
}

export default addCustomer;