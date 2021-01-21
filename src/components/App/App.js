import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from './Header/header'
import Navigation from './Nav/nav'
import Slider from './Slider/slider'
import Products from './Products/products';
import About from './About/about';
import Contacts from './Contact/contacts';
import Cart from './Cart/cart';
import Product from './Product/product';
import Login from './Auth/Login/login';
import Registration from './Auth/Registration/registration';

import './App.scss';
import './descr.scss';
import './title.scss';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Header userName="Valeriy"/>
        <Navigation />
        <Route exact path="/" component={Slider}></Route>
        <Route path="/products" component={Products}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/contacts" component={Contacts}></Route>
        <Route path="/cart" component={Cart}></Route>
        <Route path="/product/:id" component={Product}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/registration" component={Registration}></Route>
      </Router>
    </div>
  );
}

export default App;