import { Component } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../../redux/actions";
import { database } from "../../../firebase";
import Spinner from "../../UI/Spinner/Spinner";
import Product from "./Product/product";
import Filter from "./Filter/filter";
import Sorting from './Sorting/sorting';

import './products.scss';

class Products extends Component {
    constructor() {
        super();
        this.state = {
            products: null
        }
    }

    componentDidMount() {
        const productsRef = database.ref().child('products');

        productsRef.on('value', snap => {
            this.props.getProducts(snap.val());
            this.setState({products: this.props.products});
        });
    }

    changeState(products) {
        this.setState({products: products})
    }

    render() {
        let products = this.state.products;
        return (
            <section className="products" >
                <div className="products__sort">
                    <Sorting products={products} changeState={this.changeState.bind(this)} />
                    <Filter products={products} changeState={this.changeState.bind(this)} rootRef={this.rootRef} />
                </div>
                <div className="products__items">
                    <Spinner loading={products}/>
                    <Product products={products}/>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products
    }
}

const mapDispatchToProps = {
    getProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);