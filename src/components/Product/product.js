import { Component } from 'react';
import {add} from '../../redux/actions/actions';
import {connect} from 'react-redux'

import './product.scss';

class Product extends Component {
    render() {
        return (
            <section className="product">
                <h1 className="title title--uppercase">Product1</h1>
                <span className="descr descr--red">$30.00</span>
                <div className="product__item">
                    <div className="product__galery">
                        <div className="product__galery-inner">
                            
                            <img src={this.props.products[0][0]} alt="shoes" className="product__full-img" />
                            <div className="product__more-img">
                                <div className="product__sub-img">
                                    {/* <img src={this.props.products[0][3][0]} alt="shoes" /> */}
                                </div>
                                <div className="product__sub-img">
                                    {/* <img src={this.props.products[0][3][1]}  alt="shoes" /> */}
                                </div>
                                <div className="product__sub-img">
                                    {/* <img src={this.props.products[0][3][2]}  alt="shoes" /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product__descr">
                        {this.props.products}
                        <div className="product__text">Lorem ipsum dolor sit amet, consecte tuer ad ipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculu.</div>
                        <span className="product__button" href="/" onClick={() => this.props.onChange()}>Add to cart</span>
                    </div>
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

function mapDispatchToProps(dispatch) {
    return {
      onChange: () => dispatch(add())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Product)