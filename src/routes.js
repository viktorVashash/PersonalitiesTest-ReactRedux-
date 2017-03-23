import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App, Main, NavBar, Test, Result, Types, TypeShow } from './components/index';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={NavBar} />
    <Route path="test" component={Test} />
    <Route path="types" component={Types} />
    <Route path='type/:id' component={TypeShow} />
    <Route path='result' component={Result} />
  </Route>
);
