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
              <Link className="header__logo" to="/">Picasso</Link>
              <div>
                <Link className="header__login" to="/login">Sign in</Link>
                <Link className="header__cart" to="/cart"><span>${this.props.fullPrice}.00 ({this.props.items.length}) </span>Cart</Link>
              </div>
          </header>
    )
  }
}

function mapStateToProps(state) {
  return {
    fullPrice: state.fullPrice,
    items: state.items
  }
}

export default connect(mapStateToProps)(Header)