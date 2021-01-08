// import { useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from '../Header/header'
import Navigation from '../Nav/nav'
import Slider from '../Slider/slider'
import Shop from '../Shop/shop';
import About from '../About/about';
import Contacts from '../Contact/contacts';
import Cart from '../Cart/cart';
import Product from '../Product/product';

import './App.scss';
import './descr.scss';
import './title.scss';

function App() {
  // const [count, setCount] = useState(0);
  
  return (
    <div className="App">
      <Router>
        <Header userName="Valeriy"/>
        <Navigation />
        <Route exact path="/" component={Slider}></Route>
        <Route path="/shop" component={Shop}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/contacts" component={Contacts}></Route>
        <Route path="/cart" component={Cart}></Route>
        <Route path="/product" component={Product}></Route>
      </Router>
    </div>
  );
}

export default App;