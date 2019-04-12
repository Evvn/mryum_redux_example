import { connect } from 'react-redux';
import { Route, Switch } from 'react-router' // react-router v4
import PropTypes from 'prop-types';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Landing/Home.js';
import Contact from './components/Landing/Contact.js';
import FAQ from './components/Landing/FAQ.js';
import Menu from './components/Menu/Menu.js';


class App extends React.Component {

  render() {
    return (
      <Switch>
          <Route path="/home" component={Home} />
          <Route path="/contact" component={Contact} />
          <Route path="/faq" component={FAQ} />
          <Route path="/:venue" component={Menu} />
          <Route path="/:venue/:item" component={Menu} />
          <Route render={() => (<div>Miss</div>)} />
      </Switch>
    );
  }
}

App.propTypes = {
  moduleMappings: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  router: state.router,
});

export default connect(mapStateToProps)(App);
