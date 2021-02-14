import { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from './Nav';
import Header from './Header';
import Catalog from './Catalog';
import AddProduct from './addProduct';
import Categories from './Categories';
import addCategory from './addCategory';
import Customers from './Customers';
import AddCustomer from './addCustomer';
import EditCustomer from './Customers/editCustomer';
import EditProduct from './Catalog/EditProuduct';

import "./Admin.scss";
import "./table.scss";
import "./form-admin.scss";

const Admin = () => {
        // if (this.props.client.role !== 'admin') return <Redirect to='/login' />

    return (
        <Fragment>
            <div className="admin">
                <Nav />
                <div className="admin__component">
                    <Header />
                    <div className="admin__content">
                        <Route exact path="/admin/catalog" component={Catalog}></Route>
                        <Route path="/admin/addProduct" component={AddProduct}></Route>
                        <Route path="/admin/categories" component={Categories}></Route>
                        <Route path="/admin/addCategory" component={addCategory}></Route>
                        <Route path="/admin/customers" component={Customers}></Route>
                        <Route path="/admin/addCustomer" component={AddCustomer}></Route>
                        <Route path="/admin/editCustomer/:id" component={EditCustomer}></Route>
                        <Route path="/admin/catalog/editProduct/:id" component={EditProduct}></Route>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

function mapStateToProps(state) {
    return {
        client: state.client
    }
}

export default connect(mapStateToProps)(Admin);