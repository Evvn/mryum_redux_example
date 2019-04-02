import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/Home';
import AppBase from './App';
import configureStore from './Store';
import initializeRouter from './initializeRouter';
import * as serviceWorker from './serviceWorker';

const routes = [
  { name: 'home', path: '/' },
];

const moduleMappings = {
  home: { component: Home, label: 'Home', path: routes[0].path },
};

const router = initializeRouter({
  routes,
  defaultRoute: 'home',
});
const store = configureStore(router);
const App = (
  <Provider store={store}>
    <RouterProvider router={router}>
      <AppBase
        moduleMappings={moduleMappings}
        routerActions={router}
        routes={routes}
      />
    </RouterProvider>
  </Provider>
);
router.start(() => {
  ReactDOM.render(App, document.getElementById('root'));
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
