import { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import {
  getProducts,
  addToCart,
  changeFullPrice,
} from "../../../redux/actions/index";
import { database } from "../../../firebase";
import { useTranslation } from "react-i18next";
import Spinner from "../../UI/Spinner/Spinner";

import "./product.scss";

function Product({ match, items, changeFullPrice, addToCart }) {
  const [product, setProduct] = useState(null);
  const [fullImage] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const rootRef = database.ref("products").child(match.params.id);

    rootRef.on("value", (snap) => {
      let product = snap.val();
      setProduct(product);
    });
  }, [match.params.id]);

  const addProductToCart = (price, product) => {
    const productFound = items.find((item) => item.id === product.id);
    product.fullPrice += product.price;
    product.count += 1;

    if (productFound) {
      changeFullPrice(product.price);
    } else {
      addToCart(price, product);
    }
  };

  return (
    <section className="product">
      <Spinner loading={product} />
      {product && (
        <Fragment>
          <h1 className="title title--uppercase">{product.name}</h1>
          <span className="descr descr--red">${product.price}</span>
          <div className="product__item">
            <div className="product__galery">
              <div className="product__galery-inner">
                <img
                  src={fullImage ? fullImage : product.image}
                  alt="shoes"
                  className="product__full-img"
                />
              </div>
            </div>
            <div className="product__descr">
              <div className="product__text">
                Lorem ipsum dolor sit amet, consecte tuer ad ipiscing elit.
                Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                natoque penatibus et magnis dis parturient montes, nascetur
                ridiculu.
              </div>
              <span
                className="product__button"
                onClick={() => addProductToCart(product.price, product)}
              >
                {t("add_to_cart")}
              </span>
            </div>
          </div>
        </Fragment>
      )}
    </section>
  );
}

function mapStateToProps(state) {
  return {
    items: state.items,
    counter: state.counter,
    products: state.products,
  };
}
const mapDispatchToProps = {
  getProducts,
  addToCart,
  changeFullPrice,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
