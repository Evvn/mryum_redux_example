// eslint-disable-next-line
import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { routerMiddleware } from 'connected-react-router';
import storage from 'redux-persist/lib/storage'
import { createBrowserHistory } from 'history'
import makeRootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './integration/sagas/rootSaga.js'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

export const history = createBrowserHistory();

export default (initialState = {}) => {

  const sagaMiddleware = createSagaMiddleware();
  const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
    blacklist: ['router', 'menu', 'common']
  }

  const middleware = [
    routerMiddleware(history),
    sagaMiddleware,
  ];
  const enhancers = [];
  let store = '';

  // for dev
  if (process.env.REACT_APP_REDUX_DEV_TOOLS === 'false') {
    store = createStore(
      persistReducer(persistConfig, makeRootReducer(history)),
      initialState,
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
      })(applyMiddleware(...middleware), ...enhancers),
    );
  } // for prod
  else {
    store = createStore(
      persistReducer(persistConfig, makeRootReducer(history)),
      initialState,
      compose(applyMiddleware(...middleware), ...enhancers),
    );
  }

  store.asyncReducers = {};
  sagaMiddleware.run(rootSaga)

  window.store = store;
  let persistor = persistStore(store)
  return { store, persistor} ;
};
