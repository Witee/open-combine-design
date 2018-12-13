import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './index.css';
import App from './App';
import rootReducer from './rootReducer';
import registerServiceWorker from './registerServiceWorker';

const middleware = [thunk];
if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger());
}
const store = createStore(rootReducer, applyMiddleware(...middleware));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/app" component={App} />

        {/* 默认路由 */}
        <Redirect to="/app" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
