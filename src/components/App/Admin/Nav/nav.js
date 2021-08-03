import { NavLink } from "react-router-dom";

import "./nav-admin.scss";

function Nav() {
  return (
    <div className="nav-admin">
      <NavLink to="/sport-shop/admin/catalog" className="nav-admin__logo">
        Sport-Shop
      </NavLink>
      <ul className="nav-admin__list">
        <li>
          <NavLink
            to="/sport-shop/admin/catalog"
            activeClassName="nav-admin__selected"
          >
            Catalog
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sport-shop/admin/addProduct"
            activeClassName="nav-admin__selected"
          >
            Add Product
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sport-shop/admin/categories"
            activeClassName="nav-admin__selected"
          >
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sport-shop/admin/addCategory"
            activeClassName="nav-admin__selected"
          >
            Add Category
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sport-shop/admin/customers"
            activeClassName="nav-admin__selected"
          >
            Customers
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sport-shop/admin/addCustomer"
            activeClassName="nav-admin__selected"
          >
            Add Customer
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
