import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { database } from "../../../../firebase";
import { getProducts } from "../../../../redux/actions";
import Setting from "./Setting";

import "./catalog-admin.scss";
import iconCross from "../icons/cross.svg";
import iconEdit from "../icons/edit.svg";

class Catalog extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const productsRef = database.ref().child("products");

    productsRef.on("value", (snap) => {
      let productsArr = [];
      const products = snap.val();

      for (let key in products) {
        const product = products[key];
        product.id = key;
        productsArr.push(product);
      }
      this.props.getProducts(productsArr);
      this.setState({ products: productsArr });
    });
  }
  setProducts = (sortingProducts) => {
    this.setState({ products: sortingProducts });
  };
  deleteProduct(removeProduct) {
    if (!window.confirm("Delete product")) return;
    const productsRef = database.ref().child("products");
    let filterProducts = null;

    productsRef.on("value", (snap) => {
      filterProducts = snap.val();
      for (let product in filterProducts) {
        if (product === removeProduct.id) {
          delete filterProducts[product];
        }
      }
    });
    productsRef.set(filterProducts);
  }

  render() {
    let products = this.state.products;
    return (
      <div className="admin-catalog">
        <Setting products={products} setProducts={this.setProducts} />
        <table className="table">
          <tbody>
            <tr className="table__title">
              <td>Name</td>
              <td>Category</td>
              <td>Price</td>
              <td>Amount</td>
              <td></td>
              <td></td>
            </tr>
            {products &&
              products.map((product, key) => (
                <tr key={key}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.amount}</td>
                  <td className="table__icons table__link-edit">
                    <Link
                      to={`/sport-shop/admin/catalog/editProduct/${product.id}`}
                    >
                      <img src={iconEdit} alt="icon-edit" />
                    </Link>
                  </td>
                  <td
                    className="table__icons table__delete"
                    onClick={() => this.deleteProduct(product)}
                  >
                    <img src={iconCross} alt="icon-cross" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

const mapDispatchToProps = {
  getProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
