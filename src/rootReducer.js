import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
//import { router5Reducer } from 'redux-router5';
import persistentMenuReducer from './components/Menu/reducers/persistentMenuReducer.js';
import menuReducer from './components/Menu/reducers/menuReducer.js';
import persistentCommonReducer from './components/Common/reducers/persistentCommonReducer.js';

export const makeRootReducer = (history) => combineReducers({
  // Add sync reducers here
  router: connectRouter(history),
  persistentMenu: persistentMenuReducer,
  menu: menuReducer,
  persistentCommon: persistentCommonReducer,
});

export default makeRootReducer;
