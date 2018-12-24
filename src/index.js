import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/app" component={App} />

      {/* 默认路由 */}
      <Redirect to="/app" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
