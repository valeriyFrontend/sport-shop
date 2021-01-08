import { Component } from "react";
import { Link } from "react-router-dom";

import './cart.scss';

class Cart extends Component {
    render() {
        return (
            <section className="cart">
                <h1 className="title">Your cart</h1>
                <span className="descr">There is not items  yet.</span>
                <span>{this.props.counter}</span>
                <a href="shop.html" className="cart__link-back"><Link to="/shop">Back to shop</Link></a>
            </section>
        )
    }
}

export default Cart;