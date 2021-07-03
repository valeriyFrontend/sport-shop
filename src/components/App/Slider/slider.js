import { Component } from "react";
import { connect } from "react-redux";
import { getSlides } from "../../../redux/actions";
import { database } from "../../../firebase";
import SwiperCore, { Pagination, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import LinkButton from "../../UI/Buttons/LinkButton";

import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/effect-fade/effect-fade.scss";
import "./slider.scss";

SwiperCore.use([Pagination, EffectFade]);

class Slider extends Component {
  componentDidMount() {
    const productsRef = database.ref().child("slides");

    productsRef.on("value", (snap) => {
      this.props.getSlides(snap.val());
    });
  }

  render() {
    const slides = this.props.slides;

    return (
      <section className="slider">
        <Swiper
          spaceBetween={50}
          pagination={{ clickable: true }}
          effect="fade"
        >
          {slides.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="slider_slide"
                style={{ backgroundImage: `url(${item}` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <LinkButton name={"Shop now"} path={"/products"} />
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    slides: state.slides,
    login: state.login,
  };
}

const mapDispatchToProps = {
  getSlides,
};

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
