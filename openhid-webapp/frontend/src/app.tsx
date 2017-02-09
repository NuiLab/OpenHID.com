import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Nav } from './components';
import { Home, Publications, About, User, Publication, NotFound } from './views';

import './css';

const App = (
  <div>
    <Nav />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/publications" component={Publications} />
      <Route exact path="/about" component={About} />
      <Route exact path="/:user" component={User} />
      <Route exact path="/:user/:permalink" component={Publication} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default App;
