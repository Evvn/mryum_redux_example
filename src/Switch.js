import { connect } from 'react-redux';
import { createRouteNodeSelector } from 'redux-router5';
import { startsWithSegment } from 'router5-helpers';
import PropTypes from 'prop-types';
import React from 'react';
import Home from './components/Landing/Home.js';
import Contact from './components/Landing/Contact.js';
import FAQ from './components/Landing/FAQ.js';
import Menu from './components/Menu/Menu.js';

function Switch({ route, moduleMappings, topRouteName }) {
  let Component = '';

  // eslint-disable-next-line
  Object.keys(moduleMappings).map((key) => {
    console.log(key, topRouteName)
    if (topRouteName === key) {
      
      Component = moduleMappings[`${key}`].component;
    }
  });

  return <Component />;
}

export default connect(createRouteNodeSelector(''))(Switch);
