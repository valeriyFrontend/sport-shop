// import { useState } from 'react';
import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// import imgProcuct1 from '../../img/shoes-1.png';
// import imgProcuct2 from '../../img/shoes-2.png';
// import imgProcuct3 from '../../img/shoes-3.png';
// import imgProcuct4 from '../../img/shoes-4.png';
// import imgProcuct5 from '../../img/shoes-5.png';
// import imgProcuct6 from '../../img/shoes-6.png';

import './shop.scss';

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // products: [
            //     [
            //         imgProcuct1,
            //         'Product 1',
            //         50
            //     ],
            //     [
            //         imgProcuct2,
            //         'Product 2',
            //         60
            //     ],
            //     [
            //         imgProcuct3,
            //         'Product 3',

            //         40
            //     ],
            //     [
            //         imgProcuct4,
            //         'Product 4',
            //         20
            //     ],
            //     [
            //         imgProcuct5,
            //         'Product 5',
            //         45
            //     ],
            //     [
            //         imgProcuct6,
            //         'Product 6',
            //         40
            //     ]
            // ]
        }
    }

    render() {  
        const products = this.props.products;
        return (
            <section className="shop">
                <div className="shop__sort">
                    <span>SORT BY PRODUCT NAME</span>
                    <span>SHOW ME ALL PRODUCTS</span>
                </div>
                <div className="shop__items">
                    {products.map((item, index) => 
                        <div className="shop__item" key={index}>
                        <Link className="shop__item-inner"  to="/product">
                            <img src={item[0]} alt="shoose" />
                            <div className="shop__item-descr">
                                <div className="shop__item-title">{item[1]}</div>
                                <div className="item__cost">{item[2]} $</div>
                            </div>
                        </Link>
                    </div>
                    )}
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.counter1.products
    }
}

export default connect(mapStateToProps)(Shop);