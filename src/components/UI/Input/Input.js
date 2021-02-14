import { ErrorMessage, Field } from 'formik';

import './input.scss';

const Input =(props) => {
        return (
            <div className="form-field-admin">
                <Field className="input " name={props.name} type={props.type} placeholder={props.placeholder}></Field>
                <ErrorMessage name={props.name} component="div" className="error-message-admin"/>
            </div>
        )
}

export default Input;