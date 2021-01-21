import { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import './product.scss';

class Product extends Component { 
    render() {
        return (
            <Fragment>
                {this.props.products?.map((item, index) => 
                    <div className="products__item" key={index}>
                        <Link className="products__item-inner"  to={`/product/${item.id}`}>
                            <img src={item.images[0]} alt="shoose" />
                            <div className="products__item-descr">
                                <div className="products__item-title">{item.name}</div>
                                <div className="item__price">{item.price} $</div>
                            </div>
                        </Link>
                    </div>
                )}
            </Fragment>
        )
    }
}

export default Product;