import 'normalize.css';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from 'registerServiceWorker';

import { Provider } from 'react-redux';
import { Store, History } from 'store/index';

import App from './components/App';

History.push('/');

ReactDOM.render(
  <Provider store={ Store }>
    <App/>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

