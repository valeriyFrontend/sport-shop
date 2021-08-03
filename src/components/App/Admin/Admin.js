import { Fragment } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "./Nav";
import Header from "./Header";
import Catalog from "./Catalog";
import AddProduct from "./addProduct";
import Categories from "./Categories";
import addCategory from "./addCategory";
import Customers from "./Customers";
import AddCustomer from "./addCustomer";
import EditCustomer from "./Customers/editCustomer";
import EditProduct from "./Catalog/EditProuduct";

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
            <Route
              exact
              path="/sport-shop/admin/catalog"
              component={Catalog}
            ></Route>
            <Route
              path="/sport-shop/admin/addProduct"
              component={AddProduct}
            ></Route>
            <Route
              path="/sport-shop/admin/categories"
              component={Categories}
            ></Route>
            <Route
              path="/sport-shop/admin/addCategory"
              component={addCategory}
            ></Route>
            <Route
              path="/sport-shop/admin/customers"
              component={Customers}
            ></Route>
            <Route
              path="/sport-shop/admin/addCustomer"
              component={AddCustomer}
            ></Route>
            <Route
              path="/sport-shop/admin/editCustomer/:id"
              component={EditCustomer}
            ></Route>
            <Route
              path="/sport-shop/admin/catalog/editProduct/:id"
              component={EditProduct}
            ></Route>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    client: state.client,
  };
}

export default connect(mapStateToProps)(Admin);
