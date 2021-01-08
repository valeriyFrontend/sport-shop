import { Link } from 'react-router-dom';
import './slider.scss';

function Slider() {
    return (
        <section className="slider">
            <div className="slider__item">
                    <img src="https://picasso-shop.firebaseapp.com/assets/img/slider1.jpg" alt="shose" />
            </div>
            <Link className="slider__button-shop" to="/shop">Shop now</Link>
        </section>
    )
}

export default Slider;