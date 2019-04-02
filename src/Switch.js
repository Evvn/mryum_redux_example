import { connect } from 'react-redux';
import { createRouteNodeSelector } from 'redux-router5';
import { startsWithSegment } from 'router5-helpers';
import PropTypes from 'prop-types';
import React from 'react';

function Switch({ route, moduleMappings }) {
  const { name } = route;
  const testRoute = startsWithSegment(name);
  let Component = '';

  Object.keys(moduleMappings).map((key) => {
    if (testRoute(key)) {
      Component = moduleMappings[`${key}`].component;
    }
  });

  return <Component />;
}

Switch.propTypes = {
  moduleMappings: PropTypes.objectOf(PropTypes.object).isRequired,
  route: PropTypes.objectOf(PropTypes.object).isRequired,
  routeTo: PropTypes.func.isRequired,
};

export default connect(createRouteNodeSelector(''))(Switch);
