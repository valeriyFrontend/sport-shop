import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from './Header'
import Navigation from './Nav'
import Slider from './Slider'
import Products from './Products';
import About from './About';
import Contacts from './Contact';
import Cart from './Cart';
import Product from './Product';
import Login from './Auth/Login';
import Registration from './Auth/Registration';

import './App.scss';
import './descr.scss';
import './title.scss';
import './form.scss';

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