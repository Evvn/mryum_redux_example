// eslint-disable-next-line
import { applyMiddleware, compose, createStore } from 'redux';
import { router5Middleware } from 'redux-router5';
import makeRootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './integration/sagas/rootSaga.js'

export default (router, initialState = {}) => {

  const sagaMiddleware = createSagaMiddleware();

  const middleware = [
    router5Middleware(router),
    sagaMiddleware,
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
  sagaMiddleware.run(rootSaga)

  window.store = store;
  return store;
};
