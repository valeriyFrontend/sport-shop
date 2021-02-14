import { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import './product.scss';

class Product extends Component { 
    render() {
        let products = this.props.products;

        return (
            <Fragment>
                {products && products.map((product, index) => 
                    <div className="products__item" key={index}>
                        <Link className="products__item-inner"  to={`/product/${product.id}`}>
                            <img src={product.image} alt="shoose" />
                            <div className="products__item-descr">
                                <div className="products__item-title">{product.name}</div>
                                <div className="item__price">{product.price} $</div>
                            </div>
                        </Link>
                    </div>
                )}
            </Fragment>
        )
    }
}

export default Product;