import { Component } from 'react';
import { database, storage } from "../../../../../firebase";
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

class editProduct extends Component {
    constructor() {
        super();
        this.state = {
            name: 'not name',
            price: 0,
            amount: 0,
            categories: [],
            file: null,
            imageUrl: '',
            selectCategory: 'running'
        }
    }
    componentDidMount() {
        const rootRef = database.ref('products').child(this.props.match.params.id);
        const categoriesRef = database.ref('categories');

        rootRef.on('value', snap => {
            let product = snap.val();
            this.setState({
                name: product.name,
                price: product.price,
                amount: product.amount
            });
        });
        categoriesRef.on('value', snap => {
            let categories = snap.val();
            this.setState({categories});
        });
    }
    async changeProduct() {
        const productRef = database.ref().child('products').child(this.props.match.params.id);
        await storage.ref(`/images/${this.state.name}/${this.state.file.name}`).put(this.state.file);
        await storage.ref(`images/${this.state.name}`).child(this.state.file.name).getDownloadURL()
            .then(url => {
                this.setState({url})
            })
        productRef.set({
            'name': this.state.name,
            'category': this.state.selectCategory,
            'price' : this.state.price,
            'amount': this.state.amount,
            'image': this.state.url,
            'count': 0,
            'fullPrice': 0
        });
    }
    handleInputChange(event) {
        const inputName = event.target.name;
        const value = event.target.value;

        this.setState({
            [inputName]: value
        })
    }
    handleImageAsFile = (e) => {
        this.setState({file: e.target.files[0]})
    }

    render() {
        let {name, price, amount} = this.state;
        let categories = this.state.categories;
        return (
            <section className="add-category">
                <Formik
                        initialValues={{name, price, amount}}
                        onSubmit={() => {
                            this.changeProduct();
                        }}
                        validationSchema={SignupShema}
                    >
                    <Form className="form-admin">
                        <div className="form-admin__half-width">
                            <div className="form-field-admin">
                                <Field className='form-admin__field' name="name" type="text" value={name} onChange={this.handleInputChange.bind(this)} placeholder="Name"></Field>
                                <ErrorMessage name="name" component="div" className="error-message-admin"/>
                            </div>
                            <div className="form-field-admin">
                                <select className='form-admin__field' onChange={(event) => this.setState({selectCategory: event.target.value})} type="text" placeholder="Name">
                                    {categories && Object.keys(categories).map((category, key) => <option key={key}>{categories[category].name}</option>)}
                                </select>
                        </div>
                        </div>
                        <div className="form-field-admin">
                            <Field className='form-admin__field' name="price" type="number" value={price} onChange={this.handleInputChange.bind(this)} placeholder="Price"></Field>
                            <ErrorMessage name="price" component="div" className="error-message-admin"/>
                        </div>
                        <div className="form-field-admin">
                            <Field className='form-admin__field' name="amount" type="number" value={amount} onChange={this.handleInputChange.bind(this)} placeholder="Amount"></Field>
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

export default editProduct;