import { combineReducers } from 'redux';
import { router5Reducer } from 'redux-router5';
import menuReducer from './components/Menu/menuReducer.js';

export const makeRootReducer = () => combineReducers({
  // Add sync reducers here
  router: router5Reducer,
  menu: menuReducer,
});

export default makeRootReducer;
