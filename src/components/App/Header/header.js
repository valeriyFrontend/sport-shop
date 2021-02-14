import React from 'react'
import {connect} from 'react-redux'
import { Link } from "react-router-dom";
import { setClient } from '../../../redux/actions';

import './header.scss';

function openNav() {
    const overlay = document.querySelector(".overlay"),
            openMenu = document.querySelector(".nav");

    openMenu.classList.add("show");
    overlay.classList.add("back-bg");
}

class Header extends React.Component {
  logOut() {
    localStorage.removeItem('uid');
    this.props.setClient('');
  }
  render() {
    let client = this.props.client;
    return (
          <header className="header">
              <span className="header__button-menu" onClick={openNav}>Menu</span>
              <Link className="header__logo" to="/">Picasso</Link>
              <div>
                { client.role === 'admin' ? <Link className="header__user-role" to="/admin/catalog">{client.role}</Link> : client.role === 'user' ?
                '' : <Link className="header__user-role" to="/login">Sign in</Link>}
                <Link className="header__cart" to="/cart"><span>${this.props.fullPrice}.00 ({this.props.items.length}) </span>Cart</Link>
                { client.role && <span className="header__log-out-button" onClick={this.logOut.bind(this)}>Log Out</span>}
              </div>
          </header>
    )
  }
}

function mapStateToProps(state) {
  return {
    fullPrice: state.fullPrice,
    items: state.items,
    client: state.client
  }
}

const mapDispatchToProps = {
  setClient
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)