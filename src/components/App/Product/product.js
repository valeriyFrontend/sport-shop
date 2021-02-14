import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getProducts, addToCart, changeFullPrice } from '../../../redux/actions/index'; 
import { database } from "../../../firebase";
import Spinner from '../../UI/Spinner/Spinner';

import './product.scss';

class Product extends Component {
    constructor() {
        super();
        this.state = {
            product: null,
            fullImage: null
        }
    }
    componentDidMount() {
        const rootRef = database.ref('products').child(this.props.match.params.id);

        rootRef.on('value', snap => {
            let product = snap.val();
            this.setState({product})
        });
    }

    addToCart (price, product) {
        const productFound = this.props.items.find(item => item.id === product.id );
        product.fullPrice += product.price;
        product.count += 1;

        if (productFound) {
            this.props.changeFullPrice(product.price);
        } else {
            this.props.addToCart(price, product);
        }
    }
    changeImage(event) {
        this.setState({fullImage: event.target.src })
    }

    render() {
        const product = this.state.product;

        return (
            <section className="product">
                <Spinner loading={product}/>
                {product && <Fragment>
                    <h1 className="title title--uppercase">{product.name}</h1>
                    <span className="descr descr--red">${product.price}</span>
                    <div className="product__item">
                        <div className="product__galery">
                            <div className="product__galery-inner">
                                    <img src={this.state.fullImage ? this.state.fullImage  :  product.image} alt="shoes" className="product__full-img" />
                                    <div className="product__more-img">
                                    {/* {product.image.map((item, index) => 
                                    <Fragment  key={index}>
                                        <img src={item} alt="shoes" className="product__sub-img" onClick={this.changeImage.bind(this)}/>
                                    </Fragment>)} */}
                                    </div>
                                <div className="product__more-img">
                                </div>
                            </div>
                        </div>
                        <div className="product__descr">
                            <div className="product__text">Lorem ipsum dolor sit amet, consecte tuer ad ipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculu.</div>
                            <span className="product__button" onClick={() => this.addToCart(product.price, product)}>Add to cart</span>
                        </div>
                    </div>  
                </Fragment>}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
      items: state.items,
      counter: state.counter,
      products: state.products
    }
}
const mapDispatchToProps = {
    getProducts,
    addToCart,
    changeFullPrice

}

export default connect(mapStateToProps, mapDispatchToProps)(Product)