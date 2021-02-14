import { Component } from "react";
import { Route } from "react-router-dom";

import Header from '../Header'
import Navigation from './../Nav'
import Slider from './../Slider'
import Products from './../Products';
import About from './../About';
import Contacts from './../Contact';
import Cart from './../Cart';
import Product from './../Product';
import Login from './../Auth/Login';
import Registration from './../Auth/Registration';
import addProduct from './../Admin/addProduct/addProduct';
import { Fragment } from "react";
import { database } from "../../../firebase";
import { connect } from "react-redux";
import { setClient } from '../../../redux/actions';

class Main extends Component {
  componentDidMount() {
    const usersRef = database.ref().child('users');

    usersRef.on('value', snap => {
      const users = snap.val();
      for (let user in users) {
        if (users[user].uid === localStorage.getItem('uid')) {
          this.props.setClient(users[user]);
        }
      }
    });
  };
  rerenderParentCallback() {
    this.forceUpdate();
  }
  render() {
    let pathName = window.location.pathname.substr(6);
    return (
      <div className="App">
        {window.location.pathname === "/admin" + pathName ? "" : <Fragment><Header /><Navigation /></Fragment>}
        <Route exact path="/" component={Slider}></Route>
        <Route path="/products" component={Products}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/contacts" component={Contacts}></Route>
        <Route path="/cart" component={Cart}></Route>
        <Route path="/product/:id" component={Product}></Route>
        <Route path="/login" component={Login} ></Route>
        <Route path="/registration" component={Registration}></Route>
        <Route path="/addProduct" component={addProduct}></Route>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    client: state.client
  }
}

const mapDispatchToProps = {
  setClient
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);