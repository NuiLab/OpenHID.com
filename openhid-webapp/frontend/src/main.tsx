import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import App from './app';
import reducers from './store/reducers';
import './css';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk)
    //,devToolsExtension()
    )
  );

const app = (
  <BrowserRouter>
    <Provider store={store}>
    {App}
    </Provider>
  </BrowserRouter>
);

render(app, document.getElementById('app'));
