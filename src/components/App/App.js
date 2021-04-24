import { connect } from "react-redux";
import { setClient } from '../../redux/actions';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from './Main/main'
import Admin from './Admin/Admin'

import './App.scss';
import './descr.scss';
import './title.scss';
import './form.scss';

//test master

const App = () => {
    return (
      <div className="App">
        <Router>
            <Route path="/" component={Main}/>
            <Route path="/admin" component={Admin} />
        </Router>
      </div>
    );
}

function mapStateToProps(state) {
  return {
    client: state.client
  }
}
const mapDispatchToProps = {
  setClient
}

export default connect(mapStateToProps, mapDispatchToProps)(App);