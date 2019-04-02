import { combineReducers } from 'redux';
import { router5Reducer } from 'redux-router5';

import reducer from './reducer';

export const makeRootReducer = () => combineReducers({
  // Add sync reducers here
  common: reducer,
  router: router5Reducer,
});

export default makeRootReducer;
