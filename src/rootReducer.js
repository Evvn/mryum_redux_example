import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
//import { router5Reducer } from 'redux-router5';
import menuReducer from './components/Menu/menuReducer.js';

export const makeRootReducer = (history) => combineReducers({
  // Add sync reducers here
  router: connectRouter(history),
  menu: menuReducer,
});

export default makeRootReducer;
