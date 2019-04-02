import { applyMiddleware, compose, createStore } from 'redux';
import { router5Middleware } from 'redux-router5';
import makeRootReducer from './rootReducer';

export default (router, initialState = {}) => {
  const middleware = [
    router5Middleware(router),
  ];
  const enhancers = [];
  const store = createStore(
    makeRootReducer(),
    initialState,
    /* window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
    })(applyMiddleware(...middleware), ...enhancers),*/
    compose(applyMiddleware(...middleware), ...enhancers),
  );
  store.asyncReducers = {};

  window.store = store;
  return store;
};