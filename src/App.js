import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Switch from './Switch';

class App extends React.Component {

  render() {
    const { moduleMappings, routeTo } = this.props;
    const displayedRoutes = _.cloneDeep(moduleMappings);
    delete displayedRoutes.home;

    return (
      <Switch moduleMappings={moduleMappings} routeTo={routeTo} />
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
