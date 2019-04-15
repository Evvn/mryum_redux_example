// eslint-disable-next-line
import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { routerMiddleware } from 'connected-react-router';
import storage from 'redux-persist/lib/storage'
import { createBrowserHistory } from 'history'
import makeRootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './integration/sagas/rootSaga.js'
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';

export const history = createBrowserHistory();

export default (initialState = {}) => {

  const sagaMiddleware = createSagaMiddleware();
  const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel1,
    blacklist: ['router', 'menu']
  }

  const middleware = [
    routerMiddleware(history),
    sagaMiddleware,
  ];
  const enhancers = [];
  const store = createStore(
    persistReducer(persistConfig, makeRootReducer(history)),
    initialState,
    // for dev
    // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    //   trace: true,
    // })(applyMiddleware(...middleware), ...enhancers),
    // for prod
    compose(applyMiddleware(...middleware), ...enhancers),
  );

  store.asyncReducers = {};
  sagaMiddleware.run(rootSaga)

  window.store = store;
  let persistor = persistStore(store)
  return { store, persistor} ;
};
