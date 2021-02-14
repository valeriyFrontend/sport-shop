import { database } from "../../../../firebase";
import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';

const SignupShema = Yup.object().shape({
    name: Yup.string()
        .min(4, 'To Short!')
        .max(30, 'To Long!')
        .required('name field is required')
})

const AddCategory = () => {
    const addCategory = (name) => {
        const categoriesRef = database.ref().child('categories');
        categoriesRef.push({
            'name': name
        });
    }
    return (
        <section className="add-category">
            <Formik
                    initialValues={{name: ''}}
                    onSubmit={value => {
                        addCategory(value.name);
                    }}
                    validationSchema={SignupShema}
                >
                <Form className="form-admin">
                    <div className="form-field-admin">
                        <Field className='form-admin__field' name="name" type="text" placeholder="Name"></Field>
                        <ErrorMessage name="name" component="div" className="error-message-admin"/>
                    </div>
                    <button className="form-admin__button" type="submit">Save</button>
                </Form>
            </Formik>
        </section>
    )
}

export default AddCategory;