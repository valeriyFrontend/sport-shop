import React from 'react'
import {connect} from 'react-redux'
import { Link } from "react-router-dom";

import './header.scss';

function openNav() {
    const overlay = document.querySelector(".overlay"),
            openMenu = document.querySelector(".nav");

    openMenu.classList.add("show");
    overlay.classList.add("back-bg");
}

class Header extends React.Component {
  render() {
    return (
          <header className="header">
              <span className="header__button-menu" onClick={openNav}>Menu</span>
              <a className="header__logo" href="index.html">Picasso</a>
              <Link className="header__cart" to="/cart"><span>${this.props.counter} </span>Cart</Link>
          </header>
    )
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter1.counter
  }
}

export default connect(mapStateToProps)(Header)