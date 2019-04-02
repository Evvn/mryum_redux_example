import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Switch from './Switch';
import logo from './white_logo.svg';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: true
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }



  render() {
    const { moduleMappings } = this.props;
    const displayedRoutes = _.cloneDeep(moduleMappings);
    delete displayedRoutes.home;

    return (
      <Switch moduleMappings={moduleMappings} />
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
