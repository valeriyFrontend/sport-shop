import { Component } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../../redux/actions";
import { database } from "../../../firebase";
import { withAuthRedirect } from '../../../hoc/withAuthRedirect';
import Spinner from "../../UI/Spinner";
import Product from "./Product";
import Filter from "./Filter";
import Sorting from './Sorting';

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

let AuthRedirectComponent = withAuthRedirect(Products)

export default connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);