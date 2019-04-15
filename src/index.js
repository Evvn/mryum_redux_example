import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { ConnectedRouter } from 'connected-react-router'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppBase from './App';
import configureStore, { history } from './Store';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";

const routes = [
  { name: 'home', path: '/' },
  { name: 'contact', path: '/contact' },
  { name: 'faq', path: '/faq' },
  { name: 'menu', path: '/:venueId/:itemId'},
];

const { store, persistor } = configureStore();
const App = (
  <Provider store={store}>


      <ConnectedRouter history={history}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
      <AppBase
        routes={routes}
      />
      </BrowserRouter>
      </PersistGate>
      </ConnectedRouter>



  </Provider>
);

ReactDOM.render(App, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
