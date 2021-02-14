import { Component } from "react";
import { database, storage } from "../../../../firebase";
import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';

const SignupShema = Yup.object().shape({
    name: Yup.string()
        .min(4, 'To Short!')
        .max(30, 'To Long!')
        .required('name field is required'),
    price: Yup.number()
        .max(30, 'To Long!')
        .required('price field is required'),
    amount: Yup.number()
        .max(30, 'To Long!')
        .required('amount field is required')
})

class AddProduct extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            file: null,
            imageUrl: '',
            selectedCategory: 'running'
        }
    }
    componentDidMount() {
        const categoriesRef = database.ref().child('categories');

        categoriesRef.on('value', snap => {
            this.setState({categories: snap.val()});
        });
    };
    addProduct =  async (name, price, amount) => {
        const productsRef = database.ref().child('products');
        let { file, imageUrl, selectedCategory } = this.state;

        await storage.ref(`/images/${name}/${file.name}`).put(file);
        await storage.ref(`images/${name}`).child(file.name).getDownloadURL()
            .then(url => {
                this.setState({imageUrl: url})
            })
        productsRef.push({
            'name': name,
            'image': imageUrl,
            'category': selectedCategory,
            'price' : price,
            'amount': amount,
            'count': 0,
            'fullPrice': 0
        });
    }
    handleImageAsFile = (e) => {
        this.setState({file: e.target.files[0]})
    }
    render() {
        let categories = this.state.categories;
        return (
            <section className="add-category">
                <Formik
                        initialValues={{name: '', price: '', amount: ''}}
                        onSubmit={value => {
                            this.addProduct(value.name, value.price, value.amount);
                        }}
                        validationSchema={SignupShema}
                    >
                    <Form className="form-admin">
                        <div className="form-admin__half-width">
                            <div className="form-field-admin">
                                <Field className='form-admin__field' name="name" type="text" placeholder="Name"></Field>
                                <ErrorMessage name="name" component="div" className="error-message-admin"/>
                            </div>
                            <div className="form-field-admin">
                                <select className='form-admin__field' onChange={(event) => this.setProduct({selectedCategory: event.target.value})} type="text" placeholder="Name">
                                    {categories && Object.keys(categories).map((category, key) => <option key={key}>{categories[category].name}</option>)}
                                </select>
                        </div>
                        </div>
                        <div className="form-field-admin">
                            <Field className='form-admin__field' name="price" type="number" placeholder="Price"></Field>
                            <ErrorMessage name="price" component="div" className="error-message-admin"/>
                        </div>
                        <div className="form-field-admin">
                            <Field className='form-admin__field' name="amount" type="number" placeholder="Amount"></Field>
                            <ErrorMessage name="amount" component="div" className="error-message-admin"/>
                        </div>
                        <input 
                            className="form-admin__select-photo"
                            type="file"
                            onChange={this.handleImageAsFile}
                        />
                        <button className="form-admin__button" type="submit">Save</button>
                    </Form>
                </Formik>
            </section>
        )
    }
}

export default AddProduct;