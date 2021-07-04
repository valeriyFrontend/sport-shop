import { NavLink } from "react-router-dom";

import "./nav-admin.scss";

function Nav() {
  return (
    <div className="nav-admin">
      <NavLink to="/admin/catalog" className="nav-admin__logo">
        Sport-Shop
      </NavLink>
      <ul className="nav-admin__list">
        <li>
          <NavLink to="/admin/catalog" activeClassName="nav-admin__selected">
            Catalog
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/addProduct" activeClassName="nav-admin__selected">
            Add Product
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/categories" activeClassName="nav-admin__selected">
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/addCategory"
            activeClassName="nav-admin__selected"
          >
            Add Category
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/customers" activeClassName="nav-admin__selected">
            Customers
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/addCustomer"
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
