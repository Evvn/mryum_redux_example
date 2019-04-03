import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppBase from './App';
import configureStore from './Store';
import initializeRouter from './initializeRouter';
import * as serviceWorker from './serviceWorker';
import Home from './components/Landing/Home.js';
import Contact from './components/Landing/Contact.js';
import FAQ from './components/Landing/FAQ.js';
import Menu from './components/Menu/Menu.js';

const routes = [
  { name: 'home', path: '/' },
  { name: 'contact', path: '/contact' },
  { name: 'faq', path: '/faq' },
  { name: 'menu', path: '/menu', children: [
    { name: 'venue', path: '/venue' },
  ] },
];

const moduleMappings = {
  home: { component: Home, label: 'Home', path: routes[0].path },
  contact: { component: Contact, label: 'Contact', path: routes[1].path },
  faq: { component: FAQ, label: 'FAQ', path: routes[2].path },
  menu: { component: Menu, label: 'Menu', path: routes[3].path },
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
