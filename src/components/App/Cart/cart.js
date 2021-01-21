import { Component } from "react";
import {connect} from 'react-redux';
import { removeCartItem , changeFullPrice} from "../../../redux/actions/index";
import { Link } from 'react-router-dom';

import './cart.scss';

class Cart extends Component {

    showInfoEmpyCart() {
        if (!this.props.items.length) {
            return <section className="cart">
                <h1 className="title">Your cart</h1>
                <span className="descr">There is not items  yet.</span>
                <Link className="cart__link-back" to="/products">Back to shop</Link>
            </section>
        }
    }

    render() {
        const items = this.props.items;

        const incCount = (item) => {
            item.count += 1;
            item.fullPrice += item.price;
            this.props.changeFullPrice(item.price);
            this.setState({items});
        }
        const decCount = (item) => {
            if(item.count === 1) {
                return;
            }
            item.fullPrice -= item.price;
            item.count -= 1;
            
            this.props.changeFullPrice(-item.price);
            this.setState({items});
        }
        return (
                <div className="items">
                    {this.showInfoEmpyCart()}
                    <div className="items-inner">{
                        items.map((item, index) => 
                        <div className="item" key={index}>
                            <span className="item__button-close" onClick={() => this.props.removeCartItem(item.price, item)}>&#10006;</span>
                            <img className="item__img" src={item.images[0]} alt={item.name}/>
                            <h1 className="item__name">{item.name}</h1>
                            <span className="item__price">${item.price}.00</span>
                            <span>{this.props.count}</span>
                            <div className="item__amount-product">
                                <span className="item__minus-amount" onClick={() => decCount(item)}>-</span>
                                <span className="item__amount-number">{ item.count }</span>
                                <span className="item__plus-amount"onClick={() => incCount(item)}>+</span>
                            </div>
                            <span className="item__full-price">${item.fullPrice}.00</span>
                        </div>
                    )}</div>
                    {!!items.length && <div className="items__footer">
                        <Link to="/products"><span className="items__footer-button">Back store</span></Link>
                        <div className="items__footer-price">Total: <span className="items__footer-price-number">${this.props.fullPrice}.00</span></div>
                        <span className="items__footer-button">Checkout</span>
                </div>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        items: state.items,
        cartState: state.cartState,
        fullPrice: state.fullPrice
    }
}
const mapDispatchToProps = {
    changeFullPrice,
    removeCartItem
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);