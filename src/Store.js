// eslint-disable-next-line
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
    // for dev
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
    })(applyMiddleware(...middleware), ...enhancers),
    // for prod
    // compose(applyMiddleware(...middleware), ...enhancers),
  );
  store.asyncReducers = {};

  window.store = store;
  return store;
};
